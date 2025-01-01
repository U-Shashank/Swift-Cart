import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaMoneyBillWave, FaMapMarker, FaUser } from 'react-icons/fa';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';

const Cart = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const { user, token } = auth;
    const navigate = useNavigate();
    const location = useLocation();
    const [clientToken, setClientToken] = useState();
    const [instance, setInstance] = useState();
    const [loading, setLoading] = useState(false);

    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    const getToken = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/braintree`);
            setClientToken(data?.clientToken);
        } catch (error) {
            toast.error('Failed to load payment options');
        }
    };

    useEffect(() => {
        if (auth?.token) {
            getToken();
        }
    }, [auth?.token]);

    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter((p) => p._id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Item removed from cart');
    };

    const handleQuantityChange = (productId, quantity) => {
        const updatedCart = cart.map((product) =>
            product._id === productId ? { ...product, quantity: Math.max(1, quantity) } : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();

            const { data } = await axios.post(`${import.meta.env.VITE_HOST_URL}/braintree`, {
                nonce,
                cart: cart.map(item => ({
                    _id: item._id,
                    price: item.price,
                    quantity: item.quantity || 1
                }))
            })

            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            toast.success('Payment successful');
            navigate("/dashboard/user/orders");
        } catch (error) {
            toast.error('Payment processing failed');
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
                >
                    <div className=" p-6 border-b border-gray-200 flex items-center">
                        <FaShoppingCart className="text-4xl text-blue-500 mr-4" />
                        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
                    </div>

                    {cart.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center p-12 space-y-4"
                        >
                            <FaShoppingCart className="text-6xl text-gray-300" />
                            <p className="text-xl text-gray-600">Your cart is empty</p>
                            <Link to="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="0 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
                                >
                                    Continue Shopping
                                </motion.button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="p-6">
                            <AnimatePresence>
                                {cart.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center justify-between border-b border-gray-200 py-4"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`}
                                                alt={product.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="font-bold text-lg">{product.name}</h3>
                                                <p className="text-gray-600">₹{product.price}</p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <button
                                                        onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                                                        className="px-2 py-1 bg-gray-200 rounded"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{product.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                                                        className="px-2 py-1 bg-gray-200 rounded"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleRemoveItem(product._id)}
                                            className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full transition-colors"
                                        >
                                            <FaTrash />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <div className="mt-6 flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Total</h2>
                                <p className="text-2xl font-semibold text-blue-600">₹{totalPrice.toFixed(2)}</p>
                            </div>

                            {/* Address Section */}
                            <div className="mt-8  p-6 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <FaMapMarker className="text-blue-500 mr-3" />
                                    <h3 className="text-xl font-semibold">Shipping Address</h3>
                                </div>
                                {token ? (
                                    user?.address ? (
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-700">{user.address}</p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => navigate("/dashboard/user/profile")}
                                                className="0 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                                            >
                                                Update Address
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate("/dashboard/user/profile")}
                                            className="w-full 0 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                                        >
                                            Add Address
                                        </motion.button>
                                    )
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate("/login", { state: location.pathname })}
                                        className="w-full bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors"
                                    >
                                        <FaUser className="inline mr-2" /> Login to Continue
                                    </motion.button>
                                )}
                            </div>

                            {/* Payment Section */}
                            {token && clientToken && cart?.length > 0 && (
                                <div className="mt-8 bg-green-50 p-6 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <FaMoneyBillWave className="text-green-500 mr-3" />
                                        <h3 className="text-xl font-semibold">Payment</h3>
                                    </div>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: false
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                        className="mb-4"
                                    />
                                    <motion.button
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                        whileHover={{ scale: !loading ? 1.05 : 1 }}
                                        whileTap={{ scale: !loading ? 0.95 : 1 }}
                                        className="w-full bg-green-500 text-white px-4 py-3 rounded-full 
                                        hover:bg-green-600 transition-colors 
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Processing..." : "Complete Payment"}
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </Layout>
    );
}

export default Cart;