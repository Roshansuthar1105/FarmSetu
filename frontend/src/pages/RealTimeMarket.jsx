import React, { useState, useMemo } from 'react';
import marketData from '../data/marketData.json';
import { Bar, Pie, Line, Radar, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useTranslation } from 'react-i18next';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiBarChart2, FiFilter, FiMapPin, FiPackage } from 'react-icons/fi';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { BsArrowUpRight, BsArrowDownRight, BsInfoCircle, BsGraphUp } from 'react-icons/bs';

// Register Chart.js components
Chart.register(...registerables);

// Helper function to group data by category
const groupByCategory = (data) => {
  return data.reduce((acc, item) => {
    if (!acc[item.ticker]) {
      acc[item.ticker] = [];
    }
    acc[item.ticker].push(item);
    return acc;
  }, {});
};

// Helper function to get average price by ticker
const getAveragePriceByTicker = (data) => {
  const groupedData = groupByCategory(data);
  return Object.keys(groupedData).map(ticker => {
    const items = groupedData[ticker];
    const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const avgPrice = totalPrice / items.length;
    return { ticker, avgPrice };
  });
};

// Helper function to get price range by ticker
const getPriceRangeByTicker = (data) => {
  const groupedData = groupByCategory(data);
  return Object.keys(groupedData).map(ticker => {
    const items = groupedData[ticker];
    const maxPrice = Math.max(...items.map(item => parseFloat(item.maxPrice)));
    const minPrice = Math.min(...items.map(item => parseFloat(item.minPrice)));
    return { ticker, maxPrice, minPrice, range: maxPrice - minPrice };
  });
};

// Helper function to generate random historical data
const generateHistoricalData = (ticker, months = 12) => {
  const today = new Date();
  const data = [];

  // Find the current price for this ticker
  const tickerData = marketData.filter(item => item.ticker === ticker);
  const currentPrice = tickerData.length > 0
    ? parseFloat(tickerData[0].price)
    : 5000; // Default if not found

  // Generate random historical prices with a trend
  let price = currentPrice * 0.7; // Start at 70% of current price

  for (let i = months; i > 0; i--) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);

    // Add some randomness but maintain an upward trend
    const randomFactor = 0.95 + Math.random() * 0.1; // 0.95 to 1.05
    price = price * randomFactor;

    data.push({
      date: date.toISOString().slice(0, 7), // YYYY-MM format
      price: price
    });
  }

  // Ensure the last point is the current price
  data.push({
    date: today.toISOString().slice(0, 7),
    price: currentPrice
  });

  return data;
};

// Helper function to categorize commodities
const categorizeItems = (data) => {
  const categories = {
    'Grains': ['Wheat', 'Rice', 'Maize', 'Jowar(Sorghum)', 'Paddy(Dhan)(Common)'],
    'Pulses': ['Bengal Gram(Gram)(Whole)', 'Black Gram (Urd Beans)(Whole)'],
    'Oilseeds': ['Groundnut', 'Sesamum(Sesame,Gingelly,Til)', 'Mustard', 'Soyabean'],
    'Fruits': ['Apple', 'Orange', 'Banana', 'Mango', 'Pineapple', 'Grapes'],
    'Vegetables': ['Onion', 'Potato', 'Tomato']
  };

  // Create a reverse mapping
  const itemToCategory = {};
  Object.entries(categories).forEach(([category, items]) => {
    items.forEach(item => {
      itemToCategory[item] = category;
    });
  });

  return {
    categories,
    itemToCategory,
    getCategoryForItem: (item) => itemToCategory[item] || 'Other'
  };
};

const RealTimeMarket = () => {
  const { t } = useTranslation();
  const [selectedTicker, setSelectedTicker] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [historicalData, setHistoricalData] = useState([]);
  const [marketInsights, setMarketInsights] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'descending' });
  const [chartSize, setChartSize] = useState('medium');
  const [marketTrends] = useState({
    weeklyChange: (Math.random() * 10 - 5).toFixed(2),
    monthlyChange: (Math.random() * 15 - 5).toFixed(2),
    yearlyChange: (Math.random() * 25 - 5).toFixed(2)
  });

  // Get unique tickers and categories
  const { categories, itemToCategory } = useMemo(() => categorizeItems(marketData), []);

  const uniqueTickers = useMemo(() => {
    if (selectedCategory === 'All') {
      return [...new Set(marketData.map(item => item.ticker))];
    } else {
      return categories[selectedCategory] || [];
    }
  }, [selectedCategory, categories]);

  const allCategories = useMemo(() => ['All', ...Object.keys(categories)], [categories]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTicker(''); // Reset ticker when category changes
    setFilteredData([]);
  };

  // Handle ticker change
  const handleTickerChange = (event) => {
    setSelectedTicker(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const result = marketData.filter(item => item.ticker === selectedTicker);
      setFilteredData(result);

      // Generate historical data for the selected ticker
      const history = generateHistoricalData(selectedTicker);
      setHistoricalData(history);

      // Generate market insights
      generateMarketInsights(selectedTicker);

      setIsLoading(false);
    }, 800);
  };

  // Generate market insights
  const generateMarketInsights = (ticker) => {

  // Calculate market statistics


    const tickerData = marketData.filter(item => item.ticker === ticker);
    if (tickerData.length === 0) return;

    // Calculate average prices
    const avgPrice = tickerData.reduce((sum, item) => sum + parseFloat(item.price), 0) / tickerData.length;
    const avgMaxPrice = tickerData.reduce((sum, item) => sum + parseFloat(item.maxPrice), 0) / tickerData.length;
    const avgMinPrice = tickerData.reduce((sum, item) => sum + parseFloat(item.minPrice), 0) / tickerData.length;

    // Find highest and lowest markets
    const highestMarket = tickerData.reduce((prev, current) =>
      parseFloat(prev.price) > parseFloat(current.price) ? prev : current);

    const lowestMarket = tickerData.reduce((prev, current) =>
      parseFloat(prev.price) < parseFloat(current.price) ? prev : current);

    // Calculate price volatility (max range as percentage of average price)
    const priceRanges = tickerData.map(item =>
      parseFloat(item.maxPrice) - parseFloat(item.minPrice));

    const maxRange = Math.max(...priceRanges);
    const volatility = (maxRange / avgPrice) * 100;

    // Generate a random trend direction and percentage
    const trendDirection = Math.random() > 0.5 ? 'up' : 'down';
    const trendPercentage = (Math.random() * 5).toFixed(2);

    // Generate a random forecast
    const forecastDirection = Math.random() > 0.5 ? 'increase' : 'decrease';
    const forecastPercentage = (Math.random() * 8).toFixed(2);

    setMarketInsights({
      ticker,
      avgPrice,
      avgMaxPrice,
      avgMinPrice,
      highestMarket,
      lowestMarket,
      volatility,
      trendDirection,
      trendPercentage,
      forecastDirection,
      forecastPercentage,
      marketCount: tickerData.length,
      category: itemToCategory[ticker] || 'Other'
    });
  };

  // Process data for charts
  const pricesData = useMemo(() => {
    return filteredData.map(item => ({
      market: item.market,
      maxPrice: parseFloat(item.maxPrice),
      minPrice: parseFloat(item.minPrice),
      date: item.date ? new Date(item.date) : new Date(),
      price: item.price ? parseFloat(item.price) : 0,
    }));
  }, [filteredData]);

  // Bar Chart Data
  const barChartData = {
    labels: pricesData.map(item => item.market),
    datasets: [
      {
        label: t('currentPrice'),
        data: pricesData.map(item => item.price),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 16,
        order: 1
      },
      {
        label: t('maxPrice'),
        data: pricesData.map(item => item.maxPrice),
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 16,
        order: 2
      },
      {
        label: t('minPrice'),
        data: pricesData.map(item => item.minPrice),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 16,
        order: 3
      }
    ],
  };

  // Pie Chart Data for market distribution
  const pieChartData = {
    labels: pricesData.map(item => item.market),
    datasets: [
      {
        label: t('marketShare'),
        data: pricesData.map(item => item.price),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(250, 204, 21, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(99, 102, 241, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(250, 204, 21, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(99, 102, 241, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 15,
      },
    ],
  };

  // Doughnut Chart Data for price range
  const doughnutChartData = {
    labels: pricesData.map(item => item.market),
    datasets: [
      {
        label: t('priceRange'),
        data: pricesData.map(item => item.maxPrice - item.minPrice),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(250, 204, 21, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(99, 102, 241, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(250, 204, 21, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(99, 102, 241, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 15,
        cutout: '70%'
      },
    ],
  };

  // Historical Price Trends Data
  const lineChartData = {
    labels: historicalData.map(item => item.date),
    datasets: [
      {
        label: t('historicalPriceTrends'),
        data: historicalData.map(item => item.price),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  // Calculate market statistics
  const marketStats = useMemo(() => {
    // Group all data by category
    const groupedByCategory = marketData.reduce((acc, item) => {
      const category = itemToCategory[item.ticker] || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    // Calculate stats for each category
    const categoryStats = Object.entries(groupedByCategory).map(([category, items]) => {
      const totalItems = items.length;
      const avgPrice = items.reduce((sum, item) => sum + parseFloat(item.price), 0) / totalItems;
      const maxPrice = Math.max(...items.map(item => parseFloat(item.maxPrice)));
      const minPrice = Math.min(...items.map(item => parseFloat(item.minPrice)));
      const volatility = ((maxPrice - minPrice) / avgPrice) * 100;

      return {
        category,
        totalItems,
        avgPrice,
        maxPrice,
        minPrice,
        priceRange: maxPrice - minPrice,
        volatility
      };
    });

    // Calculate overall stats
    const totalProducts = marketData.length;
    const uniqueCommodities = new Set(marketData.map(item => item.ticker)).size;
    const uniqueMarkets = new Set(marketData.map(item => item.market)).size;
    const highestPricedCommodity = [...new Set(marketData.map(item => item.ticker))]
      .map(ticker => {
        const items = marketData.filter(item => item.ticker === ticker);
        const avgPrice = items.reduce((sum, item) => sum + parseFloat(item.price), 0) / items.length;
        return { ticker, avgPrice };
      })
      .sort((a, b) => b.avgPrice - a.avgPrice)[0];

    const lowestPricedCommodity = [...new Set(marketData.map(item => item.ticker))]
      .map(ticker => {
        const items = marketData.filter(item => item.ticker === ticker);
        const avgPrice = items.reduce((sum, item) => sum + parseFloat(item.price), 0) / items.length;
        return { ticker, avgPrice };
      })
      .sort((a, b) => a.avgPrice - b.avgPrice)[0];

    return {
      categoryStats,
      totalProducts,
      uniqueCommodities,
      uniqueMarkets,
      highestPricedCommodity,
      lowestPricedCommodity
    };
  }, [itemToCategory]);

  // Category Comparison Chart Data
  const categoryComparisonData = useMemo(() => {
    const stats = marketStats.categoryStats || [];
    return {
      labels: stats.map(item => item.category),
      datasets: [
        {
          label: t('averagePrice'),
          data: stats.map(item => item.avgPrice),
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 16,
        },
        {
          label: t('priceRange'),
          data: stats.map(item => item.priceRange),
          backgroundColor: 'rgba(168, 85, 247, 0.7)',
          borderColor: 'rgba(168, 85, 247, 1)',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 16,
        },
        {
          label: t('volatility'),
          data: stats.map(item => item.volatility),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 16,
          // Use a secondary y-axis for volatility
          yAxisID: 'y1',
        }
      ]
    };
  }, [marketStats, t]);

  // Radar Chart Data for market comparison
  const radarChartData = {
    labels: ['Price', 'Max Price', 'Min Price', 'Price Range', 'Volatility'],
    datasets: pricesData.map((item, index) => {
      const colors = [
        'rgba(59, 130, 246, 0.7)',
        'rgba(34, 197, 94, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(250, 204, 21, 0.7)',
        'rgba(168, 85, 247, 0.7)',
      ];

      const borderColors = [
        'rgba(59, 130, 246, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(250, 204, 21, 1)',
        'rgba(168, 85, 247, 1)',
      ];

      const colorIndex = index % colors.length;

      // Calculate normalized values (0-100 scale)
      const maxPriceInData = Math.max(...pricesData.map(d => d.maxPrice));
      const normalizedPrice = (item.price / maxPriceInData) * 100;
      const normalizedMaxPrice = (item.maxPrice / maxPriceInData) * 100;
      const normalizedMinPrice = (item.minPrice / maxPriceInData) * 100;
      const priceRange = item.maxPrice - item.minPrice;
      const maxRange = Math.max(...pricesData.map(d => d.maxPrice - d.minPrice));
      const normalizedRange = (priceRange / maxRange) * 100;
      const volatility = (priceRange / item.price) * 100;
      const maxVolatility = Math.max(...pricesData.map(d => (d.maxPrice - d.minPrice) / d.price * 100));
      const normalizedVolatility = (volatility / maxVolatility) * 100;

      return {
        label: item.market,
        data: [
          normalizedPrice,
          normalizedMaxPrice,
          normalizedMinPrice,
          normalizedRange,
          normalizedVolatility
        ],
        backgroundColor: colors[colorIndex],
        borderColor: borderColors[colorIndex],
        borderWidth: 1,
        pointBackgroundColor: borderColors[colorIndex],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: borderColors[colorIndex],
        pointBorderWidth: 1,
        pointRadius: 3,
      };
    }),
  };

  // Data Table Columns
  const columns = [
    { header: t('market'), accessor: 'market' },
    { header: t('date'), accessor: 'date' },
    { header: t('maxPrice'), accessor: 'maxPrice' },
    { header: t('minPrice'), accessor: 'minPrice' },
    { header: t('price'), accessor: 'price' },
    { header: t('priceRange'), accessor: 'priceRange' },
  ];

  // Function to format data values
  const formatValue = (value, accessor) => {
    if (accessor === 'date') {
      return value instanceof Date ? value.toLocaleDateString() : 'N/A';
    }
    if (accessor === 'priceRange') {
      const item = filteredData.find(i => i.market === value.market);
      if (!item) return 'N/A';
      const range = parseFloat(item.maxPrice) - parseFloat(item.minPrice);
      return `₹${range.toFixed(2)}`;
    }
    return typeof value === 'number' ? `₹${value.toFixed(2)}` : value;
  };

  // Create a component for stat cards
  const StatCard = ({ title, value, icon, trend, trendValue, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-600 text-blue-100",
      green: "bg-green-600 text-green-100",
      red: "bg-red-600 text-red-100",
      purple: "bg-purple-600 text-purple-100",
      yellow: "bg-yellow-600 text-yellow-100",
    };

    const bgClass = colorClasses[color] || colorClasses.blue;

    return (
      <div className={`${bgClass} rounded-lg p-4 shadow-lg flex flex-col justify-between h-full`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium opacity-80">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="text-2xl opacity-80">{icon}</div>
        </div>
        {trend && trendValue && (
          <div className="mt-3 flex items-center text-sm">
            {trend === 'up' ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
            <span>{trendValue}%</span>
            <span className="ml-1 opacity-80">{trend === 'up' ? t('increase') : t('decrease')}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white">
      <div className="flex-grow p-4 md:p-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">
              {t('realTimeMarket')}
            </h1>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                  className="flex items-center px-4 py-2 bg-gray-800 rounded-md border border-gray-700 hover:bg-gray-700"
                >
                  <FiFilter className="mr-2" />
                  {t('categories')}
                </button>

                {showCategoryFilter && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700">
                    {allCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleCategorySelect(category);
                          setShowCategoryFilter(false);
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                          selectedCategory === category ? 'bg-gray-700' : ''
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-row gap-2">
                <select
                  value={selectedTicker}
                  onChange={handleTickerChange}
                  className="px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>{t('selectCommodity')}</option>
                  {uniqueTickers.map((ticker, index) => (
                    <option key={index} value={ticker}>
                      {ticker}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                  {t('submit')}
                </button>
              </form>
            </div>
          </div>

          {/* Market Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title={t('totalCommodities')}
              value={marketStats.uniqueCommodities}
              icon={<FiPackage />}
              color="blue"
            />
            <StatCard
              title={t('totalMarkets')}
              value={marketStats.uniqueMarkets}
              icon={<FiMapPin />}
              color="green"
            />
            <StatCard
              title={t('highestPricedCommodity')}
              value={`${marketStats.highestPricedCommodity?.ticker || ''} (₹${marketStats.highestPricedCommodity?.avgPrice.toFixed(2) || ''})`}
              icon={<HiOutlineCurrencyRupee />}
              color="purple"
            />
            <StatCard
              title={t('marketTrend')}
              value={t('lastMonth')}
              icon={<BsGraphUp />}
              trend={marketTrends.monthlyChange > 0 ? 'up' : 'down'}
              trendValue={Math.abs(marketTrends.monthlyChange)}
              color={marketTrends.monthlyChange > 0 ? "green" : "red"}
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex overflow-x-auto mb-6 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'overview'
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('overview')}
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'charts'
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('charts')}
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'data'
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('dataTable')}
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'insights'
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('marketInsights')}
            </button>
          </div>

          {/* Chart Size Controls */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center bg-gray-800 rounded-md p-1">
              <button
                onClick={() => setChartSize('small')}
                className={`px-3 py-1 text-sm rounded-md ${
                  chartSize === 'small' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                {t('small')}
              </button>
              <button
                onClick={() => setChartSize('medium')}
                className={`px-3 py-1 text-sm rounded-md ${
                  chartSize === 'medium' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                {t('medium')}
              </button>
              <button
                onClick={() => setChartSize('large')}
                className={`px-3 py-1 text-sm rounded-md ${
                  chartSize === 'large' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                {t('large')}
              </button>
            </div>
          </div>

          {/* Main Content Area with Tabs */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Category Overview */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">
                    {t('categoryOverview')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marketStats.categoryStats?.map((category, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4 shadow">
                        <h3 className="text-lg font-medium text-white mb-2">{category.category}</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">{t('products')}</p>
                            <p className="font-medium">{category.totalItems}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">{t('avgPrice')}</p>
                            <p className="font-medium">₹{category.avgPrice.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">{t('priceRange')}</p>
                            <p className="font-medium">₹{category.priceRange.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">{t('volatility')}</p>
                            <p className="font-medium">{category.volatility.toFixed(2)}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Comparison Chart */}
                <div className={`mb-8 h-${chartSize === 'small' ? '64' : chartSize === 'medium' ? '80' : '96'}`}>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">
                    {t('categoryComparison')}
                  </h2>
                  <Bar
                    data={categoryComparisonData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              if (context.dataset.label === t('volatility')) {
                                return `${context.dataset.label}: ${context.raw.toFixed(2)}%`;
                              }
                              return `${context.dataset.label}: ₹${context.raw.toFixed(2)}`;
                            },
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: t('price'),
                            color: 'white',
                          },
                        },
                        y1: {
                          beginAtZero: true,
                          position: 'right',
                          title: {
                            display: true,
                            text: t('volatilityPercentage'),
                            color: 'white',
                          },
                          grid: {
                            drawOnChartArea: false,
                          },
                        },
                      },
                    }}
                  />
                </div>

                {/* Market Trends */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">
                    {t('marketTrends')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{t('weeklyTrend')}</h3>
                        {marketTrends.weeklyChange > 0 ? (
                          <FiTrendingUp className="text-green-400 text-xl" />
                        ) : (
                          <FiTrendingDown className="text-red-400 text-xl" />
                        )}
                      </div>
                      <p className={`text-2xl font-bold ${marketTrends.weeklyChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {marketTrends.weeklyChange > 0 ? '+' : ''}{marketTrends.weeklyChange}%
                      </p>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{t('monthlyTrend')}</h3>
                        {marketTrends.monthlyChange > 0 ? (
                          <FiTrendingUp className="text-green-400 text-xl" />
                        ) : (
                          <FiTrendingDown className="text-red-400 text-xl" />
                        )}
                      </div>
                      <p className={`text-2xl font-bold ${marketTrends.monthlyChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {marketTrends.monthlyChange > 0 ? '+' : ''}{marketTrends.monthlyChange}%
                      </p>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{t('yearlyTrend')}</h3>
                        {marketTrends.yearlyChange > 0 ? (
                          <FiTrendingUp className="text-green-400 text-xl" />
                        ) : (
                          <FiTrendingDown className="text-red-400 text-xl" />
                        )}
                      </div>
                      <p className={`text-2xl font-bold ${marketTrends.yearlyChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {marketTrends.yearlyChange > 0 ? '+' : ''}{marketTrends.yearlyChange}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Charts Tab */}
            {activeTab === 'charts' && filteredData.length > 0 && (
              <div className="space-y-8">
                {/* Price Comparison Bar Chart */}
                <div className={`h-${chartSize === 'small' ? '64' : chartSize === 'medium' ? '80' : '96'}`}>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                    {t('priceComparison')}
                  </h2>
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.dataset.label}: ₹${context.raw.toFixed(2)}`,
                          },
                        },
                      },
                      scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: t('price'),
                            color: 'white',
                          },
                        },
                      },
                    }}
                  />
                </div>

                {/* Historical Price Trends */}
                <div className={`h-${chartSize === 'small' ? '64' : chartSize === 'medium' ? '80' : '96'}`}>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                    {t('historicalPriceTrends')}
                  </h2>
                  <Line
                    data={lineChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `Price: ₹${context.raw.toFixed(2)}`,
                          },
                        },
                      },
                      scales: {
                        x: {
                          type: 'category',
                          title: {
                            display: true,
                            text: t('date'),
                            color: 'white',
                          },
                        },
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: t('price'),
                            color: 'white',
                          },
                        },
                      },
                    }}
                  />
                </div>

                {/* Market Share Pie Chart */}
                <div className={`h-${chartSize === 'small' ? '64' : chartSize === 'medium' ? '80' : '96'}`}>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                    {t('marketShare')}
                  </h2>
                  <Pie
                    data={pieChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.label}: ₹${context.raw.toFixed(2)}`,
                          },
                        },
                      },
                    }}
                  />
                </div>

                {/* Market Comparison Radar Chart */}
                <div className={`h-${chartSize === 'small' ? '64' : chartSize === 'medium' ? '80' : '96'}`}>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                    {t('marketComparison')}
                  </h2>
                  <Radar
                    data={radarChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)}`,
                          },
                        },
                      },
                      scales: {
                        r: {
                          angleLines: {
                            color: 'rgba(255, 255, 255, 0.2)',
                          },
                          grid: {
                            color: 'rgba(255, 255, 255, 0.2)',
                          },
                          pointLabels: {
                            color: 'white',
                          },
                          ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            backdropColor: 'transparent',
                          },
                        },
                      },
                    }}
                  />
                </div>

                {/* Price Range Doughnut Chart */}
                <div className={`h-${chartSize === 'small' ? '64' : chartSize === 'medium' ? '80' : '96'}`}>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                    {t('priceRange')}
                  </h2>
                  <Doughnut
                    data={doughnutChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.label}: ₹${context.raw.toFixed(2)}`,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}

            {/* Data Table Tab */}
            {activeTab === 'data' && filteredData.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-green-400 mb-4">
                  {t('dataTable')}
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-700">
                    <thead>
                      <tr className="bg-gray-700">
                        {columns.map((col, index) => (
                          <th
                            key={index}
                            className="border border-gray-600 p-3 text-left cursor-pointer hover:bg-gray-600"
                            onClick={() => {
                              const direction =
                                sortConfig.key === col.accessor && sortConfig.direction === 'ascending'
                                  ? 'descending'
                                  : 'ascending';
                              setSortConfig({ key: col.accessor, direction });
                            }}
                          >
                            <div className="flex items-center">
                              {col.header}
                              {sortConfig.key === col.accessor && (
                                <span className="ml-1">
                                  {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData
                        .sort((a, b) => {
                          if (!sortConfig.key) return 0;

                          const aValue = a[sortConfig.key];
                          const bValue = b[sortConfig.key];

                          if (typeof aValue === 'string' && typeof bValue === 'string') {
                            return sortConfig.direction === 'ascending'
                              ? aValue.localeCompare(bValue)
                              : bValue.localeCompare(aValue);
                          }

                          const aNum = parseFloat(aValue);
                          const bNum = parseFloat(bValue);

                          return sortConfig.direction === 'ascending'
                            ? aNum - bNum
                            : bNum - aNum;
                        })
                        .map((item, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-700">
                            {columns.map((col, colIndex) => (
                              <td
                                key={colIndex}
                                className="border border-gray-600 p-3"
                              >
                                {formatValue(item[col.accessor], col.accessor)}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Market Insights Tab */}
            {activeTab === 'insights' && marketInsights.ticker && (
              <div>
                <h2 className="text-2xl font-semibold text-green-400 mb-6">
                  {t('marketInsightsFor')} {marketInsights.ticker}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-700 rounded-lg p-5 shadow">
                    <h3 className="text-xl font-medium mb-4 flex items-center">
                      <FiDollarSign className="mr-2" /> {t('priceAnalysis')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('averagePrice')}:</span>
                        <span className="font-medium">₹{marketInsights.avgPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('averageMaxPrice')}:</span>
                        <span className="font-medium">₹{marketInsights.avgMaxPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('averageMinPrice')}:</span>
                        <span className="font-medium">₹{marketInsights.avgMinPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('priceVolatility')}:</span>
                        <span className="font-medium">{marketInsights.volatility.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-5 shadow">
                    <h3 className="text-xl font-medium mb-4 flex items-center">
                      <FiMapPin className="mr-2" /> {t('marketHighlights')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('totalMarkets')}:</span>
                        <span className="font-medium">{marketInsights.marketCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('highestPricedMarket')}:</span>
                        <span className="font-medium">{marketInsights.highestMarket.market} (₹{parseFloat(marketInsights.highestMarket.price).toFixed(2)})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('lowestPricedMarket')}:</span>
                        <span className="font-medium">{marketInsights.lowestMarket.market} (₹{parseFloat(marketInsights.lowestMarket.price).toFixed(2)})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('category')}:</span>
                        <span className="font-medium">{marketInsights.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-5 shadow">
                    <h3 className="text-xl font-medium mb-4 flex items-center">
                      <FiTrendingUp className="mr-2" /> {t('marketTrends')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{t('recentTrend')}:</span>
                        <div className="flex items-center">
                          {marketInsights.trendDirection === 'up' ? (
                            <BsArrowUpRight className="text-green-400 mr-1" />
                          ) : (
                            <BsArrowDownRight className="text-red-400 mr-1" />
                          )}
                          <span className={marketInsights.trendDirection === 'up' ? 'text-green-400' : 'text-red-400'}>
                            {marketInsights.trendPercentage}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-gray-400 mb-2">{t('priceDistribution')}:</h4>
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>₹{marketInsights.avgMinPrice.toFixed(0)}</span>
                          <span>₹{marketInsights.avgPrice.toFixed(0)}</span>
                          <span>₹{marketInsights.avgMaxPrice.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-5 shadow">
                    <h3 className="text-xl font-medium mb-4 flex items-center">
                      <BsInfoCircle className="mr-2" /> {t('marketForecast')}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-300 mb-3">
                        {t('basedOnCurrentTrends')}, {marketInsights.ticker} {t('isPredictedTo')}
                        {marketInsights.forecastDirection === 'increase' ? t('increase') : t('decrease')}
                        {t('byApproximately')} {marketInsights.forecastPercentage}% {t('inTheComingWeeks')}.
                      </p>
                      <div className="flex items-center mt-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800">
                          {marketInsights.forecastDirection === 'increase' ? (
                            <FiTrendingUp className="text-green-400 text-xl" />
                          ) : (
                            <FiTrendingDown className="text-red-400 text-xl" />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">
                            {marketInsights.forecastDirection === 'increase' ? t('bullishOutlook') : t('bearishOutlook')}
                          </p>
                          <p className="text-sm text-gray-400">{t('nextThreeMonths')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-5 shadow mb-6">
                  <h3 className="text-xl font-medium mb-4">{t('recommendedActions')}</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{marketInsights.forecastDirection === 'increase' ? t('considerBuying') : t('considerSelling')} {marketInsights.ticker}</li>
                    <li>{t('monitorPriceVolatility')}</li>
                    <li>{t('compareWithOtherMarkets')}</li>
                    <li>{t('trackSeasonalTrends')}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* No Data Selected State */}
            {filteredData.length === 0 && activeTab !== 'overview' && (
              <div className="text-center py-12">
                <FiBarChart2 className="mx-auto text-5xl text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-400 mb-2">{t('noDataSelected')}</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {t('pleaseSelectACommodity')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMarket;
