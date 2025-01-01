import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FaShoppingCart, 
  FaTags, 
  FaInfoCircle 
} from 'react-icons/fa';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import Layout from '../components/Layout/Layout';
import { useCart } from '../../context/cart';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        await getProduct(params.slug);
      } catch (error) {
        toast.error('Failed to load product details', {
          style: {
            borderRadius: '10px',
            background: '#ff4444',
            color: '#fff',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [params.slug]);

  const getProduct = async (slug) => {
    const { data } = await axios(`${import.meta.env.VITE_HOST_URL}/product/${slug}`);
    setProduct(data.product);
    await getSimilarProducts(data.product._id, data.product.category._id);
  };

  const getSimilarProducts = async (pid, cid) => {
    const { data } = await axios(`${import.meta.env.VITE_HOST_URL}/product/${pid}/${cid}`);
    setSimilarProducts(data.product);
  };

  const handleAddToCart = (selectedProduct, e) => {
    e.preventDefault();
    const existingProduct = cart.find(item => item._id === selectedProduct._id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map(item =>
        item._id === selectedProduct._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...selectedProduct, quantity: 1 }];
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

  if (loading) {
    return (
      <Layout>
        <Loader fullScreen/>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='min-h-full bg-gradient-to-tr from-gray-50 to-blue-50 p-4 md:p-8'>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-8 p-6'
        >
          {/* Product Image */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className='flex items-center justify-center'
          >
            <img 
              src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} 
              alt={product.name}
              className='max-w-full max-h-96 object-contain rounded-lg shadow-lg'
            />
          </motion.div>

          {/* Product Details */}
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold text-gray-800 flex items-center'>
              <FaInfoCircle className='mr-3 text-blue-500' />
              {product.name}
            </h1>
            <p className='text-gray-600 text-lg'>{product.description}</p>
            
            <div className='flex items-center space-x-2 text-xl'>
              <LiaRupeeSignSolid className='text-green-600' />
              <span className='font-bold text-gray-900'>{product.price}</span>
            </div>
            
            <div className='flex items-center space-x-2 text-gray-700'>
              <FaTags className='text-blue-500' />
              <span>Category: {product.category?.name}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleAddToCart(product, e)}
              className='w-full bg-blue-500 text-white rounded-lg py-3 hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2'
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Similar Products */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='mt-12'
        >
          <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
            Similar Products
          </h2>
          
          {similarProducts.length === 0 ? (
            <div className='text-center text-gray-500'>
              No similar products found
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
              {similarProducts.map((similarProduct) => (
                <motion.div
                  key={similarProduct._id}
                  whileHover={{ scale: 1.05 }}
                  className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300'
                >
                  <Link to={`/product/${similarProduct.slug}`}>
                    <div className='relative'>
                      <img 
                        src={`${import.meta.env.VITE_HOST_URL}/product/photo/${similarProduct._id}`} 
                        alt={similarProduct.name}
                        className='w-full h-48 object-cover'
                      />
                    </div>
                    <div className='p-4'>
                      <h3 className='font-bold text-lg mb-2 truncate'>
                        {similarProduct.name}
                      </h3>
                      <div className='flex justify-between items-center'>
                        <span className='text-xl font-semibold flex items-center'>
                          <LiaRupeeSignSolid />
                          {similarProduct.price}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleAddToCart(similarProduct, e)}
                          className='bg-blue-500 text-white p-2 rounded-full'
                        >
                          <FaShoppingCart />
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default ProductDetails;