import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../../context/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Home, Phone, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const [auth] = useAuth();
  const { user } = auth;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
    address: user.address,
    phone: user.phone
  });

  const handleChange = e => {
    setData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const updateUser = async (data) => {
    try {
      setIsLoading(true);
      await axios.patch(`${import.meta.env.VITE_HOST_URL}/auth/update-user`, data);
      toast.success("Profile updated successfully", {
        icon: '✨',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (data.password && data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    updateUser(data);
  };

  const inputFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      icon: <User size={18} />,
      disabled: false
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      icon: <Mail size={18} />,
      disabled: true
    },
    {
      label: "New Password",
      name: "password",
      type: "password",
      icon: <Lock size={18} />,
      disabled: false
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      icon: <Lock size={18} />,
      disabled: false
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      icon: <Home size={18} />,
      disabled: false
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      icon: <Phone size={18} />,
      disabled: false
    }
  ];

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50">
        <UserMenu />
        <div className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 lg:p-8"
              >
                <div className="flex items-center justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                    className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-3xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </motion.div>
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-8">
                  Edit Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence>
                    {inputFields.map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                      >
                        <label 
                          className="block text-sm font-medium text-gray-700 mb-2"
                          htmlFor={field.name}
                        >
                          {field.label}
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            {field.icon}
                          </div>
                          <input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            disabled={field.disabled}
                            value={data[field.name]}
                            onChange={handleChange}
                            className={`
                              block w-full pl-10 pr-3 py-2.5 
                              border border-gray-300 rounded-lg
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent
                              transition-all duration-200
                              ${field.disabled ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}
                              ${field.disabled ? 'cursor-not-allowed' : 'cursor-text'}
                            `}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.div 
                    className="pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`
                        w-full flex items-center justify-center
                        px-6 py-3 rounded-lg
                        text-white font-medium
                        transition-all duration-200
                        ${isLoading 
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg'
                        }
                      `}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin mr-2" size={20} />
                      ) : (
                        <Save className="mr-2" size={20} />
                      )}
                      {isLoading ? 'Updating...' : 'Update Profile'}
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;