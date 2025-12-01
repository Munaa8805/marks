/**
 * components/Navbar.js
 *
 * Global navigation bar component inspired by the provided screenshot.
 * Layout:
 * - Top promo bar (orange) with marketing message
 * - Main nav bar (dark) with logo, location, search, and account/actions
 * - Category bar with primary navigation links
 * - Mobile-friendly menu toggle
 */

'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Navbar.module.css'

const CATEGORY_LINKS = [
  { label: 'Women', href: '/women' },
  { label: 'Men', href: '/men' },
  { label: 'Shoes', href: '/shoes' },
  { label: 'Kids', href: '/kids' },
  { label: 'Workwear', href: '/workwear' },
  { label: 'Work Boots & Shoes', href: '/work-boots-and-shoes' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Sale & Clearance', href: '/sale-clearance' },
  { label: 'Cyber Days', href: '/cyber-days' },
  { label: 'Black Friday', href: '/black-friday' },
  { label: 'Featured', href: '/featured' },
  { label: 'Brands', href: '/brands' },
  { label: 'Gift Cards', href: '/gift-cards' }
]

export default function Navbar () {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open)
  }

  return (
    <header className={styles.navWrapper}>
      {/* Top promo strip */}
      <div className={styles.promoBar}>
        <p className={styles.promoText}>
          Shop Cyber Days on now: December 1st–3rd. Online only. Save up to 60% + Free Shipping.
        </p>
      </div>

      {/* Main navigation bar */}
      <div className={styles.mainBar}>
        <div className={styles.mainBarInner}>
          {/* Logo */}
          <div className={styles.logoArea}>
            <div className={styles.logoMark} aria-hidden='true' />
            <div className={styles.logoText}>Mark&apos;s</div>
          </div>

          {/* Location info (desktop / tablet) */}
          <div className={styles.locationArea}>
            <span className={styles.locationPin} aria-hidden='true'>📍</span>
            <div className={styles.locationTextGroup}>
              <span className={styles.locationTitle}>Calgary Shawnessy</span>
              <span className={styles.locationMeta}>Closed · Opens at 9:00 a.m.</span>
            </div>
          </div>

          {/* Search */}
          <div className={styles.searchArea}>
            <input
              type='search'
              className={styles.searchInput}
              placeholder='Search'
              aria-label='Search products'
            />
            <button className={styles.searchButton} aria-label='Search'>
              🔍
            </button>
          </div>

          {/* Right side actions (desktop) */}
          <nav className={styles.actionsArea} aria-label='Account and utilities'>
            <button className={styles.actionLink} type='button'>Support</button>
            <button className={styles.actionLink} type='button'>Email Sign Up</button>
            <button className={styles.actionLink} type='button'>Order Status</button>
            <Link href='/login' className={styles.actionLink}>
              Sign In
            </Link>
          </nav>

          {/* Mobile menu toggle (visible on mobile only) */}
          <button
            type='button'
            className={styles.mobileMenuButton}
            onClick={handleToggleMobileMenu}
            aria-label='Toggle navigation menu'
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.mobileMenuIcon} />
          </button>
        </div>
      </div>

      {/* Desktop category navigation bar */}
      <div className={styles.categoryBar}>
        <nav className={styles.categoryInner} aria-label='Primary'>
          {CATEGORY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.categoryLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile left sidebar menu */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={handleToggleMobileMenu}
          aria-hidden='true'
        />
      )}
      <aside
        className={`${styles.mobileSidebar} ${
          isMobileMenuOpen ? styles.mobileSidebarOpen : ''
        }`}
        aria-label='Mobile navigation'
      >
        <div className={styles.mobileSidebarHeader}>
          <div className={styles.logoArea}>
            <div className={styles.logoMark} aria-hidden='true' />
            <div className={styles.logoText}>Mark&apos;s</div>
          </div>
          <button
            type='button'
            className={styles.mobileCloseButton}
            onClick={handleToggleMobileMenu}
            aria-label='Close menu'
          >
            ×
          </button>
        </div>
        <nav className={styles.mobileNavList}>
          {CATEGORY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileNavItem}
              onClick={handleToggleMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  )
}

