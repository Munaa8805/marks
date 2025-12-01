/**
 * app/men/page.js
 *
 * Landing page for the Men category.
 * Displays products filtered by Men category.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Men page component.
 *
 * @returns {JSX.Element} Men page JSX
 */
export default function MenPage () {
  return (
    <CategoryPage
      categoryName='Men'
      title='Men'
      description="Explore men's workwear, casual clothing, and footwear."
    />
  )
}


