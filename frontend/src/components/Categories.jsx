import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

const categories = [
  { name: 'Seeds', image: 'https://hips.hearstapps.com/hmg-prod/images/flaxseed-close-up-royalty-free-image-1636392298.jpg' },
  { name: 'Fertilizers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnx5-0xolzI-KFVTsq1Z_u7Xwu7rNHVzzUJw&s' },
  { name: 'Irrigation', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-UYl--I81Z-SEi48k4g04we4lCSaiu4cpvw&s' },
  { name: 'Tools', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZffUOl370gSV5Al7wlrWbHAh_zb1gt9UDpA&s' },
  { name: 'Machinery', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJ5yH76NWos_lLzV86Zsg7fYgAtgb9puDBA&s' },
  { name: 'Pesticides', image: 'https://grist.org/wp-content/uploads/2023/01/India-agriculture-pesticides.jpg' },
  { name: 'Greenhouses', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXiIegzSpFRS6FwofCS8jXNFlPQ00kLuriVw&s' },
  { name: 'Feed', image: 'https://www.allaboutfeed.net/app/uploads/2020/12/001_563_IMG_hsk408307-033.jpg' },
  { name: 'Tractors', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qHqH_yTQQwPOh1Dhvce0vmc5ZSKPqdiTzg&s' },
  { name: 'Sprayers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP66WI9OOYRIJajt3gxx1DsjjPSjCct6dv2g&s' },
  { name: 'Harvesters', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUzofWsrH6K94fIWSFJ4ayxbsYsUr9eAj_w&s' },
  { name: 'Plows', image: 'https://cdn.britannica.com/45/102545-050-EC6D12BD/tractor-disk-plow.jpg' },
  { name: 'Cultivators', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiBoRSeTiOt1hBQP0FZDolxgs9eaB_3WSrQ&s' },
  { name: 'Planters', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGY0SMeVYVMO-I3sKWKKIddf4X77MsXTFhw&s' },
  { name: 'Combines', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNKJxCFyfJsgU1gDpYWTDK6GdKg0lth8q5LQ&s' },
  { name: 'Hoes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOKJjPQ7Ih8NJhcegKsrgAhByQrED8fbgB9w&s' },
  { name: 'Rakes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAmtdi66r5a2ivI8zCqGTtbn7omFWEVHMb0w&s' },
  { name: 'Shovels', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWa2I8X7LKMRpDAfEdD2BiOSBP4SSx-SWJsg&s' },
  { name: 'Wheelbarrows', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7i1g-x9FyBs8UCtSTSV7K9XW7knWxNucBgw&s' },
  { name: 'Sprinklers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzAWdGN5dZT8Sax6K0fiuKKIdQFE1Q8PTxg&s' },
  { name: 'Drip Irrigation', image: 'https://www.epicgardening.com/wp-content/uploads/2023/11/install-drip-irrigation-1200x667.jpeg' },
  { name: 'Pumps', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsMkKac4H0G1zSJ6YjYAHacqs1c7O3C1Q6LQ&s' },
  { name: 'Soil Testers', image: 'https://5.imimg.com/data5/SELLER/Default/2022/1/JI/CF/BW/3764870/ph-soil-meter-500x500.jpeg' },
  { name: 'Weather Stations', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmZYGs3TGP2jw97jRpTtyZB4iAlc8-Vx_yGg&s' },
  { name: 'Pond Liners', image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/SV/FU/OD/68765705/rhinomat-hdpe-geomembrane-pond-liner.jpeg' },
  { name: 'Beehives', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4A9BNqs8R4c9gxsVtdbhJp6qPlnlLKGac7g&s' },
  { name: 'Composters', image: 'https://cdn.britannica.com/82/194882-050-C382CFA6/Scraps-plant-matter-compost-bin-garden.jpg' },
  { name: 'Solar Panels', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5FEChg93p6njctj-kk141m0CXWLlqNI0pQ&s' },
];

const Categories = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleCategoryClick = (categoryName) => {
    const newSelectedCategory = selectedCategory === categoryName ? null : categoryName;
    setSelectedCategory(newSelectedCategory);
    onCategoryChange(newSelectedCategory);
  };

  const handleViewMoreClick = () => {
    setShowAll(!showAll);
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">
            Categories
          </span>
        </h2>
        {selectedCategory && (
          <button
            onClick={() => handleCategoryClick(selectedCategory)}
            className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filter
          </button>
        )}
      </div>

      <div
        className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#22c55e transparent' }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center cursor-pointer group mx-3 first:ml-0 last:mr-0"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="relative">
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'ring-2 ring-offset-2 ring-green-500 dark:ring-green-400'
                    : 'group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-green-400/50 dark:group-hover:ring-green-300/50'
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {selectedCategory === category.name && (
                <div className="absolute -top-1 -right-1 bg-green-500 dark:bg-green-400 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            <p className={`text-center mt-2 text-sm font-medium transition-colors duration-300 ${
              selectedCategory === category.name
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400'
            }`}>
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {/* {showAll ? (
        <button
          onClick={handleViewMoreClick}
          className="mt-4 w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Show Less
        </button>
      ) : (
        <button
          onClick={handleViewMoreClick}
          className="mt-4 w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          View All Categories
        </button>
      )} */}
    </div>
  );
};

export default Categories;
