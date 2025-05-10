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
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl mb-12">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={5000}
            transitionTime={700}
            showStatus={false}
            className="rounded-2xl"
            renderArrowPrev={(clickHandler, hasPrev) => (
              <button
                onClick={clickHandler}
                className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 ${!hasPrev && 'hidden'}`}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <button
                onClick={clickHandler}
                className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 ${!hasNext && 'hidden'}`}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="carousel-item relative">
                <div className="relative h-[400px] md:h-[500px] w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-left">
                    <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 md:mb-4">{item.title}</h3>
                    <p className="text-white text-sm md:text-lg max-w-2xl">{item.description}</p>
                    <button className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 shadow-lg">
                      Explore Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Categories Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-10 transition-colors duration-300">
          <Categories onCategoryChange={handleCategoryChange} />
        </div>

        {/* Products Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-10 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">
                {t('marketplace.title')}
              </span>
            </h1>

            <div className="w-full md:w-auto flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-2 transition-colors duration-300">
              <Input
                clearable
                placeholder={t('marketplace.searchPlaceholder')}
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-transparent border-none"
                classNames={{
                  input: "text-gray-800 dark:text-gray-200",
                  clearButton: "text-gray-500 dark:text-gray-400"
                }}
              />
              <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg ml-2 text-white">
                <IoSearchSharp className="h-5 w-5" />
              </div>
            </div>
          </div>

          {loading && <LoadingComponent />}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}

            {!loading && filteredProducts.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <img
                  src="https://img.freepik.com/free-photo/beautiful-view-field-covered-green-grass-captured-canggu-bali_181624-7666.jpg"
                  alt={t('marketplace.noProductsFound')}
                  className="w-64 h-64 object-cover rounded-full mb-6 border-4 border-gray-200 dark:border-gray-700"
                />
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{t('marketplace.noProductsFound')}</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <LoadingDiv />
      <LoadingDiv />
      <LoadingDiv />
      <LoadingDiv />
      <LoadingDiv />
      <LoadingDiv />
      <LoadingDiv />
      <LoadingDiv />
    </div>
  );
};

const LoadingDiv = () => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden animate-pulse transition-all duration-300">
      <div className="relative h-48">
        <div className="w-full h-full bg-gray-200 dark:bg-gray-600"></div>
        <div className="absolute top-3 left-3">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-500 rounded-md"></div>
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-500 rounded-md"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-md w-3/4"></div>
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
        </div>
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
      </div>
    </div>
  );
};

export default Marketplace;
