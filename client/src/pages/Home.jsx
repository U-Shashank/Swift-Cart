import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { FaFilter, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../../context/search';
import { useCart } from '../../context/cart';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search] = useSearch();
  const [cart, setCart] = useCart();

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([getAllCategory(), getAllProducts()]);
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [checked, minPrice, maxPrice, page, search]);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/category`);
      if (res.data.category) setCategories(res.data.category);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (checked.length) queryParams.append('category', checked.join(','));
      if (minPrice || maxPrice) {
        const filters = [];
        if (minPrice) filters.push(`price>=${minPrice}`);
        if (maxPrice) filters.push(`price<=${maxPrice}`);
        queryParams.append('numericFilters', filters.join(','));
      }
      if (search) queryParams.append('name', search);
      queryParams.append('page', page);

      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/product?${queryParams}`);
      setProducts(data.product);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setChecked(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    const existingProduct = cart.find(item => item._id === product._id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success("Added to cart", {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const productVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };
  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50">
        {/* Overlay for mobile filter */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 md:p-8 gap-4">
          {/* Filter Toggle Button */}
          <button
            className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter />
          </button>

          {/* Filters Sidebar */}
          <aside
            className={`
              fixed md:relative top-0 left-0 h-full w-3/4 md:w-1/4
              transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
              bg-white p-4 transition-transform duration-300 ease-in-out
              z-50 md:z-0 overflow-y-auto
            `}
          >
            <div className="sticky top-0 bg-white pb-4 border-b mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <FaFilter className="mr-2" /> Filters
                </h2>
                <button
                  className="md:hidden text-2xl"
                  onClick={() => setIsFilterOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category._id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`category-${category._id}`}
                        checked={checked.includes(category._id)}
                        onChange={() => handleCategoryToggle(category._id)}
                        className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`category-${category._id}`}
                        className="text-sm capitalize"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">₹{minPrice}</span>
                    <span className="text-sm">₹{maxPrice}</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 md:w-3/4">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-200 animate-pulse h-64 rounded-lg"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      repeatType: 'reverse'
                    }}
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center space-y-4 p-8"
              >
                <p className="text-2xl font-semibold text-gray-600">
                  No products found
                </p>
                <p className="text-gray-500 text-center">
                  We couldn't find any products matching your search or filter criteria.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      },
                      exit: { opacity: 0 }
                    }}
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product._id}
                        variants={productVariants}
                        className="relative"
                      >
                        <Link to={`/product/${product.slug}`}>
                          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                            <div className="relative overflow-hidden">
                              <img
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`}
                                alt={product.name}
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
                              <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold flex items-center">
                                  <LiaRupeeSignSolid />
                                  {product.price}
                                </span>
                                <button
                                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                                  onClick={(e) => handleAddToCart(product, e)}
                                >
                                  <FaShoppingCart />
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Load More Button */}
                {products.length > 0 && (
                  <div className="flex justify-center py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
                      onClick={() => setPage(prev => prev + 1)}
                    >
                      Load More
                    </motion.button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;