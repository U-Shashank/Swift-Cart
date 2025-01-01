import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-white p-8 rounded-xl shadow-xl max-w-md w-full space-y-6 flex flex-col items-center"
        >
          <div className="flex justify-center mb-4">
            <FaExclamationTriangle className="text-6xl text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            404, Page Not Found
          </h1>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 w-fit px-6 py-2 bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              <FaHome />
              Return to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;