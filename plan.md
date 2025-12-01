# Product Card Component Plan

## Overview

Create a ProductCard component that displays individual products in a card layout with image, name, description, price, and add-to-cart functionality. The component will integrate with the existing CartContext and follow the project's CSS Modules styling pattern.

## Implementation Details

### Component Structure

- **File**: `components/ProductCard.js`
- **Styles**: `components/ProductCard.module.css`
- **Pattern**: CSS Modules (matching existing Cart and CartItem components)
- **Context**: Uses `useCart` hook from `CartContext`

### Component Features

1. **Product Display**

   - Product image with lazy loading
   - Fallback placeholder for missing images
   - Product name (heading)
   - Product stock quantity
   - Product colors
   - Optional product description
   - Formatted price display

2. **Add to Cart Functionality**

   - Add to cart button
   - Integration with CartContext's `addToCart` method
   - Visual feedback on button click (loading/added state)
   - Optional callback prop for parent component

3. **Responsive Design**

   - Mobile-friendly layout
   - Responsive image sizing
   - Adaptive button and text sizing
   - Grid-friendly card layout

4. **Accessibility**

   - Proper ARIA labels
   - Semantic HTML structure
   - Keyboard navigation support

### Props Interface

```javascript
{
  product: {
    id: number,
    name: string,
    description?: string,
    price: number,
    image?: string
  },
  onAddToCart?: () => void  // Optional callback
}
```

### Styling Approach

- Use CSS custom properties (matching existing components)
- Hover effects for interactivity
- Smooth transitions
- Card shadow and border radius
- Responsive breakpoints at 768px and 480px

### Integration Points

- Imported and used in `app/page.js` within products grid
- Connects to `CartContext` via `useCart` hook
- Follows same documentation pattern as other components

## Files to Create/Modify

1. **Create**: `components/ProductCard.js`

   - Client component ('use client')
   - Uses CartContext
   - Implements add to cart logic
   - Includes JSDoc comments

2. **Create**: `components/ProductCard.module.css`

   - Card layout styles
   - Image container and placeholder styles
   - Button states and animations
   - Responsive media queries
   - Hover effects and transitions

## Dependencies

- React hooks: `useState` (for button state)
- Context: `CartContext` (via `useCart` hook)
- Product data structure from `utils/constants.js`

## Notes

- Component already exists in codebase - this plan assumes enhancement or recreation
- Follows existing code patterns and documentation style
- No TypeScript (per user rules)
- Mobile-first responsive design