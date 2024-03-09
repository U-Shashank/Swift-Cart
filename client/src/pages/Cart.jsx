import React from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../../context/cart';

const Cart = () => {
    const [cart, setCart] = useCart();

    // Calculate total price
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    return (
        <Layout>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-center">Your cart is empty</p>
                ) : (
                    <div>
                        {cart.map(product => (
                            <div key={product.id} className="flex items-center justify-between border-b border-gray-300 py-2">
                                <div className="flex items-center">
                                    <img src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p>${product.price}</p>
                                    </div>
                                </div>
                                <div>
                                    <button className="text-red-500" onClick={() => {
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
                            <h2 className="text-xl font-semibold">Payment</h2>
                            <p>Enter your payment details here</p>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold">Total</h2>
                            <p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Cart;
