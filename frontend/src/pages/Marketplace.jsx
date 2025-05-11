import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Chip } from '@nextui-org/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTranslation } from 'react-i18next';
import Product from '../components/Product.jsx';
import Categories from '../components/Categories';
import { useAuthContext } from '../context/AuthContext.jsx';
import { IoSearchSharp, IoFilterOutline, IoGridOutline, IoListOutline } from 'react-icons/io5';
import { FiShoppingBag, FiTrendingUp, FiStar, FiPackage } from 'react-icons/fi';
import { motion } from 'framer-motion';

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

  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [featuredCategories] = useState([
    { name: 'Seeds', icon: <FiPackage />, color: 'bg-emerald-500' },
    { name: 'Tools', icon: <FiStar />, color: 'bg-blue-500' },
    { name: 'Fertilizers', icon: <FiTrendingUp />, color: 'bg-amber-500' },
    { name: 'Machinery', icon: <FiShoppingBag />, color: 'bg-purple-500' }
  ]);

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop',
      title: t('carousel.qualitySeeds.title'),
      description: t('carousel.qualitySeeds.description'),
      buttonText: t('explore_products'),
      buttonAction: () => setSelectedCategory('Seeds')
    },
    {
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop',
      title: t('carousel.organicFertilizers.title'),
      description: t('carousel.organicFertilizers.description'),
      buttonText: t('shop_now'),
      buttonAction: () => setSelectedCategory('Fertilizers')
    },
    {
      image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2070&auto=format&fit=crop',
      title: t('carousel.irrigationSystems.title'),
      description: t('carousel.irrigationSystems.description'),
      buttonText: t('view_collection'),
      buttonAction: () => setSelectedCategory('Irrigation')
    },
    {
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2070&auto=format&fit=crop',
      title: t('carousel.farmingTools.title'),
      description: t('carousel.farmingTools.description'),
      buttonText: t('discover_more'),
      buttonAction: () => setSelectedCategory('Tools')
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Hero Banner with Parallax Effect */}
      <div className="relative overflow-hidden">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={6000}
          transitionTime={1000}
          showStatus={false}
          showIndicators={true}
          className="carousel-container"
          renderArrowPrev={(clickHandler, hasPrev) => (
            <button
              onClick={clickHandler}
              className={`absolute left-6 top-1/2 z-10 -translate-y-1/2 bg-white/20 dark:bg-black/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-300 ${!hasPrev && 'hidden'}`}
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
              className={`absolute right-6 top-1/2 z-10 -translate-y-1/2 bg-white/20 dark:bg-black/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-300 ${!hasNext && 'hidden'}`}
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
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
                {/* Background Image with Parallax Effect */}
                <div className="absolute inset-0 scale-105 animate-slow-zoom">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient overlay with animated opacity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent animate-fade-in"></div>

                {/* Content with staggered animation */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 lg:p-24 text-left max-w-7xl mx-auto">
                  <div className="animate-slide-up-1">
                    <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="animate-slide-up-2">
                    <p className="text-white/90 text-base md:text-xl max-w-2xl mb-6 md:mb-8">
                      {item.description}
                    </p>
                  </div>
                  <div className="animate-slide-up-3">
                    <button
                      onClick={item.buttonAction}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 shadow-xl hover:shadow-green-500/20 hover:-translate-y-1 text-base md:text-lg font-medium"
                    >
                      {item.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Categories Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">
                {t('featured_categories')}
              </span>
            </h2>
            <Button
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 px-6"
              radius="full"
              size="sm"
              onClick={() => {}}
            >
              {t('view_all_categories')}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className={`h-2 ${category.color} w-full group-hover:h-3 transition-all duration-300`}></div>
                <div className="p-6 flex flex-col items-center text-center">
                  <div className={`${category.color} bg-opacity-10 dark:bg-opacity-20 p-4 rounded-full mb-4 text-2xl`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t('browse_products')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section with Enhanced UI */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mb-12 transition-colors duration-300">
          <Categories onCategoryChange={handleCategoryChange} />
        </div>

        {/* Products Section with Improved Layout */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mb-12 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">
                  {t('marketplace.title')}
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                {selectedCategory ?
                  t('showing_products_in_category', { category: selectedCategory }) :
                  t('showing_all_products')}
              </p>
            </div>

            <div className="w-full md:w-auto mt-4 md:mt-0 flex items-center gap-2">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-2 transition-colors duration-300 flex-grow md:flex-grow-0">
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

              <div className="flex items-center gap-1">
                <Button
                  isIconOnly
                  className={`${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  radius="lg"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <IoGridOutline className="h-5 w-5" />
                </Button>
                <Button
                  isIconOnly
                  className={`${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  radius="lg"
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <IoListOutline className="h-5 w-5" />
                </Button>
                <Button
                  isIconOnly
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  radius="lg"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <IoFilterOutline className="h-5 w-5" />
                </Button>
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
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white"
                  radius="lg"
                >
                  {t('clear_filters')}
                </Button>
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
