import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const roleRedirects = {
  admin: '/admin/dashboard',
  user: '/shop/home',
};

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;
  const role = user?.role;

  if (!isAuthenticated && !path.startsWith("/auth")) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && path.startsWith("/auth")) {
    if (role && roleRedirects[role]) {
      return <Navigate to={roleRedirects[role]} replace />;
    }
    return <Navigate to="/unauth-page" replace />;
  }

  if (isAuthenticated && role !== 'admin' && path.startsWith("/admin")) {
    if (roleRedirects[role]) {
      return <Navigate to={roleRedirects[role]} replace />;
    }
    return <Navigate to="/unauth-page" replace />;
  }

  if (isAuthenticated && role !== 'user' && path.startsWith("/shop")) {
    if (roleRedirects[role]) {
      return <Navigate to={roleRedirects[role]} replace />;
    }
    return <Navigate to="/unauth-page" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
