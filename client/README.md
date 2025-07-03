# Client

This folder contains the frontend application for Markshadows, built with React and Vite.

## Features
- Modern React (with hooks)
- Vite for fast development and builds
- Tailwind CSS for styling
- Authentication pages (login/register)

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
  - `App.jsx` - Main React component, sets up routes and layout.
  - `main.jsx` - Entry point for React app, renders App.
  - `App.css`, `index.css` - Global styles.
  - `assets/` - Static assets (e.g., `react.svg`).
  - `components/` - Reusable UI and layout components.
    - `auth/layout.jsx` - Authentication layout wrapper.
    - `ui/button.jsx` - Button UI component.
  - `lib/utils.js` - Utility functions.
  - `pages/` - Page components for different routes.
    - `auth/login.jsx` - Login page.
    - `auth/register.jsx` - Registration page.
  - `store/` - State management (Redux or similar).
    - `store.js` - Store configuration.
    - `auth-slice/index.js` - Auth state slice.
- `public/` - Static assets served directly (e.g., `vite.svg`).

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
