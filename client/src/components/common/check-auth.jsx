import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Early redirects to avoid unnecessary re-renders
  if (!isAuthenticated && !path.startsWith("/auth")) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && path.startsWith("/auth")) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === 'user') {
      return <Navigate to="/shop/home" replace />;
    }
  }

  if (isAuthenticated && user?.role !== 'admin' && path.startsWith("/admin")) {
    return <Navigate to="/unauth-page" replace />;
  }

  if (isAuthenticated && user?.role !== 'user' && path.startsWith("/shop")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
