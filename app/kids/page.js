/**
 * app/kids/page.js
 *
 * Landing page for the Kids category.
 * Displays products filtered by Kids category.
 */

import CategoryPage from '@/components/CategoryPage'

/**
 * Kids page component.
 *
 * @returns {JSX.Element} Kids page JSX
 */
export default function KidsPage () {
  return (
    <CategoryPage
      categoryName='Kids'
      title='Kids'
      description='Shop durable and comfortable clothing and footwear for kids.'
    />
  )
}


