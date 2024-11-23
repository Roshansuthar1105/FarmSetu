import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import Product from '../components/Product';

function UserCart() {
    const [products , setProducts ]= useState([]);
    const [cart , setCart ]= useState([]);
    const { BACKEND_URL } = useAuthContext();
    const fetchProduct = async () => {
        const url = `${BACKEND_URL}/api/products/`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
            console.log("pdata ",data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    const fetchCart = async () => {
        const url = `${BACKEND_URL}/api/profile/cart/67345d83051cd1db2ebd2fd6`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const filtered_data = products.filter(product => data.includes(product._id));
            console.log("user data ",filtered_data , data);
            setCart(filtered_data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, [])
    return (
        <div className='flex flex-wrap gap-4 bg-gray-600 py-24 justify-center align-middle min-h-[80dvh] '>
            <h2 className="text-4xl font-bold text-white mb-4"> Your Cart </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((product, index) => (
                <Product key={index} product={product} />
            ))}
            </div>
        </div>
    )
}

export default UserCart