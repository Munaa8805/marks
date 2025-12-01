/**
 * app/work-boots-and-shoes/page.js
 *
 * Landing page for the Work Boots & Shoes category.
 * Displays products filtered by Work Boots & Shoes category.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Work Boots & Shoes page component.
 *
 * @returns {JSX.Element} Work Boots & Shoes page JSX
 */
export default function WorkBootsAndShoesPage () {
  return (
    <CategoryPage
      categoryName='Work Boots & Shoes'
      title='Work Boots & Shoes'
      description='Safety-rated work boots and shoes for every environment.'
    />
  )
}


