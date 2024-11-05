// src/components/MarketItem.jsx
import React from 'react';

const MarketItem = ({ ticker, market, maxPrice, minPrice }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md mb-4">
      <h3 className="text-xl font-bold text-green-600">{ticker}</h3>
      <p className="text-gray-600">{market}</p>
      <p className="text-gray-800">Max Price: ₹{maxPrice}</p>
      <p className="text-gray-800">Min Price: ₹{minPrice}</p>
    </div>
  );
};

export default MarketItem;
