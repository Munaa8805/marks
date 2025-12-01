/**
 * components/ProductCard.js
 *
 * Product card component displaying individual products.
 * Shows product information and add to cart functionality.
 *
 * Features:
 * - Product image display with lazy loading
 * - Product name, description, and price
 * - Product stock quantity display
 * - Product colors display
 * - Add to cart button with visual feedback
 * - Responsive design
 * - Accessibility features
 */

"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProductCard.module.css";

/**
 * Product card component.
 * Displays a single product with add to cart functionality.
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product object with id, name, price, etc.
 * @param {number} [props.product.stock] - Product stock quantity (optional)
 * @param {string[]} [props.product.colors] - Product available colors (optional)
 * @param {Function} [props.onAddToCart] - Callback when item is added to cart
 * @returns {JSX.Element} ProductCard component JSX
 */
export default function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  /**
   * Handle product card click to navigate to product detail page.
   */
  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };

  /**
   * Handle add to cart button click.
   * Adds product to cart with selected quantity and color.
   */
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add product with selected quantity and color
    const productToAdd = {
      ...product,
      selectedColor: selectedColor || (product.colors && product.colors[0]) || null,
    };
    
    addToCart(productToAdd, quantity);

    // Trigger parent callback if provided
    if (onAddToCart) {
      onAddToCart();
    }

    // Reset button state after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  };

  /**
   * Handle quantity increment.
   */
  const handleIncrement = () => {
    const maxQuantity = product.stock !== undefined ? product.stock : Infinity;
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  /**
   * Handle quantity decrement.
   */
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  /**
   * Handle quantity input change.
   */
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      const maxQuantity = product.stock !== undefined ? product.stock : Infinity;
      setQuantity(Math.min(value, maxQuantity));
    }
  };

  /**
   * Handle color selection.
   */
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  /**
   * Check if product is out of stock.
   * @returns {boolean} True if product has stock property and it's 0 or less
   */
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  /**
   * Set default selected color on mount or when product colors change.
   */
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      // Only set if no color is selected or selected color is not in available colors
      if (
        selectedColor === null ||
        !product.colors.includes(selectedColor)
      ) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product.colors]);

  return (
    <article
      className={styles.productCard}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Product image */}
      <div
        className={styles.imageContainer}
        onClick={handleProductClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleProductClick();
          }
        }}
        aria-label={`View details for ${product.name}`}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.placeholderImage} aria-hidden="true">
            {product.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Product information */}
      <div className={styles.content}>
        <h3
          className={styles.name}
          onClick={handleProductClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleProductClick();
            }
          }}
          aria-label={`View details for ${product.name}`}
        >
          {product.name}
        </h3>

        {/* Stock quantity display */}
        {product.stock !== undefined && (
          <div className={styles.stockContainer}>
            <span
              className={`${styles.stock} ${
                isOutOfStock ? styles.outOfStock : ""
              }`}
              aria-live="polite"
            >
              {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
            </span>
          </div>
        )}

        {/* Product colors display */}
        {product.colors && product.colors.length > 0 && (
          <div className={styles.colorsContainer}>
            <span className={styles.colorsLabel}>Colors:</span>
            <div
              className={styles.colorsList}
              role="list"
              aria-label="Available colors"
            >
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.colorSwatch} ${
                    selectedColor === color ? styles.colorSelected : ""
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

        {/* Product description */}
        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        {/* Quantity selector */}
        <div className={styles.quantityContainer}>
          <span className={styles.quantityLabel}>Quantity:</span>
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
        </div>

        {/* Price and add to cart */}
        <div className={styles.footer}>
          <span
            className={styles.price}
            aria-label={`Price: $${product.price.toFixed(2)}`}
          >
            ${product.price.toFixed(2)}
          </span>
          <button
            className={`${styles.addButton} ${isAdding ? styles.adding : ""}`}
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            aria-label={`Add ${quantity} ${product.name} to cart`}
            aria-disabled={isAdding || isOutOfStock}
          >
            {isAdding
              ? "✓ Added"
              : isOutOfStock
              ? "Out of Stock"
              : `Add to Cart (${quantity})`}
          </button>
        </div>
      </div>
    </article>
  );
}
