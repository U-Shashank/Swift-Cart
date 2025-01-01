import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import { FaUsers, FaRocket, FaHeart } from 'react-icons/fa';

const About = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About SwiftCart</h1>
            <p className="text-xl text-gray-600">Revolutionizing Your Shopping Experience</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-3">Our Team</h2>
              <p className="text-gray-600">
                A passionate group of professionals dedicated to delivering the best online shopping experience.
              </p>
            </motion.div>

            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <FaRocket className="text-4xl text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
              <p className="text-gray-600">
                To provide a seamless, convenient, and enjoyable shopping platform that meets the diverse needs of our customers.
              </p>
            </motion.div>

            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-3">Our Values</h2>
              <p className="text-gray-600">
                Customer satisfaction, innovation, integrity, and continuous improvement are at the core of everything we do.
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 bg-white p-8 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded with a vision to transform online shopping, SwiftCart began as a small startup with a big dream. We believed that e-commerce could be more than just transactions – it could be an experience. Through continuous innovation and a customer-first approach, we've grown into a platform that not only sells products but creates connections.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;