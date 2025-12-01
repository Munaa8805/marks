/**
 * app/product/[id]/page.js
 *
 * Product detail page displaying individual product information.
 * Dynamic route for product pages.
 */

'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import ProductDetail from '@/components/ProductDetail'
import Cart from '@/components/Cart'
import { PRODUCTS } from '@/utils/constants'
import { useParams, useRouter } from 'next/navigation'
import styles from './page.module.css'

/**
 * Product detail page component.
 * Displays product information and shopping cart.
 *
 * @returns {JSX.Element} Product detail page JSX
 */
export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id, 10)
  const product = PRODUCTS.find((p) => p.id === productId)

  // State to control cart sidebar visibility
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()

  // Calculate total items in cart for badge display
  const totalItems = getTotalItems()

  // If product not found, show error or redirect
  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={() => router.push('/')} className={styles.backButton}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Header section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button
            className={styles.backButton}
            onClick={() => router.push('/')}
            aria-label="Back to home"
          >
            ← Back
          </button>
          <h1 className={styles.title}>Product Details</h1>

          {/* Cart button with item count badge */}
          <button
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping cart"
          >
            <span className={styles.cartIcon}>🛒</span>
            {totalItems > 0 && (
              <span className={styles.badge} aria-label={`${totalItems} items in cart`}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <ProductDetail
          product={product}
          onAddToCart={() => {
            // Open cart when item is added
            if (!isCartOpen) {
              setIsCartOpen(true)
            }
          }}
        />
      </main>

      {/* Shopping cart sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

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

