import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SellerProductEdit() {
    const {authUser ,BACKEND_URL }=useAuthContext();
    const navigate = useNavigate();
    const { t } = useTranslation();
    if(authUser.role!=="seller"){
        toast.error(t("not_a_seller"))
        navigate("/profile")   
    }
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category:'',
        seller: authUser._id,
    });
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
    ]
    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        if (!product.price.includes("₹")) {
            product.price = "₹" + product.price;
        }
        if(product.category.trim()==''){
            toast.error(t("enter_valid_category"));
            return;}
        const response = await fetch(`${BACKEND_URL}/api/products/addproduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            toast.error("Network response was not ok");
            throw new Error('Network response was not ok');
        }
        // const data = await response.json();
        toast.success(t('product_added_successfully'));
        setProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            category:'',
            seller: authUser._id,
        });
    }
  return (
    <div className="w-full h-full py-24 bg-gray-800 flex items-center justify-center" >
        <div className="bg-white p-6 rounded-lg max-w-md relative w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-600">{t('add_new_product')}</h2>
            <form onSubmit={(e) => handleSubmitProduct(e)} >
                <div className="space-y-4">
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-black">{t('product_name')}</label>
                        <input
                            type="text"
                            id="productName"
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            className="mt-1 block w-full  rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="productDescription" className="block text-sm font-medium text-black">{t('product_description')}</label>
                        <textarea
                            id="productDescription"
                            rows={3}
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            className="mt-1 block w-full  rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="productPrice" className="block text-sm font-medium text-black">{t('product_price')}</label>
                        <input
                            type="number"
                            id="productPrice"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            className="mt-1 block w-full  rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="productCategory" className="block text-sm font-medium text-black">{t('product_category')}</label>
                        <select
                            id="productCategory"
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="mt-1 block w-full  rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">{t('select_category')}</option>
                            {categories.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="productImageUrl" className="block text-sm font-medium text-black">{t('product_image_url')}</label>
                        <input
                            type="text"
                            id="productImageUrl"
                            value={product.image}
                            onChange={(e) => setProduct({ ...product, image: e.target.value })}
                            className="mt-1 block w-full  rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        // required
                        />
                    </div>
                    {/* onClick={(e) => handleSubmitProduct(e)} */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    </div>
)
}

export default SellerProductEdit