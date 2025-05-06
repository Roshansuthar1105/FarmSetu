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
            className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full ${!removebtn ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => {
                !removebtn && handleProductClick(product._id);
            }}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {product.category && (
                    <div className="absolute top-0 left-0 m-2">
                        <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                            {product.category}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                    {product.price && (
                        <span className="text-lg font-bold text-green-600">{product.price}</span>
                    )}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <div className="flex space-x-2">
                    {editbtn && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateClick(product._id);
                            }}
                            className="text-gray-500 hover:text-green-600 p-2 rounded-full transition-colors"
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
                            className="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors"
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
                            className="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors"
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
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                        <FaEye className="mr-1 h-4 w-4" />
                        {t('view_details') || 'View Details'}
                    </button>
                )}

                {!removebtn && !editbtn && !deletebtn && (
                    <button
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product._id);
                        }}
                    >
                        {t('view_product') || 'View Product'} →
                    </button>
                )}
            </div>
        </div>
    )
}

export default Product