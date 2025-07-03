import React from 'react'

export const CheckAuth = (isAuthenticated, user, childern) => {

    const Location = useLocation();

    if (!isAuthenticated && Location.pathname !== '/auth/login' && Location.pathname !== '/auth/register') {
       return <Navigate to="/auth/login" replace />  
    }
    if (isAuthenticated && Location.pathname === '/auth/login' || Location.pathname === '/auth/register') {
        if(user.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />
        }else if(user.role === 'user') {
            return <Navigate to="/shop/home" replace />
        }
    }
    if( isAuthenticated && user?.role !== 'admin' && Location.pathname.includes('/admin')) {
        return <Navigate to="/unauth-page" replace />
    }
    if( isAuthenticated && user?.role !== 'user' && Location.pathname.includes('/shop')) {
        return <Navigate to="/admin/dashboard" replace />
    }
    return (
        <div>check-auth</div>
    )
}


export default CheckAuth;