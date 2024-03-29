import React from 'react';
import Layout from '../components/Layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="h-full p-8 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">404, Page Not Found</h1>
          <p className="text-gray-700 mb-4 text-center">
            page you are looking for does not exist
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
