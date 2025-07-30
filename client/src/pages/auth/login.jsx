import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '../../components/common/form';
import { loginFormControls } from '../../config/index';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
const initialState = {
  email: '',
  password: '',
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
  try {
    const data = await dispatch(loginUser(formData));

    if (data?.payload?.success) {
      toast.success(data.payload.message);
      if (data.payload.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/shop/home');
        }
    } else {
      toast.error(data.payload?.message || 'Login failed');
    }
  } catch (err) {
    toast.error('An error occurred. Please try again.');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-10 rounded-2xl bg-white p-8 sm:p-10 shadow-2xl ring-1 ring-gray-200 transition duration-300 ease-in-out">

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Sign In to Your Account
          </h1>
        </div>

        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText="Login"
        />
        <div className="text-sm text-gray-500 text-center">
          <p className="text-base text-gray-500">
            Don't have an account?
            <Link
              to="/auth/register"
              className="ml-2 text-primary font-semibold hover:underline transition-colors duration-200"
            >
              Register
            </Link>
          </p>
        </div>
        <div className="text-xs text-gray-400 text-center border-t pt-4">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          apply.
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
