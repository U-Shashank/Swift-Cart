import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Plus } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/product`);
      setProducts(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
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
            className="max-w-7xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Package className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                      Products
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage your product inventory
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                  <Link
                    to="/dashboard/admin/create-product"
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Product
                  </Link>
                </div>
              </div>
              <div className="h-1 w-20 bg-blue-500"></div>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="animate-pulse"
                  >
                    <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                    <div className="bg-white p-4 rounded-b-lg shadow-lg">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <AnimatePresence>
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  layout
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      variants={productVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <Link to={`/dashboard/admin/product/${product.slug}`}>
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <div className="relative overflow-hidden group">
                            <img 
                              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" 
                              src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} 
                              alt={product.name} 
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">
                              {product.name}
                            </h3>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-blue-600">
                                <LiaRupeeSignSolid className="text-xl" />
                                <span className="text-xl font-bold">{product.price}</span>
                              </div>
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {product.category.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;