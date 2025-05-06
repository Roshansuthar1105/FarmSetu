import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import Product from '../components/Product';
import toast from 'react-hot-toast';
import { IoCartOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

function UserCart() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const removebtn = true;
    const emptyProduct = {
        category:"No product Found",
        date: Date.now().toLocaleString(),
        description:t('empty_cart_message'),
        image:"https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&w=800",
        name:"No product !"
    }
    const removeproduct = async (id) => {
        const url = `${BACKEND_URL}/api/profile/cart/delete/${authUser._id}`;
        // const url = `${BACKEND_URL}/api/profile/cart/delete/${}`;
        try {
            const bodyDemo = JSON.stringify({ id });
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyDemo,
            });
            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }
            const data = await response.json();
            toast.success(t('product_removed'))
            setCart(data.cart)
            fetchCart();
        } catch (error) {
            console.log(error)
        }
    }
    const [cart, setCart] = useState([]);
    const { BACKEND_URL, authUser } = useAuthContext();
    const fetchProduct = async () => {
        const url = `${BACKEND_URL}/api/products/`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    const fetchCart = async () => {
        const url = `${BACKEND_URL}/api/profile/cart/${authUser._id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    const clearCart = async () => {
        if (!window.confirm(t('clear_cart_confirmation'))) {
            return;
        }
        const url = `${BACKEND_URL}/api/profile/cart/clearcart/${authUser._id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to remove products from cart');
            }
            const data = await response.json();
            toast.success(data.message)
            setCart(data.cart)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, [])
    return (
        <div className='bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-20'>
            <div className='max-w-6xl mx-auto p-4 py-8'>
                <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t('your_cart')}</h1>
                        <p className="text-gray-600 max-w-2xl">
                            {t('your_cart_description') || 'Review and manage the products in your shopping cart.'}
                        </p>
                    </div>

                    {cart.length > 0 && (
                        <button
                            className='mt-4 md:mt-0 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 flex items-center shadow-md'
                            onClick={clearCart}
                        >
                            <IoCartOutline className="mr-2" />
                            <span>{t('clear_cart')}</span>
                        </button>
                    )}
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <IoCartOutline className="h-8 w-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-800">{t('empty_cart')}</h2>
                        <p className="text-gray-600 mb-6">{t('empty_cart_message')}</p>
                        <button
                            onClick={() => window.location.href = '/marketplace'}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            {t('browse_products')}
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {cart.map((product, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute top-0 right-0 m-2">
                                            <button
                                                onClick={() => removeproduct(product._id)}
                                                className="bg-white/80 hover:bg-white text-red-500 p-2 rounded-full shadow-sm transition-colors"
                                                title={t('remove_from_cart')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                                            <span className="text-lg font-bold text-green-600">{product.price}</span>
                                        </div>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                        <div className="text-sm text-gray-500 mb-2">
                                            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
                                        <button
                                            onClick={() => window.location.href = `/product/${product._id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {t('view_details')}
                                        </button>
                                        <button
                                            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                                            onClick={() => window.location.href = `/chat?seller=${product.seller}&productname=${product.name}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                            {t('contact_seller')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">{t('order_summary')}</h2>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">{t('items')}:</span>
                                    <span className="font-medium">{cart.length}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">{t('subtotal')}:</span>
                                    <span className="font-medium">₹{cart.reduce((total, item) => {
                                        const price = item.price ? parseFloat(item.price.replace(/[^\d.]/g, '')) : 0;
                                        return total + price;
                                    }, 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">{t('shipping')}:</span>
                                    <span className="font-medium">{t('calculated_at_checkout')}</span>
                                </div>
                                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                                    <span className="text-lg font-bold text-gray-800">{t('total')}:</span>
                                    <span className="text-lg font-bold text-green-600">₹{cart.reduce((total, item) => {
                                        const price = item.price ? parseFloat(item.price.replace(/[^\d.]/g, '')) : 0;
                                        return total + price;
                                    }, 0).toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium">
                                {t('proceed_to_checkout')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserCart