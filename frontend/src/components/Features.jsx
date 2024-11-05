import React from 'react';
import { FaSeedling, FaChartLine, FaCloudSun, FaUsers } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import 'animate.css/animate.min.css'; // Importing animate.css for animations

const features = [
  {
    icon: <FaSeedling size={40} />,
    title: 'Crop Recommendations',
    description: 'Get personalized recommendations for crops based on soil health, climate, and market trends.',
  },
  {
    icon: <FaChartLine size={40} />,
    title: 'Market Insights',
    description: 'Access real-time market data and price trends to make informed decisions about selling your produce.',
  },
  {
    icon: <FaCloudSun size={40} />,
    title: 'Weather Updates',
    description: 'Receive accurate and up-to-date weather forecasts to plan your farming activities effectively.',
  },
  {
    icon: <FaUsers size={40} />,
    title: 'Expert Consultation',
    description: 'Connect with agricultural experts and consultants for advice and support tailored to your needs.',
  },
];

export default function Features() {
  return (
    <section className="features py-12 px-6 md:py-24 md:px-12 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-300">Key Features</h2>
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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`feature-item bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition duration-1000 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="feature-icon mb-4 text-green-400">{feature.icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-green-300">{feature.title}</h3>
      <p className="text-gray-300">{feature.description}</p>
    </div>
  );
}
