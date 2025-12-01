/**
 * components/ProductReviews.js
 *
 * Product reviews component displaying customer reviews and ratings.
 * Shows overall rating, customer feedback summary, review images, and individual reviews.
 *
 * Features:
 * - Overall rating with star distribution
 * - Customer feedback summary with tags
 * - Reviews with images gallery
 * - Individual customer reviews
 * - Sub-ratings for different aspects
 * - Helpful/Report buttons
 * - Responsive design
 */

'use client'

import { useState } from 'react'
import styles from './ProductReviews.module.css'

/**
 * Product reviews component.
 * Displays customer reviews and ratings for a product.
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product object
 * @param {number} [props.product.rating] - Overall rating (0-5)
 * @param {number} [props.product.reviews] - Total number of reviews
 * @param {Object} [props.product.reviewData] - Review data object
 * @param {Object} [props.product.reviewData.starDistribution] - Distribution of star ratings
 * @param {string} [props.product.reviewData.summary] - Customer feedback summary
 * @param {Array} [props.product.reviewData.tags] - Customer feedback tags
 * @param {Array} [props.product.reviewData.reviewImages] - Array of review image URLs
 * @param {Array} [props.product.reviewData.reviews] - Array of individual reviews
 * @returns {JSX.Element} ProductReviews component JSX
 */
export default function ProductReviews({ product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const reviewData = product.reviewData || {}

  // Default values
  const overallRating = product.rating || 0
  const totalReviews = product.reviews || 0
  const starDistribution = reviewData.starDistribution || {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }
  const customerSummary = reviewData.summary || ''
  const tags = reviewData.tags || []
  const reviewImages = reviewData.reviewImages || []
  const reviews = reviewData.reviews || []

  /**
   * Calculate percentage for star distribution.
   */
  const getStarPercentage = (starLevel) => {
    const total = Object.values(starDistribution).reduce((a, b) => a + b, 0)
    if (total === 0) return 0
    return (starDistribution[starLevel] / total) * 100
  }

  /**
   * Handle review image navigation.
   */
  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : reviewImages.length - 1
    )
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < reviewImages.length - 1 ? prev + 1 : 0
    )
  }

  /**
   * Handle helpful button click.
   */
  const handleHelpful = (reviewId) => {
    // In a real app, this would update the helpful count
    console.log('Marked review as helpful:', reviewId)
  }

  /**
   * Handle report button click.
   */
  const handleReport = (reviewId) => {
    // In a real app, this would report the review
    console.log('Reported review:', reviewId)
  }

  return (
    <div className={styles.reviewsSection}>
      <h2 className={styles.sectionTitle}>Customer reviews</h2>

      <div className={styles.reviewsContainer}>
        {/* Overall Rating Summary */}
        <div className={styles.ratingSummary}>
          <div className={styles.overallRating}>
            <div className={styles.ratingValue}>
              {overallRating.toFixed(1)} out of 5
            </div>
            <div className={styles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`${styles.star} ${
                    i < Math.floor(overallRating) ? styles.starFilled : ''
                  } ${i === Math.floor(overallRating) && overallRating % 1 >= 0.5 ? styles.starHalf : ''}`}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>
            <div className={styles.totalRatings}>
              {totalReviews.toLocaleString()} global ratings
            </div>
          </div>

          {/* Star Distribution */}
          <div className={styles.starDistribution}>
            {[5, 4, 3, 2, 1].map((starLevel) => {
              const percentage = getStarPercentage(starLevel)
              return (
                <div key={starLevel} className={styles.distributionRow}>
                  <span className={styles.starLabel}>{starLevel} star</span>
                  <div className={styles.distributionBar}>
                    <div
                      className={styles.distributionBarFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={styles.distributionPercentage}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              )
            })}
          </div>

          <details className={styles.ratingsInfo}>
            <summary className={styles.ratingsInfoLink}>
              How are ratings calculated?
            </summary>
            <p className={styles.ratingsInfoText}>
              Ratings are calculated based on customer reviews and verified
              purchases. Each review is weighted equally in the overall rating.
            </p>
          </details>
        </div>

        {/* Customers Say Section */}
        {customerSummary && (
          <div className={styles.customersSay}>
            <h3 className={styles.customersSayTitle}>Customers say</h3>
            <p className={styles.customersSayText}>{customerSummary}</p>
            <p className={styles.customersSaySource}>
              Generated from the text of customer reviews
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className={styles.tagsContainer}>
                <span className={styles.tagsLabel}>Select to learn more:</span>
                <div className={styles.tagsList}>
                  {tags.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.tag} ${
                        tag.positive ? styles.tagPositive : styles.tagNegative
                      }`}
                      aria-label={`Learn more about ${tag.label}`}
                    >
                      {tag.positive ? '✓' : '⊘'} {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reviews with Images */}
        {reviewImages.length > 0 && (
          <div className={styles.reviewsWithImages}>
            <h3 className={styles.reviewsWithImagesTitle}>Reviews with images</h3>
            <div className={styles.imageGallery}>
              {reviewImages.length > 1 && (
                <button
                  type="button"
                  className={styles.galleryNavButton}
                  onClick={handlePreviousImage}
                  aria-label="Previous image"
                >
                  ←
                </button>
              )}
              <div className={styles.imageGalleryContainer}>
                {reviewImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className={`${styles.reviewImage} ${
                      index === selectedImageIndex ? styles.reviewImageActive : ''
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
              {reviewImages.length > 1 && (
                <button
                  type="button"
                  className={styles.galleryNavButton}
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Review This Product */}
        <div className={styles.reviewThisProduct}>
          <h3 className={styles.reviewThisProductTitle}>Review this product</h3>
          <p className={styles.reviewThisProductText}>
            Share your thoughts with other customers
          </p>
          <button
            type="button"
            className={styles.writeReviewButton}
            aria-label="Write a customer review"
          >
            Write a customer review
          </button>
        </div>
        <div>
          
        </div>

        {/* Individual Reviews */}
        {reviews.length > 0 && (
          <div className={styles.individualReviews}>
            <h3 className={styles.individualReviewsTitle}>
              Top reviews from customers
            </h3>
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <span className={styles.reviewerName}>{review.reviewer}</span>
                    <div className={styles.reviewStars}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`${styles.reviewStar} ${
                            i < review.rating ? styles.reviewStarFilled : ''
                          }`}
                          aria-hidden="true"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {review.headline && (
                  <h4 className={styles.reviewHeadline}>{review.headline}</h4>
                )}

                <div className={styles.reviewMetadata}>
                  <span>
                    Reviewed on {review.date} • {review.location}
                  </span>
                  {review.verified && (
                    <span className={styles.verifiedBadge}>Verified Purchase</span>
                  )}
                  {review.style && (
                    <span className={styles.styleBadge}>Style: {review.style}</span>
                  )}
                </div>

                {review.text && (
                  <p className={styles.reviewText}>{review.text}</p>
                )}

                {/* Sub-ratings */}
                {review.subRatings && review.subRatings.length > 0 && (
                  <div className={styles.subRatings}>
                    {review.subRatings.map((subRating, subIndex) => (
                      <div key={subIndex} className={styles.subRating}>
                        <span className={styles.subRatingLabel}>
                          {subRating.label}
                        </span>
                        <div className={styles.subRatingStars}>
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`${styles.subRatingStar} ${
                                i < subRating.rating
                                  ? styles.subRatingStarFilled
                                  : ''
                              }`}
                              aria-hidden="true"
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className={styles.subRatingValue}>
                          {subRating.rating}/5
                        </span>
                        {subRating.description && (
                          <p className={styles.subRatingDescription}>
                            {subRating.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className={styles.reviewActions}>
                  <span className={styles.helpfulCount}>
                    {review.helpfulCount || 0} people found this helpful
                  </span>
                  <div className={styles.reviewButtons}>
                    <button
                      type="button"
                      className={styles.helpfulButton}
                      onClick={() => handleHelpful(review.id || index)}
                      aria-label="Mark as helpful"
                    >
                      Helpful
                    </button>
                    <button
                      type="button"
                      className={styles.reportButton}
                      onClick={() => handleReport(review.id || index)}
                      aria-label="Report review"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

