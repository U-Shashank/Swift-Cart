import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaHome,
  FaPhone,
  FaUserPlus
} from 'react-icons/fa';
import Layout from '../components/Layout/Layout';

const Register = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, getValues, formState } = form;
  const { errors } = formState;

  const postUser = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/register`, data);
      toast.success('Registered successfully', {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate("/login");
    } catch (error) {
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
    delete data.confirmPassword;
    postUser(data);
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
              <FaUserPlus className='mr-3 text-blue-500' /> Create Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-1'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaUser className='text-gray-400' />
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required"
                      }
                    })}
                    className='w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
                {errors.name && (
                  <p className='text-red-500 text-sm ml-10'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <div className='relative'>
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
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
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

              <div className='space-y-1'>
                <div className='relative'>
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
                      },
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
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

              <div className='space-y-1'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaLock className='text-gray-400' />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      validate: value =>
                        value === getValues("password") ||
                        "Confirm password and password do not match"
                    })}
                    className='w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm ml-10'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaHome className='text-gray-400' />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                    className='w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </div>

              <div className='space-y-1'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaPhone className='text-gray-400' />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone", {
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number (10 digits required)"
                      }
                    })}
                    className='w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
                {errors.phone && (
                  <p className='text-red-500 text-sm ml-10'>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className='w-full bg-blue-500 text-white rounded-lg py-3 hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2'
              >
                <FaUserPlus />
                <span>Register</span>
              </motion.button>
            </form>

            {/* Login Link */}
            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                Already have an account? {' '}
                <Link
                  to="/login"
                  className='text-blue-500 hover:underline font-semibold'
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;