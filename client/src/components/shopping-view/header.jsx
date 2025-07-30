import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/auth-slice/index';
import { useNavigate } from 'react-router-dom';

const ShoppingHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/auth/login');
  };

  return (
    <header className="h-16 w-full border-b px-4 flex items-center justify-between bg-white shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">
        Welcome, {user?.username || 'User'}
      </h2>

      <div className="flex items-center gap-4">
        {user?.email && (
          <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
        )}
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default ShoppingHeader;
