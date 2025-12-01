# Shopping Cart Demo

A modern, fully-functional shopping cart implementation built with Next.js 14, React 18, and CSS Modules.

## Features

- 🛒 **Shopping Cart Functionality**
  - Add products to cart
  - Update item quantities
  - Remove items from cart
  - Clear entire cart
  - Calculate total prices

- 💾 **Persistent Storage**
  - Cart state persists in localStorage
  - Survives page refreshes

- 🎨 **Modern UI/UX**
  - Responsive design for all screen sizes
  - Smooth animations and transitions
  - Slide-in cart sidebar
  - Empty cart state handling
  - Product stock quantity display
  - Product color swatches
  - Visual feedback for user actions

- ⚡ **Performance**
  - Optimized React Context usage
  - Lazy loading for images
  - Efficient state management

## Project Structure

```
demo/
├── app/                    # Next.js App Router directory
│   ├── layout.js          # Root layout with CartProvider
│   ├── page.js            # Home page with product listing
│   ├── globals.css        # Global styles and CSS variables
│   └── page.module.css    # Page-specific styles
├── components/            # React components
│   ├── Cart.js            # Shopping cart sidebar component
│   ├── Cart.module.css    # Cart component styles
│   ├── CartItem.js        # Individual cart item component
│   ├── CartItem.module.css # CartItem component styles
│   ├── ProductCard.js     # Product display card
│   └── ProductCard.module.css # ProductCard component styles
├── context/               # React Context providers
│   └── CartContext.js     # Cart state management context
├── utils/                 # Utility functions and constants
│   └── constants.js       # Product data and constants
├── next.config.js         # Next.js configuration
├── jsconfig.json          # Path alias configuration
└── package.json           # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Adding Products to Cart

- Click the "Add to Cart" button on any product card
- The cart badge will update with the total number of items

### Managing Cart Items

- Click the cart icon in the header to open the cart sidebar
- Use the `+` and `-` buttons to adjust item quantities
- Click the trash icon to remove an item
- Click "Clear Cart" to remove all items
- The total price is automatically calculated and displayed

### Features Explained

#### Cart Context (`context/CartContext.js`)

Provides global cart state management:
- `cartItems`: Array of items in cart
- `addToCart(product, quantity)`: Add item to cart
- `removeFromCart(productId)`: Remove item from cart
- `updateQuantity(productId, quantity)`: Update item quantity
- `clearCart()`: Clear all items
- `getTotalItems()`: Get total item count
- `getTotalPrice()`: Calculate total price

#### Components

- **Cart**: Slide-in sidebar displaying cart items and totals
- **CartItem**: Individual cart item with quantity controls
- **ProductCard**: Product display card with add to cart functionality
  - Displays product image, name, description, and price
  - Shows stock quantity with out-of-stock handling
  - Displays available product colors as color swatches
  - Add to cart button with visual feedback
  - Fully accessible with ARIA labels and semantic HTML
  - Responsive design for all screen sizes

## Customization

### Adding Products

Edit `utils/constants.js` to add or modify products:

```javascript
export const PRODUCTS = [
  {
    id: 1,
    name: 'Product Name',
    description: 'Product description',
    price: 29.99,
    image: 'https://example.com/image.jpg',
    stock: 10,              // Optional: Stock quantity
    colors: ['#FF0000', '#00FF00', '#0000FF'], // Optional: Available colors
  },
  // Add more products...
]
```

**Product Properties:**
- `id` (required): Unique identifier
- `name` (required): Product name
- `price` (required): Product price in USD
- `description` (optional): Product description
- `image` (optional): Product image URL
- `stock` (optional): Available stock quantity (displays "Out of Stock" if 0 or less)
- `colors` (optional): Array of color hex codes or names for color swatches

### Styling

- Global styles: `app/globals.css`
- CSS variables can be modified in `:root` selector
- Component-specific styles: `components/*.module.css`

### Path Aliases

The project uses `@/` path alias configured in `jsconfig.json`:
- `@/components/*` → `components/*`
- `@/context/*` → `context/*`
- `@/utils/*` → `utils/*`

## Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **CSS Modules**: Scoped styling
- **localStorage**: Client-side storage for cart persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

