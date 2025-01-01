import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import ProductForm from '../../components/Forms/ProductForm';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { PackagePlus } from 'lucide-react';

const CreateProduct = () => {
  const addProduct = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/product`,
        data,
        {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }
      );
      toast.success("Product created successfully", {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error(error.request.statusText, {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50">
        <AdminMenu />
        <div className="flex-1 p-4 lg:p-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <PackagePlus className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                    Create New Product
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Add a new product to your inventory
                  </p>
                </div>
              </div>
              <div className="h-1 w-20 bg-blue-500"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white shadow-xl rounded-2xl p-4 lg:p-8"
            >
              <ProductForm handleSubmit={addProduct} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;