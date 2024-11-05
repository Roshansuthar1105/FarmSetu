import React from 'react';
import { FaSeedling, FaChartLine, FaCloudSun, FaHandshake } from 'react-icons/fa';

const features = [
  {
    icon: <FaSeedling size={40} className="text-green-400" />,
    title: 'Crop Management',
    description: 'Get personalized advice and tools to manage your crops effectively and boost productivity.',
  },
  {
    icon: <FaChartLine size={40} className="text-blue-400" />,
    title: 'Market Insights',
    description: 'Access real-time market data, price trends, and forecasts to make informed selling decisions.',
  },
  {
    icon: <FaCloudSun size={40} className="text-yellow-400" />,
    title: 'Weather Updates',
    description: 'Stay updated with accurate and timely weather forecasts to plan your farming activities.',
  },
  {
    icon: <FaHandshake size={40} className="text-purple-400" />,
    title: 'Expert Consultation',
    description: 'Connect with agricultural experts for tailored advice and solutions to enhance your farming practices.',
  },
];

export default function ProductOverview() {
  return (
    <section className="product-overview py-12 px-6 md:py-24 md:px-12 bg-green-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Product Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }) {
  return (
    <div
      className="feature-item bg-green-800 p-6 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105 hover:shadow-xl hover:rotate-2"
    >
      <div className="icon mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
      <p className="text-green-200">{feature.description}</p>
    </div>
  );
}
