import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import { FaShieldAlt } from 'react-icons/fa';

const Policy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <div className="min-h-full bg-gradient-to-tr from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 flex items-center">
            <FaShieldAlt className="text-4xl text-blue-500 mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-6 text-gray-700"
          >
            <motion.p variants={itemVariants}>
              At SwiftCart, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
            </motion.p>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact our customer support. This may include your name, email address, shipping address, and payment information.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-3 text-blue-600">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To process and fulfill your orders</li>
                <li>To communicate with you about your purchases</li>
                <li>To improve our services and customer experience</li>
                <li>To send promotional offers and updates (with your consent)</li>
              </ul>
            </motion.div>

            <motion.p variants={itemVariants} className="italic text-gray-500">
              Last updated: December 2024
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Policy;