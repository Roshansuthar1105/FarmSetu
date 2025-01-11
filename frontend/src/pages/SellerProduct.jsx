import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import { useAuthContext } from '../context/AuthContext';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
function SellerProduct() {
  const [ref, setRef] = useState(true);
  const { BACKEND_URL, authUser } = useAuthContext()
  const removebtn = true;
  const editbtn = true;
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const emptyProduct = {
    category: t('no_product_found'),
    date: Date.now().toLocaleString(),
    description: t('add_some_products'),
    image: "https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: t('no_product_name')
  }
  const fetchProducts = async () => {
    const url = `${BACKEND_URL}/api/products/${authUser._id}`
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      setProducts(data)
    } else {
      console.error(resp)
    }
  }
  const deleteProduct = async (productId) => {
    const url = `${BACKEND_URL}/api/products/delete/${productId}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      const data = await response.json();
      toast.success(t('product_deleted'));
      setRef(!ref)
      // Optionally, update the local state to remove the deleted product
      //   setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [ref])
  return (
    <div className='flex flex-wrap gap-4 bg-gray-800 py-24 justify-center align-middle min-h-[80dvh] '>
      <div className='w-full mx-10 flex flex-row justify-between items-center' >
        <h2 className="text-4xl font-bold text-white mb-4"> {t('your_products')} </h2>
        <button className='bg-green-600 text-white px-4 py-2 rounded-md text-md flex flex-row gap-2 items-center ' onClick={() => { navigate("/profile/products/add") }}><IoCartOutline /> <span>{t('add_products')}</span></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-w-[1200px]">
        {
          products.length === 0 ?
            <Product product={emptyProduct} key={emptyProduct.name} removebtn={removebtn} />
            :
            products.map((product, index) => (
              <>
                <Product key={index*Math.random(4,100)} product={product} removebtn={removebtn} editbtn={editbtn} deletebtn={deleteProduct} />
              </>
            ))}
      </div>
    </div>
  )
}

export default SellerProduct