import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { MdDelete, MdEditSquare, MdRemoveShoppingCart } from 'react-icons/md';

function Product({ product, removeproduct, removebtn,editbtn ,deletebtn }) {
    const navigate = useNavigate()
    const {BACKEND_URL} = useAuthContext()
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };
    const handleUpdateClick = (id) => {
        navigate(`/product/edit/${id}`);
    };
    const deleteProduct = async (productId) => {
        const url = `${BACKEND_URL}/api/products/delete/${productId}`;
        // console.log(url)
        try {
          const response = await fetch(url, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
          const data = await response.json();
          console.log(data);
          toast.success("Product Deleted !");
          // Optionally, update the local state to remove the deleted product
        //   setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
    return (
        <div
            key={product._id}
            className={`bg-gray-700 border border-gray-600 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:shadow-2xl hover:scale-105 ${!removebtn ? 'cursor-pointer':'cursor-default'}`}
            onClick={() => {
                !removebtn ?
                    handleProductClick(product._id) : ''
            }}
        >
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover transition-opacity duration-500 hover:opacity-80" />
            <div className="p-4 transition-transform transform hover:translate-y-2 font-roboto">
                <h2 className="text-lg font-semibold mb-2 text-white">{product.name}</h2>
                <p className="text-gray-400 mb-2">{product.description}</p>
                <p className="text-xl font-bold mb-2 text-gray-200">{product.price}</p>
                <div className='flex flex-row gap-4' >

                {editbtn && <button onClick={() => handleUpdateClick(product._id)} className="text-green-500 hover:text-green-700 bg-green-100 p-4 rounded-lg"><MdEditSquare /></button>}
                {removebtn && !(product.name==="No product !") && <button  onClick={() => handleProductClick(product._id)} className="text-blue-500 hover:text-blue-700 bg-blue-100 p-4 rounded-lg"><FaEye /></button>}
                {deletebtn && <button onClick={() => deletebtn(product._id)} className="text-red-500 hover:text-red-700 bg-red-100 p-4 rounded-lg"><MdDelete /></button>}
                {removeproduct && <button onClick={() => removeproduct(product._id)} className="text-red-500 hover:text-red-700 bg-red-100 p-4 rounded-lg"><MdRemoveShoppingCart /></button>}
                </div>
            </div>
        </div>
    )
}

export default Product