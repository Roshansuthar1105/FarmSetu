import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTranslation } from 'react-i18next';
import Product from '../components/Product.jsx';
import Categories from '../components/Categories';
import { useAuthContext } from '../context/AuthContext.jsx';
import { IoSearchSharp } from 'react-icons/io5';

const Marketplace = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const { BACKEND_URL } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/products/`);
      if (!response.ok) {
        throw new Error(t('error.fetch'));
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(t('error.fetch'), error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const carouselItems = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1722945635992-8eda6a907978?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VlZHN8ZW58MHx8MHx8fDA%3D',
      title: t('carousel.qualitySeeds.title'),
      description: t('carousel.qualitySeeds.description'),
    },
    {
      image: 'https://m.media-amazon.com/images/I/91Y3l-BVm-L._AC_UF1000,1000_QL80_.jpg',
      title: t('carousel.organicFertilizers.title'),
      description: t('carousel.organicFertilizers.description'),
    },
    {
      image: 'https://www.easygardenirrigation.co.uk/cdn/shop/files/pop-up-sprinklers-decription.jpg?v=1679761948&width=439',
      title: t('carousel.irrigationSystems.title'),
      description: t('carousel.irrigationSystems.description'),
    },
    {
      image: 'https://i0.wp.com/katiespring.com/wp-content/uploads/2018/05/fyQDPIA0QS2MBT4tLjUoSg.jpg?fit=4032%2C3024&ssl=1',
      title: t('carousel.farmingTools.title'),
      description: t('carousel.farmingTools.description'),
    },
  ];

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-16">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3000}
          transitionTime={500}
          className="mb-8"
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="carousel-item relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                style={{ height: '500px', width: '100%' }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-transparent bg-opacity-50 p-4 rounded-b-lg">
                <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                <p className="text-white">{item.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <Categories onCategoryChange={handleCategoryChange} />
        <h1 className="text-2xl font-bold mb-6 text-green-500">{t('marketplace.title')}</h1>
        <div className="mb-6 flex flex-row gap-3">
          <Input
            clearable
            underlined
            fullWidth
            placeholder={t('marketplace.searchPlaceholder')}
            value={searchQuery}
            onChange={handleSearchChange}
            className="custom-search-input"
          />
          <IoSearchSharp className="text-green-800 bg-white h-11 w-11 rounded-lg" />
        </div>
        {loading && <LoadingComponent />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
          {!loading && filteredProducts.length === 0 && (
            <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer">
              <img
                src="https://img.freepik.com/free-photo/beautiful-view-field-covered-green-grass-captured-canggu-bali_181624-7666.jpg"
                alt={t('marketplace.noProductsFound')}
                className="w-full h-40 object-cover transition-opacity duration-500 hover:opacity-80"
              />
              <div className="p-4 transition-transform transform hover:translate-y-2 font-roboto">
                <h2 className="text-xl font-bold mb-2">{t('marketplace.noProductsFound')}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <LoadingDiv />
      <LoadingDiv />
      <LoadingDiv />
      <LoadingDiv />
    </div>
  );
};

const LoadingDiv = () => {
  return (
    <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg overflow-hidden transform transition duration-500 animate-pulse">
      <div className="w-full h-40 bg-gray-300"></div>
      <div className="p-4 transition-transform transform hover:translate-y-2 font-roboto">
        <div className="h-4 mb-2 bg-gray-200 rounded"></div>
        <div className="h-4 mb-2 bg-gray-200 rounded"></div>
        <div className="h-4 mb-2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default Marketplace;
