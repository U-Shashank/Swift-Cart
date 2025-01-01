import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaShoppingCart 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaFacebookF, 
      href: '#', 
      color: 'hover:text-blue-600' 
    },
    { 
      icon: FaTwitter, 
      href: '#', 
      color: 'hover:text-blue-400' 
    },
    { 
      icon: FaInstagram, 
      href: '#', 
      color: 'hover:text-pink-600' 
    },
    { 
      icon: FaLinkedinIn, 
      href: '#', 
      color: 'hover:text-blue-700' 
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <FaShoppingCart className="text-3xl text-blue-500" />
              <h2 className="text-2xl font-bold">SwiftCart</h2>
            </div>
            <p className="text-center md:text-left text-gray-400 max-w-xs">
              Your one-stop solution for seamless online shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2 text-center">
              {[
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Privacy Policy', path: '/policy' }
              ].map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, color }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    text-2xl text-gray-400 ${color} 
                    transition-all duration-300 ease-in-out
                  `}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} SwiftCart. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;