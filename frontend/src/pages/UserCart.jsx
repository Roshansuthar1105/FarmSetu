import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import Product from '../components/Product';
import toast from 'react-hot-toast';
import { IoCartOutline } from 'react-icons/io5';

function UserCart() {
    const [products, setProducts] = useState([]);
    const removebtn = true;
    const emptyProduct = {
        category:"No product Found",
        date: Date.now().toLocaleString(),
        description:"Add some products to access saved products",
        image:"https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&w=800",
        name:"No product !"
    }
    const removeproduct = async (id) => {
        const url = `${BACKEND_URL}/api/profile/cart/delete/${authUser._id}`;
        // const url = `${BACKEND_URL}/api/profile/cart/delete/${}`;
        try {
            const bodyDemo = JSON.stringify({ id });
            console.log(bodyDemo)
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
            toast.success("Product Removed !")
            console.log("data ", data)
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
            // console.log("pdata ",data);
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
        if (!window.confirm('Are you sure you want to clear your cart?')) {
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
        console.log(cart)
    }, [])
    return (
        <div className='flex flex-wrap gap-4 bg-gray-800 py-24 justify-center align-middle min-h-[80dvh] '>
            <div className='w-full mx-10 flex flex-row justify-between items-center' >
                <h2 className="text-4xl font-bold text-white mb-4"> Your Cart </h2>
                <button className='bg-green-600 text-white px-4 py-2 rounded-md text-md flex flex-row gap-2 items-center '  onClick={clearCart}><IoCartOutline/> <span>Clear Cart</span></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-w-[1200px] bg-red-00 ">
                {
                    cart.length === 0 ?
                        <Product product={emptyProduct} removebtn={removebtn} />
                        :
                        cart.map((product, index) => (
                            <Product key={index} product={product} removeproduct={removeproduct} removebtn={removebtn} />
                        ))}

            </div>
        </div>
    )
}

export default UserCart