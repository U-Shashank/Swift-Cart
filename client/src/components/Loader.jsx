import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false }) => {
  const loader = (
    <motion.div
      animate={{
        rotate: [0, 360],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
      className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full'
    />
  );

  if (fullScreen) {
    return (
      <div className='fixed inset-0 z-50 flex justify-center items-center bg-white/50 backdrop-blur-sm'>
        {loader}
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center w-full h-full'>
      {loader}
    </div>
  );
};

export default Loader;