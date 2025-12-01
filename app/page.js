/**
 * app/page.js
 *
 * Main page component displaying products and shopping cart.
 * This is the home page of the application.
 *
 * Features:
 * - Product listing
 * - Shopping cart sidebar
 * - Add/remove items functionality
 */

'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import Cart from '@/components/Cart'
import { PRODUCTS } from '@/utils/constants'
import styles from './page.module.css'

/**
 * Home page component.
 * Displays products and shopping cart.
 *
 * @returns {JSX.Element} Home page JSX
 */
export default function Home() {
  // State to control cart sidebar visibility
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems, getTotalItems } = useCart()

  /**
   * Toggle cart sidebar open/closed state.
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  // Calculate total items in cart for badge display
  const totalItems = getTotalItems()

  return (
    <div className={styles.container}>
     
      {/* Main content area */}
      <main className={styles.main}>
        <div className={styles.productsGrid}>
          {/* Render each product as a ProductCard */}
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={() => {
                // Optionally open cart when item is added
                if (!isCartOpen) {
                  setIsCartOpen(true)
                }
              }}
            />
          ))}
        </div>
      </main>

      {/* Shopping cart sidebar */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
      
      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

