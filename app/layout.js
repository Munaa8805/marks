/**
 * app/layout.js
 *
 * Root layout component for the Next.js application.
 * This component wraps all pages and provides global structure.
 *
 * Provides:
 * - HTML document structure
 * - Metadata configuration
 * - Global styles import
 * - CartProvider context wrapper
 * - Global Navbar
 */

import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

/**
 * Metadata for the application.
 * Used by Next.js for SEO and page rendering.
 */
export const metadata = {
  title: 'Shopping Cart Demo',
  description: 'A modern shopping cart implementation with Next.js',
}

/**
 * Root layout component.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Root layout JSX
 */
export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Wrap entire app with CartProvider for global cart state access */}
        <CartProvider>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}

