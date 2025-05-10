import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { MdDelete, MdEditSquare, MdRemoveShoppingCart } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

function Product({ product, removeproduct, removebtn,editbtn ,deletebtn }) {
    const navigate = useNavigate()
    const {BACKEND_URL} = useAuthContext()
    const { t } = useTranslation();
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };
    const handleUpdateClick = (id) => {
        navigate(`/product/edit/${id}`);
    };
    const deleteProduct = async (productId) => {
        const url = `${BACKEND_URL}/api/products/delete/${productId}`;
        try {
          const response = await fetch(url, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
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
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/30 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 ${
                !removebtn ? 'cursor-pointer' : 'cursor-default'
            }`}
            onClick={() => {
                !removebtn && handleProductClick(product._id);
            }}
        >
            <div className="relative h-48 overflow-hidden group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {product.category && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block bg-green-600 dark:bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                            {product.category}
                        </span>
                    </div>
                )}

                {/* Quick action buttons on hover */}
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product._id);
                        }}
                        className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 p-2 rounded-full shadow-md hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
                        title={t('quick_view')}
                    >
                        <FaEye className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">{product.name}</h2>
                    {product.price && (
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">{product.price}</span>
                    )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">{product.description}</p>
            </div>

            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div className="flex space-x-1">
                    {editbtn && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateClick(product._id);
                            }}
                            className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 p-2 rounded-full transition-colors"
                            title={t('edit_product')}
                        >
                            <MdEditSquare className="h-5 w-5" />
                        </button>
                    )}

                    {deletebtn && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deletebtn(product._id);
                            }}
                            className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-full transition-colors"
                            title={t('delete_product')}
                        >
                            <MdDelete className="h-5 w-5" />
                        </button>
                    )}

                    {removeproduct && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeproduct(product._id);
                            }}
                            className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-full transition-colors"
                            title={t('remove_from_cart')}
                        >
                            <MdRemoveShoppingCart className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {removebtn && !(product.name === "No product !") && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product._id);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center"
                    >
                        <FaEye className="mr-1 h-4 w-4" />
                        {t('view_details') || 'View Details'}
                    </button>
                )}

                {!removebtn && !editbtn && !deletebtn && (
                    <button
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium flex items-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product._id);
                        }}
                    >
                        {t('view_product') || 'View Product'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Product