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

  const handleChatClick = (sellerId, productName) => {
    if (!authUser) {
      toast.error(t('login_to_chat'));
      return;
    }
    navigate(`/localchat?seller=${sellerId}&productname=${productName.split(' ').join('+')}`);
  };

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



  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-20">
        <div className="max-w-6xl mx-auto p-4 py-8">
          <div className="flex mb-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row animate-pulse">
              <div className="w-full lg:w-1/2 h-96 bg-gray-200"></div>

              <div className="p-6 lg:p-8 lg:w-1/2">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>

                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>

                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto p-4 py-8">

        <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-500 hover:text-green-600">
                {t('home')}
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <a href="/farmermarketplace" className="text-gray-500 hover:text-green-600">
                  {t('marketplace.title')}
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 h-96 lg:h-auto relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.category && (
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 lg:p-8 flex flex-col lg:w-1/2">
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-2xl font-bold text-green-600 mb-6">{product.price}</p>

                <div className="prose prose-sm max-w-none text-gray-600 mb-8">
                  <p>{product.description}</p>
                </div>

                {/* Additional Details */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                    {t('additional_details')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.category && (
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">{t('category')}:</span>
                        <span className="font-medium text-gray-800">{product.category}</span>
                      </div>
                    )}
                    {product.stock && (
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">{t('stock')}:</span>
                        <span className="font-medium text-gray-800">{product.stock} {t('available')}</span>
                      </div>
                    )}
                    {product.condition && (
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">{t('condition')}:</span>
                        <span className="font-medium text-gray-800">{product.condition}</span>
                      </div>
                    )}
                    {product.manufacturer && (
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">{t('manufacturer')}:</span>
                        <span className="font-medium text-gray-800">{product.manufacturer}</span>
                      </div>
                    )}
                    {product.sku && (
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">{t('sku')}:</span>
                        <span className="font-medium text-gray-800">{product.sku}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seller Information */}
                {product.seller && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                      {t('seller_information')}
                    </h3>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4">
                        {product.seller.charAt ? product.seller.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{t('seller_id')}: {product.seller}</p>
                        <p className="text-sm text-gray-600">{t('member_since')}: {new Date().getFullYear()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {t('add_to_cart')}
                </button>
                <button
                  onClick={() => handleChatClick(product.seller, product.name)}
                  className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {t('chat_with_seller')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('related_products')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be populated with actual related products */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1508432116762-1f883098ed41?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlZSUyMGhpdmVzfGVufDB8fDB8fHww"
                  alt="Related product"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{t('similar_product')}</h3>
                <p className="text-green-600 font-medium">₹4,500</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2022/11/XR/SW/QR/15491647/wth600-kit-wireless-weather-station-kit.png"
                  alt="Related product"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{t('similar_product')}</h3>
                <p className="text-green-600 font-medium">₹12,000</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://greenonenergy.in/wp-content/uploads/2022/06/800-VA.png"
                  alt="Related product"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{t('similar_product')}</h3>
                <p className="text-green-600 font-medium">₹45,000</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://mlhobevaucyf.i.optimole.com/w:500/h:500/q:mauto/f:best/ig:avif/https://novo3ds.in/wp-content/uploads/2023/06/AG122_Seeding-tray_3.jpg"
                  alt="Related product"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{t('similar_product')}</h3>
                <p className="text-green-600 font-medium">₹500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
