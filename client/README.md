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

## Project Structure & Key Files
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
    - `auth/layout.jsx` - Authentication layout wrapper for login/register pages.
    - `admin-view/layout.jsx` - Admin dashboard layout.
    - `shopping-view/layout.jsx` - Shopping section layout.
    - `common/check-auth.jsx` - Route protection logic. Checks user authentication and role, redirects users based on their status and route.
    - `common/form.jsx` - Generic form component. Dynamically renders form fields based on configuration, handles input changes and submission.
    - `ui/button.jsx` - Button UI component.
  - `lib/utils.js` - Utility functions for the app.
  - `pages/` - Page components for different routes.
    - `auth/login.jsx` - Login page. Uses `CommonForm` and `loginFormControls` for user login.
    - `auth/register.jsx` - Registration page. Uses `CommonForm` and `registerFormControls` for user signup.
    - `admin-view/dashboard.jsx`, `products.jsx`, `orders.jsx`, `features.jsx` - Admin pages for dashboard, product management, orders, and features.
    - `shopping-view/account.jsx`, `home.jsx`, `checkout.jsx`, `listing.jsx` - Shopping pages for user account, home, checkout, and product listing.
    - `not-found/index.jsx` - 404 page. Displays a simple "Not Found" message for unmatched routes.
  - `store/` - State management (Redux or similar).
    - `store.js` - Store configuration.
    - `auth-slice/index.js` - Auth state slice.
  - `config/index.js` - Form field configuration for login and register pages. Used by `CommonForm` to render fields dynamically.
- `public/` - Static assets served directly (e.g., `vite.svg`).

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes on Routing & Functionality
- All main sections (`/auth`, `/admin`, `/shop`) are protected by the `CheckAuth` component, which checks authentication and user role before allowing access.
- `CommonForm` is a reusable form component that takes a configuration object to render different forms (login, register, etc.) and handles state and submission.
- The `login.jsx` and `register.jsx` pages use `CommonForm` and their respective config objects for flexible form rendering.
- The `NotFound` component handles all unmatched routes.

## How It Works
- Authentication and user role are checked before rendering protected routes.
- Forms are dynamically generated from configuration, making it easy to add or change fields.
- The app is modular, with clear separation between authentication, admin, and shopping features.
