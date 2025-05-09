import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../../context/auth';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { LiaRupeeSignSolid } from 'react-icons/lia';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50">
        <UserMenu />
        <div className="flex-1 p-4 lg:p-8 lg:mt-0 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Orders</h1>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-gray-600">Total Orders: </span>
                <span className="font-bold text-blue-600">{orders.length}</span>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-4 lg:p-6 rounded-lg shadow-md animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {orders?.map((order, index) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="p-4 lg:p-6 border-b">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Order #</span>
                            <p className="font-semibold">{index + 1}</p>
                          </div>
                          
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Status</span>
                            <div className={`mt-1 px-4 py-1 rounded-full text-sm lg:text-base font-medium mx-auto w-fit ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                          </div>

                          <div className="text-center">
                            <span className="text-sm text-gray-500">Date</span>
                            <p className="font-semibold">{moment(order?.createdAt).format('MMM D, YYYY')}</p>
                            <p className="text-xs lg:text-sm text-gray-500">{moment(order?.createdAt).fromNow()}</p>
                          </div>

                          <div className="text-center">
                            <span className="text-sm text-gray-500">Payment</span>
                            <p className={`font-semibold ${order?.payment.success ? 'text-green-600' : 'text-red-600'}`}>
                              {order?.payment.success ? "Success" : "Failed"}
                            </p>
                          </div>

                          <div className="text-center">
                            <span className="text-sm text-gray-500">Items</span>
                            <p className="font-semibold">{order?.products?.length}</p>
                          </div>
                        </div>
                      </div>

                      {/* Order Details Toggle */}
                      <div className="px-4 lg:px-6 py-3 bg-gray-50">
                        <button
                          onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center w-full"
                        >
                          {expandedOrder === order._id ? 'Hide Details' : 'Show Details'}
                        </button>
                      </div>

                      {/* Order Products */}
                      <AnimatePresence>
                        {expandedOrder === order._id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 lg:p-6 space-y-4">
                              {order?.products?.map(({product, quantity}) => (
                                <motion.div
                                  key={product._id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <img
                                    src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`}
                                    className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                                    alt={product.name}
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600 text-sm">{product.description.substring(0, 100)}...</p>
                                    <div className="flex items-center mt-2 text-blue-600 font-bold">
                                      <LiaRupeeSignSolid className="text-xl" />
                                      <span>{product.price}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2">Quantity: {quantity}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;