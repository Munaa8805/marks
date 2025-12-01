/**
 * app/shoes/page.js
 *
 * Landing page for the Shoes category.
 * Displays products filtered by Shoes category.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Shoes page component.
 *
 * @returns {JSX.Element} Shoes page JSX
 */
export default function ShoesPage () {
  return (
    <CategoryPage
      categoryName='Shoes'
      title='Shoes'
      description='Find the latest casual and performance footwear.'
    />
  )
}


