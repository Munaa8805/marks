/**
 * app/black-friday/page.js
 *
 * Landing page for the Black Friday promotion.
 * Displays products on sale.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Black Friday page component.
 *
 * @returns {JSX.Element} Black Friday page JSX
 */
export default function BlackFridayPage () {
  return (
    <CategoryPage
      categoryName='Black Friday'
      title='Black Friday'
      description='Door-crasher deals and Black Friday specials.'
    />
  )
}


