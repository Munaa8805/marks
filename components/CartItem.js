/**
 * components/CartItem.js
 *
 * Individual cart item component.
 * Displays product information and quantity controls.
 *
 * Features:
 * - Product image and details
 * - Quantity increment/decrement buttons
 * - Remove item functionality
 * - Item subtotal calculation
 */

'use client'

import { useCart } from '@/context/CartContext'
import styles from './CartItem.module.css'

/**
 * Cart item component.
 * Represents a single product in the cart.
 *
 * @param {Object} props - Component props
 * @param {Object} props.item - Cart item object with product data and quantity
 * @returns {JSX.Element} CartItem component JSX
 */


export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  /**
   * Handle quantity change.
   *
   * @param {number} newQuantity - New quantity value
   */
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  /**
   * Calculate subtotal for this item.
   *
   * @returns {number} Item subtotal (price * quantity)
   */
  const getSubtotal = () => {
    return item.price * item.quantity
  }

  return (
    <div className={styles.cartItem}>
      {/* Product image */}
      <div className={styles.imageContainer}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholderImage}>
            {item.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Product details */}
      <div className={styles.details}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.price}>${item.price.toFixed(2)} each</p>
        
        {/* Quantity controls */}
        <div className={styles.quantityControls}>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(item.quantity - 1)}
            aria-label={`Decrease quantity of ${item.name}`}
          >
            −
          </button>
          <span className={styles.quantity} aria-label={`Quantity: ${item.quantity}`}>
            {item.quantity}
          </span>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal and remove button */}
      <div className={styles.rightSection}>
        <div className={styles.subtotal}>
          ${getSubtotal().toFixed(2)}
        </div>
        <button
          className={styles.removeButton}
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.name} from cart`}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

