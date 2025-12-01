/**
 * components/ProductDetail.js
 *
 * Product detail component displaying full product information.
 * Shows product image gallery, details, options, and add to cart functionality.
 *
 * Features:
 * - Product image gallery with thumbnails
 * - Product title, rating, and pricing
 * - Color selector with swatches
 * - Size selector
 * - Quantity selector
 * - Add to cart functionality
 * - Additional product information
 * - Responsive design
 * - Accessibility features
 */

'use client'

import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'
import ProductReviews from './ProductReviews'
import styles from './ProductDetail.module.css'

/**
 * Product detail component.
 * Displays full product information with image gallery and options.
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product object with id, name, price, etc.
 * @param {string[]} [props.product.images] - Array of product image URLs
 * @param {number} [props.product.rating] - Product rating (0-5)
 * @param {number} [props.product.reviews] - Number of reviews
 * @param {number} [props.product.originalPrice] - Original price for discount display
 * @param {string[]} [props.product.colors] - Product available colors
 * @param {string[]} [props.product.sizes] - Product available sizes
 * @param {number} [props.product.stock] - Product stock quantity
 * @param {Function} [props.onAddToCart] - Callback when item is added to cart
 * @returns {JSX.Element} ProductDetail component JSX
 */
export default function ProductDetail({ product, onAddToCart }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Get product images (use single image or images array)
  const productImages = product.images || (product.image ? [product.image] : [])
  const mainImage = productImages[selectedImageIndex] || productImages[0]

  /**
   * Handle add to cart button click.
   * Adds product to cart with selected options.
   */
  const handleAddToCart = () => {
    setIsAdding(true)

    // Add product with selected options
    const productToAdd = {
      ...product,
      selectedColor: selectedColor || (product.colors && product.colors[0]) || null,
      selectedSize: selectedSize || (product.sizes && product.sizes[0]) || null,
    }

    addToCart(productToAdd, quantity)

    // Trigger parent callback if provided
    if (onAddToCart) {
      onAddToCart()
    }

    // Reset button state after animation
    setTimeout(() => {
      setIsAdding(false)
    }, 300)
  }

  /**
   * Handle quantity increment.
   */
  const handleIncrement = () => {
    const maxQuantity = product.stock !== undefined ? product.stock : Infinity
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }

  /**
   * Handle quantity decrement.
   */
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  /**
   * Handle quantity input change.
   */
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0) {
      const maxQuantity = product.stock !== undefined ? product.stock : Infinity
      setQuantity(Math.min(value, maxQuantity))
    }
  }

  /**
   * Handle color selection.
   */
  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }

  /**
   * Handle size selection.
   */
  const handleSizeSelect = (size) => {
    setSelectedSize(size)
  }

  /**
   * Handle image navigation.
   */
  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : productImages.length - 1
    )
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < productImages.length - 1 ? prev + 1 : 0
    )
  }

  /**
   * Check if product is out of stock.
   * @returns {boolean} True if product has stock property and it's 0 or less
   */
  const isOutOfStock = product.stock !== undefined && product.stock <= 0

  /**
   * Calculate discount percentage.
   */
  const discountPercentage =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  /**
   * Set default selected color and size on mount.
   */
  useEffect(() => {
    if (product.colors && product.colors.length > 0 && selectedColor === null) {
      setSelectedColor(product.colors[0])
    }
    if (product.sizes && product.sizes.length > 0 && selectedSize === null) {
      setSelectedSize(product.sizes[0])
    }
  }, [product.colors, product.sizes])

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        {/* Image Gallery Section */}
        <div className={styles.imageSection}>
          {/* Thumbnail images */}
          {productImages.length > 1 && (
            <div className={styles.thumbnails}>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.thumbnail} ${
                    selectedImageIndex === index ? styles.thumbnailActive : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className={styles.mainImageContainer}>
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className={styles.mainImage}
                loading="eager"
              />
            ) : (
              <div className={styles.placeholderImage}>
                {product.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Image navigation arrows */}
            {productImages.length > 1 && (
              <>
                <button
                  type="button"
                  className={styles.imageNavButton}
                  onClick={handlePreviousImage}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  className={`${styles.imageNavButton} ${styles.imageNavButtonRight}`}
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className={styles.detailsSection}>
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          {/* Product title */}
          <h1 className={styles.title}>{product.name}</h1>

          {/* Rating */}
          {product.rating !== undefined && (
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.star} ${
                      i < Math.floor(product.rating) ? styles.starFilled : ''
                    }`}
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className={styles.ratingText}>
                {product.rating.toFixed(1)} ({product.reviews || 0} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className={styles.priceSection}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className={styles.discountBadge}>
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className={styles.description}>{product.description}</p>
          )}

          {/* Color selector */}
          {product.colors && product.colors.length > 0 && (
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                Color:{' '}
                {selectedColor && (
                  <span className={styles.selectedValue}>{selectedColor}</span>
                )}
              </label>
              <div className={styles.colorsList} role="list" aria-label="Available colors">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.colorSwatch} ${
                      selectedColor === color ? styles.colorSelected : ''
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                    aria-label={`Select color: ${color}`}
                    aria-pressed={selectedColor === color}
                    role="listitem"
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                Size:{' '}
                {selectedSize && (
                  <span className={styles.selectedValue}>{selectedSize}</span>
                )}
              </label>
              <div className={styles.sizesList} role="list" aria-label="Available sizes">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.sizeSelected : ''
                    }`}
                    onClick={() => handleSizeSelect(size)}
                    aria-pressed={selectedSize === size}
                    role="listitem"
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="#size-guide" className={styles.sizeGuideLink}>
                Size Guide
              </a>
            </div>
          )}

          {/* Quantity selector */}
          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>Quantity</label>
            <div className={styles.quantityControls}>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={handleDecrement}
                disabled={quantity <= 1 || isOutOfStock}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                className={styles.quantityInput}
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock !== undefined ? product.stock : undefined}
                disabled={isOutOfStock}
                aria-label="Product quantity"
              />
              <button
                type="button"
                className={styles.quantityButton}
                onClick={handleIncrement}
                disabled={
                  isOutOfStock ||
                  (product.stock !== undefined && quantity >= product.stock)
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            {product.stock !== undefined && (
              <p className={styles.stockInfo}>
                {isOutOfStock
                  ? 'Out of stock'
                  : `In stock - ships within 2-3 days`}
              </p>
            )}
          </div>

          {/* Add to Cart button */}
          <button
            className={`${styles.addToCartButton} ${isAdding ? styles.adding : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            aria-label={`Add ${quantity} ${product.name} to cart`}
            aria-disabled={isAdding || isOutOfStock}
          >
            <span className={styles.cartIcon}>🛒</span>
            {isAdding
              ? 'Added to Cart'
              : isOutOfStock
              ? 'Out of Stock'
              : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
          </button>

          {/* Additional information */}
          <div className={styles.additionalInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>↩️</span>
              <span>30-Day Returns</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🛡️</span>
              <span>5-Year Warranty</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>💬</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Reviews Section */}
      <ProductReviews product={product} />
    </div>
  )
}

