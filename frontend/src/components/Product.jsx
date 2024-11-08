import React from 'react'
import { useNavigate } from 'react-router-dom';

function Product({product}) {
    const navigate = useNavigate()
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
      };
    return (
        <div
            key={product._id}
            className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer"
            onClick={() => handleProductClick(product._id)}
        >
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover transition-opacity duration-500 hover:opacity-80" />
            <div className="p-4 transition-transform transform hover:translate-y-2 font-roboto">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-400 mb-2">{product.description}</p>
                <p className="text-xl font-bold mb-2">{product.price}</p>
            </div>
        </div>
    )
}

export default Product