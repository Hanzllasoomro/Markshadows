import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckAuth from './components/common/check-auth';
import NotFound from './pages/not-found';
import UnauthPage from './pages/unauth-page';
import { getUserProfile } from './store/auth-slice';


const AuthLayout = lazy(() => import('./components/auth/layout'));
const AuthLogin = lazy(() => import('./pages/auth/login'));
const AuthRegister = lazy(() => import('./pages/auth/register'));
const AdminLayout = lazy(() => import('./components/admin-view/layout'));
const AdminDashboard = lazy(() => import('./pages/admin-view/dashboard'));
const AdminProducts = lazy(() => import('./pages/admin-view/products'));
const AdminOrders = lazy(() => import('./pages/admin-view/orders'));
const AdminFeatures = lazy(() => import('./pages/admin-view/features'));
const ShoppingLayout = lazy(() => import('./components/shopping-view/layout'));
const ShoppingAccount = lazy(() => import('./pages/shopping-view/account'));
const ShoppingHome = lazy(() => import('./pages/shopping-view/home'));
const ShoppingCheckout = lazy(() => import('./pages/shopping-view/checkout'));
const ShoppingListing = lazy(() => import('./pages/shopping-view/listing'));
const LoadingScreen = lazy(() => import('./components/common/LoadingScreen'));

const App = () => {

  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
  const isAdmin = user?.role === 'admin';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex flex-col overflow-hidden bg-white" >
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout />
          </CheckAuth>
        } >

          {/* Add your auth routes here */}
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin/*"
          element={
            isLoading ? (
              <LoadingScreen />
            ) : user?.role === 'admin' ? (
              <Suspense fallback={<LoadingScreen />}>
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminLayout />
                </CheckAuth>
              </Suspense>
            ) : (
              <Navigate to="/unauth-page" replace />
            )
          }
        >

          {/* Add your admin routes here */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>

          {/* Add your shopping routes here */}
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='home' element={<ShoppingHome />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='listing' element={<ShoppingListing />} />
        </Route>

        {/* Page not found route */}
        <Route path="*" element={<NotFound />} />
        <Route path='/unauth-page' element={<UnauthPage />} />
      </Routes>
    </div>
  )
}

export default App