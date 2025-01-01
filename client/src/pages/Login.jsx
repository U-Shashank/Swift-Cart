import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import Layout from '../components/Layout/Layout';

const Login = () => {
  const [, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/login`, userData);
      setAuth(prevAuth => ({
        ...prevAuth,
        user: response.data.user,
        token: response.data.token
      }));
      localStorage.setItem("auth", JSON.stringify({
        user: response.data.user,
        token: response.data.token
      }));
      navigate(location.state || "/");
      toast.success('Successfully logged in', {
        icon: '🚀',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {
        style: {
          borderRadius: '10px',
          background: '#ff4444',
          color: '#fff',
        },
      });
    }
  };

  const onSubmit = data => {
    loginUser(data);
  };


  return (
    <Layout>
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50 p-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          className='w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden'
        >
          <div className='px-8 py-10'>
            <h1 className='text-center text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center'>
              <FaSignInAlt className='mr-3 text-blue-500' /> Welcome Back
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-1'> {/* Wrapper div with spacing */}
                <div className='relative'> {/* Input container */}
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaEnvelope className='text-gray-400' />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required"
                      }
                    })}
                    className='w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
                {errors.email && (
                  <p className='text-red-500 text-sm ml-10'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className='space-y-1'> {/* Wrapper div with spacing */}
                <div className='relative'> {/* Input container */}
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaLock className='text-gray-400' />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required"
                      }
                    })}
                    className='w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm ml-10'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className='w-full bg-blue-500 text-white rounded-lg py-3 hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2'
              >
                <FaSignInAlt />
                <span>Login</span>
              </motion.button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                Don't have an account? {' '}
                <Link
                  to="/register"
                  className='text-blue-500 hover:underline font-semibold'
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;