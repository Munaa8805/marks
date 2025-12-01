/**
 * app/featured/page.js
 *
 * Landing page for the Featured collection.
 * Displays featured products.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Featured page component.
 *
 * @returns {JSX.Element} Featured page JSX
 */
export default function FeaturedPage () {
  return (
    <CategoryPage
      categoryName='Featured'
      title='Featured'
      description="Editor's picks and highlighted collections."
    />
  )
}


