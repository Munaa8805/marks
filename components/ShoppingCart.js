/**
 * components/ShoppingCart.js
 *
 * Full shopping cart page component.
 * Displays cart items, shipping options, and order summary in a two-column layout.
 *
 * Features:
 * - Cart items with detailed information
 * - Shipping method selection
 * - Order summary with price breakdown
 * - Discount calculation
 * - Promo code input
 * - Multiple checkout options
 * - Responsive design
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import styles from './ShoppingCart.module.css'

/**
 * Shipping method options.
 */
const SHIPPING_METHODS = [
  {
    id: 'standard',
    label: 'Standard Delivery',
    available: true,
    description: 'Ships in 2-3 business days',
  },
  {
    id: 'same-day',
    label: 'Same-Day',
    available: false,
    description: 'is not available for this order',
  },
  {
    id: 'next-day',
    label: 'Next-Day',
    available: false,
    description: 'is not available for this order',
  },
  {
    id: 'pickup',
    label: 'Free Pick Up at Store Calgary Shawnessy',
    available: true,
    description: 'Order online before 2pm and pick up the same day or next day if you order after 2pm',
  },
]

/**
 * ShoppingCart component.
 * Full-page shopping cart view.
 *
 * @returns {JSX.Element} ShoppingCart component JSX
 */
export default function ShoppingCart () {
  const {
    cartItems,
    getTotalItems,
    getTotalPrice,
    getOriginalTotalPrice,
    getTotalDiscount,
    updateQuantity,
    removeFromCart,
  } = useCart()

  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [promoCode, setPromoCode] = useState('')
  const [showPromoInput, setShowPromoInput] = useState(false)

  const totalItems = getTotalItems()
  const itemsTotal = getTotalPrice()
  const originalTotal = getOriginalTotalPrice()
  const discount = getTotalDiscount()
  const subtotal = itemsTotal
  const shipping = 0 // Free shipping
  const tax = 0 // Calculated at checkout
  const total = subtotal + shipping + tax

  /**
   * Handle quantity change for a cart item.
   *
   * @param {number} productId - Product ID
   * @param {number} newQuantity - New quantity
   */
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  /**
   * Handle promo code application.
   */
  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      // Promo code logic would be implemented here
      alert(`Promo code "${promoCode}" would be applied here`)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyContent}>
          <h1 className={styles.emptyTitle}>Your cart is empty</h1>
          <p className={styles.emptyText}>Add some products to get started!</p>
          <Link href='/' className={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Column: Cart Items and Shipping */}
        <div className={styles.leftColumn}>
          {/* Cart Header */}
          <div className={styles.cartHeader}>
            <h1 className={styles.cartTitle}>Cart ({totalItems})</h1>
          </div>

          {/* Shipping Method Selection */}
          <div className={styles.shippingSection}>
            <h2 className={styles.sectionTitle}>Please choose your shipping method:</h2>
            <div className={styles.shippingOptions}>
              {SHIPPING_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`${styles.shippingOption} ${
                    !method.available ? styles.disabled : ''
                  }`}
                >
                  <input
                    type='radio'
                    name='shipping'
                    value={method.id}
                    checked={selectedShipping === method.id}
                    onChange={() => setSelectedShipping(method.id)}
                    disabled={!method.available}
                    className={styles.radioInput}
                  />
                  <div className={styles.radioLabel}>
                    <span className={styles.methodLabel}>{method.label}</span>
                    {!method.available && (
                      <span className={styles.unavailable}>
                        {method.description}
                        <span className={styles.infoIcon} aria-label='Information'>ℹ️</span>
                      </span>
                    )}
                    {method.available && method.id === 'pickup' && (
                      <div className={styles.pickupInfo}>
                        <span className={styles.infoIcon} aria-label='Information'>ℹ️</span>
                        <span className={styles.pickupDescription}>{method.description}</span>
                        <Link href='#' className={styles.changeLink}>Change</Link>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Cart Items */}
          <div className={styles.cartItems}>
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity
              const itemOriginalTotal = (item.originalPrice || item.price) * item.quantity
              const itemDiscount = itemOriginalTotal - itemTotal

              return (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImageContainer}>
                    <img
                      src={item.image || item.images?.[0] || '/placeholder-product.jpg'}
                      alt={item.name}
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>

                    <div className={styles.quantitySection}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        aria-label='Decrease quantity'
                      >
                        −
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        aria-label='Increase quantity'
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.itemPricing}>
                      <div className={styles.itemTotal}>${itemTotal.toFixed(2)}</div>
                      <div className={styles.itemPriceEach}>
                        ${item.price.toFixed(2)} Each
                      </div>
                      {item.originalPrice && (
                        <div className={styles.bestSeller}>Best Seller</div>
                      )}
                    </div>

                    {/* Product Specifications */}
                    {item.colors && (
                      <div className={styles.specifications}>
                        <div className={styles.spec}>
                          <span className={styles.specLabel}>Primary Colour:</span>
                          <span className={styles.specValue}>
                            {item.colors[0]?.startsWith('#') ? 'Black' : item.colors[0]}
                          </span>
                        </div>
                        {item.sizes && (
                          <div className={styles.spec}>
                            <span className={styles.specLabel}>Shoe Size (US):</span>
                            <span className={styles.specValue}>{item.sizes[0]}</span>
                          </div>
                        )}
                        {item.sizes && (
                          <div className={styles.spec}>
                            <span className={styles.specLabel}>Shoe Width:</span>
                            <span className={styles.specValue}>Wide</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Promotional Message */}
                    {itemDiscount > 0 && (
                      <div className={styles.promoMessage}>
                        <span className={styles.infoIcon} aria-label='Information'>ℹ️</span>
                        Take 20% off full-priced* items in-cart
                      </div>
                    )}

                    {/* Shipping Info */}
                    <div className={styles.shippingInfo}>
                      <p>Order online before 2pm and pick up the same day or next day if you order after 2pm</p>
                      <p>Ships in 2-3 business days</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Products You May Also Need */}
          <div className={styles.relatedSection}>
            <h3 className={styles.relatedTitle}>
              <span className={styles.relatedIcon}>📦</span>
              Products You May Also Need
            </h3>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className={styles.rightColumn}>
          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            {/* Price Breakdown */}
            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Item(s) total:</span>
                <span className={styles.priceValue}>${originalTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Item(s) discount:</span>
                  <span className={`${styles.priceValue} ${styles.discount}`}>
                    -${discount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Subtotal:</span>
                <span className={styles.priceValue}>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Shipping:</span>
                <span className={styles.priceValue}>Free</span>
              </div>
              <div className={styles.shippingLink}>
                <Link href='#'>Estimated Shipping Calculate</Link>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Tax:</span>
                <span className={styles.priceValue}>Calculated at Checkout</span>
              </div>
              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span className={styles.priceLabel}>Total:</span>
                <span className={styles.totalValue}>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Savings Message */}
            {discount > 0 && (
              <div className={styles.savingsMessage}>
                <span className={styles.diamondIcon}>💎</span>
                ${discount.toFixed(2)} of Savings in Your Cart
              </div>
            )}

            {/* Promo Code */}
            <div className={styles.promoSection}>
              {!showPromoInput ? (
                <button
                  className={styles.promoToggle}
                  onClick={() => setShowPromoInput(true)}
                >
                  + Apply Promo Code
                </button>
              ) : (
                <div className={styles.promoInput}>
                  <input
                    type='text'
                    placeholder='Enter promo code'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={styles.promoField}
                  />
                  <button
                    className={styles.promoApply}
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Free Shipping Eligibility */}
            <div className={styles.freeShipping}>
              <span className={styles.infoIcon} aria-label='Information'>ℹ️</span>
              You are eligible for Free Shipping
            </div>

            {/* Checkout Buttons */}
            <div className={styles.checkoutSection}>
              <button className={styles.checkoutButton}>
                Checkout
              </button>
              <p className={styles.checkoutAlt}>Or checkout with PayPal or Click to Pay:</p>
              <div className={styles.paymentButtons}>
                <button className={styles.paypalButton}>PayPal</button>
                <button className={styles.clickToPayButton}>
                  <span className={styles.cardIcons}>
                    <span>Diners Club</span>
                    <span>Discover</span>
                    <span>Visa</span>
                    <span>Mastercard</span>
                    <span>Amex</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Rewards Program */}
            <div className={styles.rewardsSection}>
              <p className={styles.rewardsText}>
                Earn up to ${(total * 0.004).toFixed(2)} CT Money on this order with Triangle Rewards.
              </p>
              <button className={styles.signInButton}>Sign In</button>
            </div>

            {/* Disclaimer */}
            <p className={styles.disclaimer}>
              *Taxes and fees are subject to change which may result in a change in your total purchase price.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

