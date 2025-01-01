import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import ProductForm from '../../components/Forms/ProductForm';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Pencil, AlertTriangle } from 'lucide-react';

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const updateProduct = async (data, id) => {
    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_HOST_URL}/product/${id}`,
        data,
        {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }
      );
      toast.success("Product updated successfully", {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate('/dashboard/admin/products');
    } catch (error) {
      toast.error("Failed to update product", {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_HOST_URL}/product/${id}`);
      navigate('/dashboard/admin/products');
      toast.success("Product deleted successfully", {
        icon: '🗑️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error("Failed to delete product", {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/product/${params.slug}`);
      setProductData(data.product);
    } catch (error) {
      setError("Failed to fetch product data");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${!isOpen && 'hidden'}`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg p-6 max-w-sm w-full relative z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-500" size={24} />
          <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Product
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50">
          <AdminMenu />
          <div className="flex-1 p-4 lg:p-8 flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Product</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50">
        <AdminMenu />
        <div className="flex-1 p-4 lg:p-8 lg:mt-0">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Loading product data...</p>
              </div>
            </div>
          ) : (
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
                    <Pencil className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                      Update Product
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Edit product details and information
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
                <ProductForm
                  handleSubmit={(data) => updateProduct(data, productData._id)}
                  productData={productData}
                  deleteProduct={() => setDeleteConfirm(true)}
                  loading={loading}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        onConfirm={() => {
          deleteProduct(productData._id);
          setDeleteConfirm(false);
        }}
      />
    </Layout>
  );
};

export default UpdateProduct;