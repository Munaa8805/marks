/**
 * app/sale-clearance/page.js
 *
 * Landing page for the Sale & Clearance category.
 * Displays products that are on sale.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Sale & Clearance page component.
 *
 * @returns {JSX.Element} Sale & Clearance page JSX
 */
export default function SaleClearancePage () {
  return (
    <CategoryPage
      categoryName='Sale & Clearance'
      title='Sale & Clearance'
      description='Save on markdowns, limited-time offers, and clearance items.'
    />
  )
}


