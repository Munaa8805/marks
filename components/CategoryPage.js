/**
 * components/CategoryPage.js
 *
 * Reusable category page component.
 * Displays products filtered by category with shopping cart functionality.
 *
 * Features:
 * - Product filtering by category
 * - Product grid display
 * - Shopping cart integration
 * - Empty state handling
 * - Responsive design
 */

'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import Cart from '@/components/Cart'
import { PRODUCTS } from '@/utils/constants'
import styles from './CategoryPage.module.css'

/**
 * CategoryPage component.
 * Displays products for a specific category.
 *
 * @param {Object} props - Component props
 * @param {string} props.categoryName - Category name to filter products
 * @param {string} props.title - Page title (optional, defaults to categoryName)
 * @param {string} props.description - Page description (optional)
 * @returns {JSX.Element} CategoryPage component JSX
 */
export default function CategoryPage ({ categoryName, title, description }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()

  // Filter products by category or special filters
  const categoryProducts = PRODUCTS.filter((product) => {
    // Handle special categories
    if (categoryName.toLowerCase() === 'sale & clearance' || categoryName.toLowerCase() === 'sale-clearance') {
      return product.onSale === true
    }
    if (categoryName.toLowerCase() === 'featured') {
      return product.featured === true
    }
    if (categoryName.toLowerCase() === 'cyber days' || categoryName.toLowerCase() === 'cyber-days') {
      return product.onSale === true || product.featured === true
    }
    if (categoryName.toLowerCase() === 'black friday' || categoryName.toLowerCase() === 'black-friday') {
      return product.onSale === true
    }
    // Handle work boots & shoes (special category name)
    if (categoryName.toLowerCase() === 'work boots & shoes' || categoryName.toLowerCase() === 'work-boots-and-shoes') {
      return product.category === 'Work Boots & Shoes'
    }
    // Standard category filtering
    if (!product.category) return false
    return product.category.toLowerCase() === categoryName.toLowerCase()
  })

  // Get page title and description
  const pageTitle = title || categoryName
  const pageDescription = description || `Browse our collection of ${categoryName.toLowerCase()} products.`

  // Calculate total items in cart for badge display
  const totalItems = getTotalItems()

  /**
   * Toggle cart sidebar open/closed state.
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className={styles.container}>
      {/* Main content area */}
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{pageTitle}</h1>
          <p className={styles.description}>{pageDescription}</p>
          {categoryProducts.length > 0 && (
            <p className={styles.productCount}>
              {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} available
            </p>
          )}
        </div>

        {categoryProducts.length > 0 ? (
          <div className={styles.productsGrid}>
            {categoryProducts.map((product) => (
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
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
              No products found in this category.
            </p>
            <p className={styles.emptySubtext}>
              Check back soon for new arrivals!
            </p>
          </div>
        )}
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
          aria-hidden='true'
        />
      )}
    </div>
  )
}

