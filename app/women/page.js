/**
 * app/women/page.js
 *
 * Landing page for the Women category.
 * Displays products filtered by Women category.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Women page component.
 *
 * @returns {JSX.Element} Women page JSX
 */
export default function WomenPage () {
  return (
    <CategoryPage
      categoryName='Women'
      title='Women'
      description="Browse our collection of women's clothing, footwear, and accessories."
    />
  )
}


