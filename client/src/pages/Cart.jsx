import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const { user, token } = auth;
    const navigate = useNavigate();
    const location = useLocation()
    const [clientToken, setClientToken] = useState();
    const [instance, setInstance] = useState();
    const [loading, setLoading] = useState(false);

    const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    const getToken = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/braintree`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${import.meta.env.VITE_HOST_URL}/braintree`, {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto mt-8 px-4 md:px-12 lg:px-24 py-2 max-w-[800px]">
                <h1 className="text-3xl font-semibold mb-4 text-center text-white">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-center text-white">Your cart is empty</p>
                ) : (
                    <div>
                        {cart.map(product => (
                            <div key={product.id} className="flex items-center justify-between border-b border-gray-300 py-2">
                                <div className="flex items-center">
                                    <img src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} alt={product.name} className="w-16 h-16 object-cover mr-4 rounded-md" />
                                    <div>
                                        <p className="font-semibold text-lg text-white">{product.name}</p>
                                        <p className="text-white">₹{product.price}</p>
                                    </div>
                                </div>
                                <div>
                                    <button className="text-red-500 font-bold bg-white rounded-md px-2 py-1 hover:text-white hover:bg-red-500" onClick={() => {
                                        const updatedCart = cart.filter((p) => p._id !== product._id);
                                        setCart(updatedCart);
                                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                                    }}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-white">Total</h2>
                            <p className="text-lg font-semibold text-white">₹{totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="mt-8">
                            {
                                token ? <h2 className="text-xl font-semibold text-white">Current Address</h2> : null
                            }
                            {
                                token
                                    ?
                                    user?.address ?
                                        <div className='flex flex-col items-start'>
                                            <p className="text-gray-200 font-bold">{user.address}</p>
                                            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                        </div>
                                        :
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                            onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                    :
                                    <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 w-full"
                                        onClick={() => navigate("/login", {
                                            state: location.pathname
                                        })}>Please Login</button>
                            }
                        </div>
                        <div className="mt-8">
                            {
                                token ? <h2 className="text-xl font-semibold text-white">Payment</h2> : null
                            }
                            {
                                !clientToken || !cart?.length ? ("")
                                    :
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                }
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                            className="mb-4"
                                        />
                                        <button onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                            className="bg-green-500 w-full text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
                                        >
                                            {loading ? "Processing..." : "Pay"}
                                        </button>
                                    </>
                            }
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Cart;
