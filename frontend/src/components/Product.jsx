import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';

function Product({ product, removeproduct, removebtn }) {
    const navigate = useNavigate()
    const handleProductClick = (id) => {
        // removeproduct(id);
        navigate(`/product/${id}`);
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
                {removeproduct && <button onClick={() => removeproduct(product._id)} className="text-red-500 hover:text-red-700 bg-red-100 p-4 mr-4 rounded-lg"><FaTrash /></button>}
                {removebtn && !(product.name==="No product !") && <button  onClick={() => handleProductClick(product._id)} className="text-blue-500 hover:text-blue-700 bg-blue-100 p-4 rounded-lg"><FaEye /></button>}
            </div>
        </div>
    )
}

export default Product