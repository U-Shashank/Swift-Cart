import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import { FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Contact = () => {

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center w-screen bg-gradient-to-tr from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-xl space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>

            <div className="flex items-center space-x-4 mb-4">
              <FaEnvelope className="text-2xl text-blue-500" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">contact@swiftcart.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <FaPhone className="text-2xl text-green-500" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaMapMarker className="text-2xl text-red-500" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">123 Swift Street, Cityville, SW</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Contact;
