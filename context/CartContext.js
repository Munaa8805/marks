/**
 * context/CartContext.js
 *
 * Cart context for managing shopping cart state globally.
 * Provides cart operations like add, remove, update quantity, and calculate totals.
 *
 * Uses React Context API for state management.
 * Persists cart to localStorage for persistence across page refreshes.
 */

'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

/**
 * Cart context object.
 * Provides cart state and methods to child components.
 */
const CartContext = createContext(undefined)

/**
 * Custom hook to access cart context.
 * Throws error if used outside CartProvider.
 *
 * @returns {Object} Cart context value with state and methods
 * @throws {Error} If used outside CartProvider
 */
export function useCart() {
  const context = useContext(CartContext)
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  
  return context
}

/**
 * Cart provider component.
 * Wraps the app to provide cart state management.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} CartProvider JSX
 */
export function CartProvider({ children }) {
  // Initialize cart state from localStorage or empty array
  const [cartItems, setCartItems] = useState([])

  /**
   * Load cart from localStorage on mount.
   */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shopping-cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
  }, [])

  /**
   * Save cart to localStorage whenever cartItems changes.
   */
  useEffect(() => {
    try {
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [cartItems])

  /**
   * Add item to cart or increase quantity if already exists.
   *
   * @param {Object} product - Product object to add
   * @param {number} quantity - Quantity to add (default: 1)
   */
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {

        // Update quantity if item exists
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity }]
      }
    })
  }, [])

  /**
   * Remove item from cart completely.
   *
   * @param {number} productId - ID of product to remove
   */
  const removeFromCart = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)

    )
  }, [])

  /**
   * Update quantity of a specific cart item.
   *
   * @param {number} productId - ID of product to update
   * @param {number} quantity - New quantity (must be > 0)
   */
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }, [removeFromCart])

  /**
   * Clear all items from cart.
   */
  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  /**
   * Calculate total number of items in cart.
   *
   * @returns {number} Total quantity of all items
   */
  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  /**
   * Calculate total price of all items in cart.
   *
   * @returns {number} Total price
   */
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }, [cartItems])

  /**
   * Check if cart is empty.
   *
   * @returns {boolean} True if cart is empty
   */
  const isCartEmpty = useCallback(() => {
    return cartItems.length === 0
  }, [cartItems])

  // Context value containing state and methods
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartEmpty,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

