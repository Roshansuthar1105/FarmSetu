import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook

const ProductDetail = () => {
  const { t } = useTranslation();  // Initialize translation hook
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { BACKEND_URL, authUser } = useAuthContext();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    if (!id) {
      console.error('Product ID is undefined');
      return;
    }
    const url = `${BACKEND_URL}/api/products/get/${id}`;
    try {
      setloading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setloading(false);
    }
  };

  if (!product) {
    return <div>{t('product_not_found')}</div>;  // Use translation here
  }

  const addToCart = async (product) => {
    try {
      if (localStorage.getItem('user') == null) {
        toast.error(t('login_to_add_cart'));  // Use translation here
        return;
      }
      const response = await fetch(`${BACKEND_URL}/api/profile/cart/${authUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }
      const data = await response.json();
      toast.success(t('product_added_success'));  // Use translation here
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error(t('add_to_cart_failed'));  // Use translation here
    }
  };

  const handleChatClick = (seller, name) => {
    if (localStorage.getItem('user') == null) {
      toast.error(t('login_to_chat'));  // Use translation here
      return;
    }
    navigate(`/localchat?seller=${seller}&productname=${name.split(' ').join('+')}`);
  };

  if (loading) {
    return (
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="container mx-auto w-3/4 py-8 mt-16 animate-pulse">
          <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col gap-8 md:flex-row">
            <div className="w-2/4 h-1/1 object-contain">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="w-1/2 p-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>

              <div className="mb-4">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              </div>

              <div className="h-10 my-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"></div>
              <div className="h-10 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col gap-8 md:flex-row">
          <div className="w-full lg:w-1/2 md:w-2/5 h-1/1 object-contain">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-400 mb-4">{product.description}</p>
            <p className="text-xl font-bold mb-4">{product.price}</p>

            {/* Additional Details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{t('additional_details')}</h3>  {/* Use translation here */}
              <p className="text-gray-400 mb-2">
                <strong>{t('category')}:</strong> {product.category}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>{t('stock')}:</strong> {product.stock} {t('available')}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>{t('condition')}:</strong> {product.condition}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>{t('manufacturer')}:</strong> {product.manufacturer}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>{t('sku')}:</strong> {product.sku}
              </p>
            </div>

            <button
              onClick={() => {
                handleChatClick(product.seller, product.name);
              }}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              {t('chat_with_seller')}  {/* Use translation here */}
            </button>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 ml-2 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              {t('add_to_cart')}  {/* Use translation here */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
