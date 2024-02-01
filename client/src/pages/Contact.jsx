import React from 'react';
import Layout from '../components/Layout/Layout';
import { FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';

const Contact = () => {
  return (
    <Layout>
      <div className="bg-gray-100 h-full p-8 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>

          <p className="text-center">
            You can reach us at the following contact details:
          </p>

          <ul className="mt-4">
            <li className="flex items-center">
              <FaEnvelope className="inline-block mr-2" />
              Email: contact@swiftcart.com
            </li>
            <li className="flex items-center">
              <FaPhone className="inline-block mr-2" />
              Phone: +1 (555) 123-4567
            </li>
            <li className="flex items-center">
              <FaMapMarker className="inline-block mr-2" />
              Address: 123 Swift Street, Cityville, SW
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
