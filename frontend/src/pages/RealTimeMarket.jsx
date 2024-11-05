import React, { useState } from 'react';
import marketData from '../data/marketData.json';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
Chart.register(...registerables);

const RealTimeMarket = () => {
  const [selectedTicker, setSelectedTicker] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleTickerChange = (event) => {
    setSelectedTicker(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = marketData.filter(item => item.ticker === selectedTicker);
    setFilteredData(result);
  };

  const uniqueTickers = [...new Set(marketData.map(item => item.ticker))];

  const pricesData = filteredData.map(item => ({
    market: item.market,
    maxPrice: parseFloat(item.maxPrice),
    minPrice: parseFloat(item.minPrice),
    date: item.date ? new Date(item.date) : new Date(), // Handle missing date
    price: item.price ? parseFloat(item.price) : 0, // Handle missing price
  }));

  // Bar Chart Data
  const barChartData = {
    labels: pricesData.map(item => item.market),
    datasets: [
      {
        label: 'Max Price',
        data: pricesData.map(item => item.maxPrice),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Min Price',
        data: pricesData.map(item => item.minPrice),
        backgroundColor: 'rgba(129, 199, 132, 0.6)',
        borderColor: 'rgba(129, 199, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: pricesData.map(item => item.market),
    datasets: [
      {
        label: 'Market Share',
        data: pricesData.map(item => item.maxPrice), // Example data
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(129, 199, 132, 0.6)',
          'rgba(34, 197, 94, 0.4)',
          'rgba(129, 199, 132, 0.4)',
          'rgba(34, 197, 94, 0.3)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(129, 199, 132, 1)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(129, 199, 132, 0.8)',
          'rgba(34, 197, 94, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Historical Price Trends Data
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Example months
    datasets: [
      {
        label: 'Historical Price',
        data: [120, 135, 125, 145, 155, 160, 150], // Example data
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Data Table Columns
  const columns = [
    { header: 'Market', accessor: 'market' },
    { header: 'Date', accessor: 'date' },
    { header: 'Max Price (₹)', accessor: 'maxPrice' },
    { header: 'Min Price (₹)', accessor: 'minPrice' },
    { header: 'Price (₹)', accessor: 'price' },
  ];

  // Function to format data values
  const formatValue = (value, isDate = false) => {
    if (isDate) {
      return value instanceof Date ? value.toLocaleDateString() : 'N/A';
    }
    return typeof value === 'number' ? `₹${value.toFixed(2)}` : value;
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white">
      <MyNavbar />
      <div className="flex-grow p-8 mt-16">
        <div className='flex flex-row mx-auto items-center justify-between w-full mb-4'>
        <h1 className="text-3xl font-bold cursor-default  transition duration-500 ease-in-out transform hover:scale-105">
          Real-Time Market Prices
        </h1>
        <form onSubmit={handleSubmit} className="my-2  flex flex-row items-center justify-between">
          {/* <label className="block mb-2 text-lg font-medium">Select Ticker:</label> */}
          <select
            value={selectedTicker}
            onChange={handleTickerChange}
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
          >
            <option value="" disabled>Select a ticker</option>
            {uniqueTickers.map((ticker, index) => (
              <option key={index} value={ticker}>
                {ticker}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className=" ml-2 w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>
        </div>
        {filteredData.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-8 ">
            {/* Bar Chart */}
            <div className="bg-gray-800 p-6 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                Price Comparison
              </h2>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
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
                    },
                  },
                }}
              />
            </div>

            {/* Historical Price Trends (Fake Data) */}
            <div className="bg-gray-800 p-6 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                Historical Price Trends
              </h2>
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
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
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-800 p-6 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                Market Share
              </h2>
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
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

            {/* Data Table */}
            <div className="bg-gray-800 p-6 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
                Data Table
              </h2>
              <table className="w-full border-collapse border border-gray-600">
                <thead>
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index} className="border border-gray-600 p-2">
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-600 p-2"
                        >
                          {formatValue(
                            item[col.accessor]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RealTimeMarket;
