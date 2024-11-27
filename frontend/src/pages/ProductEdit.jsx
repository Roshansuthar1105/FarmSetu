import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import toast from 'react-hot-toast';
import { FaClosedCaptioning } from 'react-icons/fa';
import { FaFolderClosed } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { EyeIcon } from '@heroicons/react/24/outline';
import { FiEye } from 'react-icons/fi';

function ProductEdit() {
    const { BACKEND_URL } = useAuthContext()
    const { id } = useParams();
    const [showimg, setshowimg] = useState(false)
    const categories = [
        'Seeds',
        'Fertilizers',
        'Irrigation',
        'Tools',
        'Machinery',
        'Pesticides',
        'Greenhouses',
        'Feed',
        'Tractors',
        'Sprayers',
        'Harvesters',
        'Plows',
        'Cultivators',
        'Planters',
        'Combines',
        'Hoes',
        'Rakes',
        'Shovels',
        'Wheelbarrows',
        'Sprinklers',
        'Drip Irrigation',
        'Pumps',
        'Soil Testers',
        'Weather Stations',
        'Pond Liners',
        'Beehives',
        'Composters',
        'Solar Panels',
        'Other',
    ]
    const [product, setProduct] = useState(
        {
            name: "",
            price: "₹",
            description: "",
            image: "",
            category: "",
            date: Date.now().toLocaleString()
        }
    );
    const getproduct = async () => {
        const url = `${BACKEND_URL}/api/products/get/${id}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setProduct(data);
        } else {
            console.log("Error ", response);
        }
    }
    const patchProduct = async (productId, updates) => {
        const url = `${BACKEND_URL}/api/products/update/${productId}`;
        
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            toast.success("product updated");
            const data = await response.json();
            // Optionally, update the local state with the updated product
            // setProducts(prevProducts => prevProducts.map(product => product._id === productId ? { ...product, ...updates } : product));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    useEffect(() => {
        getproduct();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        patchProduct(id, product);
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-200 rounded-lg shadow-md relative">
            <h2 className="text-2xl font-bold mb-4">Product Edit</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" className="block w-full p-2 border border-gray-300 rounded-lg" id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="text" className="block w-full p-2 border border-gray-300 rounded-lg" id="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea className="block w-full p-2 border border-gray-300 rounded-lg" id="description" rows="3" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <div className='flex flex-row gap-2' >

                        <input type="text" className="block w-full p-2 border border-gray-300 rounded-lg" id="image" value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} />
                        <button type='button' onClick={() => setshowimg(!showimg)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded'><FiEye className="text-xl text-white" /></button>
                    </div>
                </div>
                {showimg && (
                    <div className="absolute size-full backdrop-blur-sm top-0 left-0 flex items-center justify-center">
                        <>
                            <IoClose className="absolute top-0 right-0 m-4 text-4xl bg-red-400 text-white rounded-lg hover:bg-red-500 cursor-pointer " onClick={() => setshowimg(!showimg)} />
                            <img src={product.image} alt={product.name} className="object-cover size-[50%] rounded-2xl border-green-200 border-2 " />
                        </>
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className="block w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                        {/* <option value="other">Other</option> */}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Product</button>
            </form>
        </div>

    )
}

export default ProductEdit