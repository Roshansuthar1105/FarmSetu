import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const {BACKEND_URL,authUser}= useAuthContext();
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id])
  const fetchProduct = async () => {
    if (!id) {
      console.error('Product ID is undefined');
      return;
    }
    const url = `${BACKEND_URL}/api/products/get/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  if (!product) {
    return <div>Product not found</div>;
  }
  const addToCart = async (product) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/cart/${authUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(product)
      });
      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }
      const data = await response.json();
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };
  const handleChatClick = (seller,name) => {
    navigate(`/localchat?seller=${seller}&productname=${name.split( ).join("+")}`);
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col gap-8 md:flex-row">
          <div className="w-1/4 h-1/1 object-contain">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-400 mb-4">{product.description}</p>
            <p className="text-xl font-bold mb-4">{product.price}</p>

            {/* Additional Details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Additional Details:</h3>
              <p className="text-gray-400 mb-2"><strong>Category:</strong> {product.category}</p>
              <p className="text-gray-400 mb-2"><strong>Stock:</strong> {product.stock} available</p>
              <p className="text-gray-400 mb-2"><strong>Condition:</strong> {product.condition}</p>
              <p className="text-gray-400 mb-2"><strong>Manufacturer:</strong> {product.manufacturer}</p>
              <p className="text-gray-400 mb-2"><strong>SKU:</strong> {product.sku}</p>
            </div>

            <button
              onClick={()=>{handleChatClick(product.seller,product.name)}}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Chat with the Seller
            </button>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 ml-2 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetail;
