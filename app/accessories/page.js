/**
 * app/accessories/page.js
 *
 * Landing page for the Accessories category.
 * Displays products filtered by Accessories category.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Accessories page component.
 *
 * @returns {JSX.Element} Accessories page JSX
 */
export default function AccessoriesPage () {
  return (
    <CategoryPage
      categoryName='Accessories'
      title='Accessories'
      description='Belts, hats, gloves, and other everyday accessories.'
    />
  )
}


