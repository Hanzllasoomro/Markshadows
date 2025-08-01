import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CommonForm from '../../components/common/form';
import { registerFormControls } from '../../config/index';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';
import { toast } from 'sonner';

const initialState = {
  userName: '',
  email: '',
  password: '',
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const [submittedData, setSubmittedData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const onSubmit = (formData) => {
    try {
      dispatch(registerUser(formData)).then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
          navigate("/auth/login");
        } else {
          toast.error(data?.payload?.message);
        }
      });
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-10 rounded-2xl bg-white p-8 sm:p-10 shadow-2xl ring-1 ring-gray-200 transition duration-300 ease-in-out">

      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Create Your Account
        </h1>
      </div>

      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Sign Up"
      />
      <div className="text-sm text-gray-500 text-center">
        <p className="text-base text-gray-500">
          Already have an account?
          <Link
            to="/auth/login"
            className="ml-2 text-primary font-semibold hover:underline transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </div>
      <div className="text-xs text-gray-400 text-center border-t pt-4">
        By signing up, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>.
      </div>
    </div>
  </div>
)
};


export default AuthRegister;