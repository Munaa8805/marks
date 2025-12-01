/**
 * app/cyber-days/page.js
 *
 * Landing page for the Cyber Days promotion.
 * Displays featured and sale products.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Cyber Days page component.
 *
 * @returns {JSX.Element} Cyber Days page JSX
 */
export default function CyberDaysPage () {
  return (
    <CategoryPage
      categoryName='Cyber Days'
      title='Cyber Days'
      description='Online-only deals for Cyber Days – limited time offers.'
    />
  )
}


