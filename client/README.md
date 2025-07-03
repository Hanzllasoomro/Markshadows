# Client

This folder contains the frontend application for Markshadows, built with React and Vite.

## Features
- Modern React (with hooks)
- Vite for fast development and builds
- Tailwind CSS for styling
- Authentication, admin, and shopping pages with protected routes

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
- `src/` - Source code
  - `App.jsx` - Main React component. Sets up all application routes, including:
    - `/auth` (with nested login/register routes, protected by `CheckAuth`)
    - `/admin` (admin dashboard, products, orders, features, all protected)
    - `/shop` (shopping account, home, checkout, listing, all protected)
    - Fallback route for 404 (NotFound)
  - `main.jsx` - Entry point for React app, renders App.
  - `App.css`, `index.css` - Global styles.
  - `assets/` - Static assets (e.g., `react.svg`).
  - `components/` - Reusable UI and layout components.
    - `auth/layout.jsx` - Authentication layout wrapper.
    - `admin-view/layout.jsx` - Admin dashboard layout.
    - `shopping-view/layout.jsx` - Shopping section layout.
    - `common/check-auth.jsx` - Route protection logic.
    - `ui/button.jsx` - Button UI component.
  - `lib/utils.js` - Utility functions.
  - `pages/` - Page components for different routes.
    - `auth/login.jsx`, `auth/register.jsx` - Auth pages.
    - `admin-view/dashboard.jsx`, `products.jsx`, `orders.jsx`, `features.jsx` - Admin pages.
    - `shopping-view/account.jsx`, `home.jsx`, `checkout.jsx`, `listing.jsx` - Shopping pages.
    - `not-found/index.jsx` - 404 page.
  - `store/` - State management (Redux or similar).
    - `store.js` - Store configuration.
    - `auth-slice/index.js` - Auth state slice.
- `public/` - Static assets served directly (e.g., `vite.svg`).

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes on Routing
- All main sections (`/auth`, `/admin`, `/shop`) are protected by the `CheckAuth` component.
- Nested routes are used for modularity and scalability.
- The `NotFound` component handles all unmatched routes.
