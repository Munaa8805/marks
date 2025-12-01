/**
 * components/Footer.js
 *
 * Footer component for the application.
 * Displays links, promotional content, and legal information.
 *
 * Features:
 * - Multiple columns of navigation links
 * - Email signup form
 * - App download section with QR code
 * - Social media links
 * - Accessibility widget
 * - Copyright and disclaimer text
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

/**
 * Footer component.
 *
 * @returns {JSX.Element} Footer component JSX
 */
export default function Footer () {
  const [email, setEmail] = useState('')

  /**
   * Handle email signup form submission.
   *
   * @param {Event} e - Form submit event
   */
  const handleEmailSignup = (e) => {
    e.preventDefault()
    if (email.trim()) {
      // Email signup logic would be implemented here
      alert(`Email signup for: ${email}`)
      setEmail('')
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Upper Section */}
        <div className={styles.upperSection}>
          {/* Customer Support Column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Customer Support</h3>
            <ul className={styles.linkList}>
              <li><Link href='/order-status' className={styles.link}>Order Status</Link></li>
              <li><Link href='/pickup-delivery' className={styles.link}>Pickup & Delivery</Link></li>
              <li><Link href='/shipping-delivery' className={styles.link}>Shipping & Delivery</Link></li>
              <li><Link href='/returns-exchanges' className={styles.link}>Returns & Exchanges</Link></li>
              <li><Link href='/help-faqs' className={styles.link}>Help & FAQs</Link></li>
              <li><Link href='/store-locator' className={styles.link}>Store Locator</Link></li>
              <li><Link href='/gift-cards' className={styles.link}>Gift Cards</Link></li>
              <li><Link href='/contact-us' className={styles.link}>Contact Us</Link></li>
              <li><Link href='/product-recalls' className={styles.link}>Product Recalls</Link></li>
              <li><Link href='/cookie-settings' className={styles.link}>Cookie Settings</Link></li>
            </ul>
          </div>

          {/* Our Partners Column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Our Partners</h3>
            <ul className={styles.linkList}>
              <li><Link href='/partners/canadian-tire' className={styles.link}>Canadian Tire</Link></li>
              <li><Link href='/partners/sportchek' className={styles.link}>SportChek</Link></li>
              <li><Link href='/' className={styles.link}>Mark&apos;s</Link></li>
              <li><Link href='/partners/helly-hansen' className={styles.link}>Helly Hansen</Link></li>
              <li><Link href='/partners/triangle' className={styles.link}>Triangle</Link></li>
              <li><Link href='/partners/partsource' className={styles.link}>PartSource</Link></li>
              <li><Link href='/partners/pro-hockey-life' className={styles.link}>Pro Hockey Life</Link></li>
              <li><Link href='/partners/sports-experts' className={styles.link}>Sports Experts</Link></li>
              <li><Link href='/partners/trio-hockey' className={styles.link}>Trio Hockey</Link></li>
              <li><Link href='/partners/our-banners' className={styles.link}>Our Banners</Link></li>
            </ul>
          </div>

          {/* About Us Column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>About Us</h3>
            <ul className={styles.linkList}>
              <li><Link href='/about' className={styles.link}>About Mark&apos;s</Link></li>
              <li><Link href='/our-brands' className={styles.link}>Our Brands</Link></li>
              <li><Link href='/careers' className={styles.link}>Careers</Link></li>
              <li><Link href='/about-triangle-id' className={styles.link}>About Triangle ID</Link></li>
              <li><Link href='/sustainability' className={styles.link}>Sustainability</Link></li>
              <li><Link href='/jumpstart' className={styles.link}>Jumpstart</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li><Link href='/privacy-policy' className={styles.link}>Privacy Policy</Link></li>
              <li><Link href='/terms-conditions' className={styles.link}>Terms and Conditions</Link></li>
              <li><Link href='/site-map' className={styles.link}>Site Map</Link></li>
              <li><Link href='/accessibility' className={styles.link}>Accessibility</Link></li>
              <li><Link href='/pricing-policy' className={styles.link}>Pricing Policy</Link></li>
              <li><Link href='/return-policy' className={styles.link}>Return Policy</Link></li>
              <li><Link href='/quebec-right-to-repair' className={styles.link}>Quebec Right to Repair</Link></li>
            </ul>
          </div>

          {/* Exclusive Welcome Offer Column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Exclusive Welcome Offer</h3>
            <p className={styles.offerText}>
              Join our email community & receive $15 off your next purchase of $50 or more*.
            </p>
            <form onSubmit={handleEmailSignup} className={styles.emailForm}>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
                required
              />
              <button type='submit' className={styles.signUpButton}>
                Sign Up
              </button>
            </form>
          </div>

          {/* Download the Triangle App Section */}
          <div className={styles.appSection}>
            <h3 className={styles.columnTitle}>Download the Triangle App</h3>
            <p className={styles.appText}>
              Scan the QR code to access personalized weekly offers.
            </p>
            <div className={styles.qrCodeContainer}>
              <div className={styles.qrCode}>
                {/* QR Code placeholder - in production, this would be an actual QR code image */}
                <div className={styles.qrPlaceholder}>
                  <div className={styles.qrGrid}>
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className={styles.qrSquare} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Link href='/learn-more' className={styles.learnMoreLink}>Learn More</Link>
            <div className={styles.appStoreBadges}>
              <a
                href='https://apps.apple.com'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.appStoreBadge}
                aria-label='Download on the App Store'
              >
                <span className={styles.appStoreText}>Download on the App Store</span>
              </a>
              <a
                href='https://play.google.com'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.googlePlayBadge}
                aria-label='GET IT ON Google Play'
              >
                <span className={styles.googlePlayText}>GET IT ON Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className={styles.lowerSection}>
          {/* Social Media Icons */}
          <div className={styles.socialMedia}>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialIcon}
              aria-label='Facebook'
            >
              <span className={styles.socialText}>f</span>
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialIcon}
              aria-label='X (Twitter)'
            >
              <span className={styles.socialText}>X</span>
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialIcon}
              aria-label='Instagram'
            >
              <span className={styles.socialIconInsta}>📷</span>
            </a>
            <a
              href='https://youtube.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialIcon}
              aria-label='YouTube'
            >
              <span className={styles.socialIconYoutube}>▶</span>
            </a>
            <a
              href='https://tiktok.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialIcon}
              aria-label='TikTok'
            >
              <span className={styles.socialIconTiktok}>♪</span>
            </a>
          </div>

          {/* Accessibility Widget */}
          <div className={styles.accessibilityWidget}>
            <button
              className={styles.accessibilityButton}
              aria-label='Accessibility options'
            >
              <span className={styles.accessibilityIcon}>♿</span>
            </button>
            <button
              className={styles.messageButton}
              aria-label='Contact support'
            >
              <span className={styles.messageIcon}>💬</span>
            </button>
          </div>

          {/* Mark's Logo */}
          <div className={styles.logoSection}>
            <div className={styles.logoMark} aria-hidden='true' />
            <span className={styles.logoText}>Mark&apos;s</span>
          </div>

          {/* Copyright */}
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              © Copyright 2025. Canadian Tire. All rights reserved.
            </p>
          </div>

          {/* Disclaimer */}
          <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
              *Information. We reserve the right to limit quantities. Sorry no rainchecks (excluding Quebec). Shipping fees apply. Shipping fees and delivery times vary depending on location, size and weight of the item(s) and is only available within the province of the Canadian Tire retail location (&quot;Store&quot;) from which the item(s) was purchased. Bulk items will only be delivered within a 100km radius of the Store. Not available in Recontre East, NL. Conditions and restrictions apply. Visit for more information. + Was price reflects the last national regular price this product was sold for. ‡ Not all clearance priced items and price points available at all locations. Selection may vary by location.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

