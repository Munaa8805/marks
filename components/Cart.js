/**
 * components/Cart.js
 *
 * Shopping cart sidebar component.
 * Displays all cart items, allows quantity updates, and shows totals.
 *
 * Features:
 * - Slide-in sidebar animation
 * - List of cart items
 * - Quantity controls
 * - Total price calculation
 * - Empty cart state
 * - Clear cart functionality
 */

'use client'

import { useCart } from '@/context/CartContext'
import CartItem from './CartItem'
import styles from './Cart.module.css'

/**
 * Cart component.
 * Displays shopping cart as a slide-in sidebar.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether cart is open
 * @param {Function} props.onClose - Callback when cart is closed
 * @returns {JSX.Element} Cart component JSX
 */
export default function Cart({ isOpen, onClose }) {
  const {
    cartItems,
    getTotalPrice,
    isCartEmpty,
    clearCart,
  } = useCart()

  // Calculate total price
  const totalPrice = getTotalPrice()
  const isEmpty = isCartEmpty()

  return (
    <div
      className={`${styles.cart} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      {/* Cart header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Shopping Cart</h2>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      {/* Cart content */}
      <div className={styles.content}>
        {isEmpty ? (
          // Empty cart state
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🛒</div>
            <p className={styles.emptyText}>Your cart is empty</p>
            <p className={styles.emptySubtext}>
              Add some products to get started!
            </p>
          </div>
        ) : (
          // Cart items list
          <>
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Cart footer with totals */}
            <div className={styles.footer}>
              <div className={styles.totalSection}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalPrice}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className={styles.actions}>
                <button
                  className={styles.clearButton}
                  onClick={clearCart}
                  aria-label="Clear all items from cart"
                >
                  Clear Cart
                </button>
                <button
                  className={styles.checkoutButton}
                  onClick={() => {
                    alert('Checkout functionality would be implemented here!')
                  }}
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

