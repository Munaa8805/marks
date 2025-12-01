/**
 * app/workwear/page.js
 *
 * Landing page for the Workwear category.
 * Displays products filtered by Workwear category.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Workwear page component.
 *
 * @returns {JSX.Element} Workwear page JSX
 */
export default function WorkwearPage () {
  return (
    <CategoryPage
      categoryName='Workwear'
      title='Workwear'
      description='Heavy-duty work clothing designed for tough jobs.'
    />
  )
}


