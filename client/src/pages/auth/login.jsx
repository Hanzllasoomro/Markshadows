import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '../../components/common/form';
import { loginFormControls } from '../../config/index';

const initialState = {
  email: '',
  password: '',
};

const onSubmit = (formData) => {
  console.log('Login with:', formData);
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);

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
