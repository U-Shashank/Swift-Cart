import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/policy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
