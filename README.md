# ShopZone — Editorial Concept Store SPA

A high-character, responsive e-commerce Single Page Application (SPA) built with **Vite + React (JSX) + react-router-dom** and styled using **Plain CSS (CSS Custom Properties & CSS Modules)**.

Built with an editorial lookbook aesthetic inspired by boutique publications: tactile warm paper tones (`#F4EFE6`), deep ink (`#1B1B1B`), burnt tangerine accents (`#E8541E`), neo-brutalist 2px ink borders, hard offset shadows, typographic pairing of Fraunces and Space Grotesk, and micro-interactions.

---

## ✦ Getting Started

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

### 1. Installation
Clone or download the repository into your project directory and install dependencies:
```bash
npm install
```

### 2. Development Server
Start the Vite local development server:
```bash
npm run dev
```
Open your browser to `http://localhost:5173`.

### 3. Production Build & Audit
Create an optimized production bundle:
```bash
npm run build
```
Preview the built bundle locally:
```bash
npm run preview
```

---

## ✦ Routes Table

| Route | Page Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | Public | Asymmetric editorial hero, sticker badge ("Free shipping over $50"), infinite marquee, curated editions, and store philosophy. |
| `/shop` | `ShopPage` | Public | Full catalog with client-side category filter pills, real-time search box, and price/rating sorting. |
| `/product/:id` | `ProductDetailPage` | Public | Product details via `useParams`, interactive thumbnail switcher, strikethrough discount, SVG rating stars, quantity stepper, and mobile sticky purchase bar. |
| `/cart` | `CartPage` | Public | Bag overview, line items, quantity steppers, subtotal/shipping calculation, and custom SVG empty-state illustration. |
| `/login` | `LoginPage` | Public | Guest session authentication ("Login as Guest"), redirecting back to the previous protected target. |
| `/checkout` | `CheckoutPage` | **Protected** | Guarded by `ProtectedRoute`. Collects delivery manifest directives, simulates settlement, and purges the cart. |
| `/contact` | `ContactPage` | Public | Editorial dispatch form for material provenance, artisan workshops, and zero-plastic logistics. |
| `*` | `NotFoundPage` | Public | 404 catch-all screen with editorial recovery links back to lookbook or catalog. |

---

## ✦ Architecture & State Pattern

- **Cart State (`CartContext`)**: Managed with `useReducer` to safely handle `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, and `CLEAR`. Automatically persisted to `localStorage` under `shopzone_cart_items`.
- **Auth State (`AuthContext`)**: Manages `isLoggedIn` boolean state, toggled by guest identification and persisted to `localStorage` under `shopzone_auth_user`.
- **Protected Routing (`ProtectedRoute`)**: Intercepts unauthenticated navigation to `/checkout`, saves target route to `location.state.from`, redirects to `/login`, and returns to `/checkout` post-clearance.
- **Data Source**: Fetches from [dummyjson.com/products](https://dummyjson.com/products) with `AbortController` cancellation, error handling, and dedicated editorial skeleton loaders.
- **Navigation**: Uses `<Link>` and `<NavLink>` exclusively for internal transitions.

---

## ✦ Deployment to Vercel

The repository includes a dedicated `vercel.json` rewrite file to ensure clean client-side routing on hard refresh:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### Deploying via Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Deploying via Vercel Git Integration:
1. Push repository to GitHub/GitLab.
2. Import project in Vercel Dashboard.
3. Keep default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

