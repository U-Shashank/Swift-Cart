import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const Layout = ({ children, location }) => {
  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-50'>
      <Header />
      <AnimatePresence mode='wait'>
        <motion.main
          key={location?.pathname || 'default'}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className='flex-grow overflow-x-hidden pt-16' // Adjust pt-16 based on your actual navbar height
        >
          <div className='min-h-[calc(100vh-4rem)] bg-gradient-to-tr from-gray-50 to-blue-50'>
            {children}
          </div>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;