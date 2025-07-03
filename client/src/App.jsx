import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import AdminFeatures from './pages/admin-view/features';
import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingCheckout from './pages/shopping-view/checkout';
const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white" >
      <Routes>
        
        <Route path="/auth" element={<AuthLayout />} >
          {/* Add your auth routes here */}
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          {/* Add your admin routes here */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts/>} />
          <Route path="orders" element={<AdminOrders/>} />
          <Route path="features" element={<AdminFeatures/>} />
        </Route> 

        <Route path="/shop" element={<ShoppingLayout />}>
          {/* Add your shopping routes here */}
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='home' element={<ShoppingHome />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='listing' element={<ShoppingLising />} />
        </Route>

        {/* Page not found route */}
        <Route path="*" element={<NotFound  />} /> 
      </Routes>
    </div>
  )
}

export default App