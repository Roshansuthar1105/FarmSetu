import React from 'react';
import { FaSeedling, FaChartLine, FaCloudSun, FaHandshake } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const features = [
  {
    icon: <FaSeedling size={40} className="text-green-400" />,
    titleKey: 'features.cropManagement.title',
    descriptionKey: 'features.cropManagement.description',
  },
  {
    icon: <FaChartLine size={40} className="text-blue-400" />,
    titleKey: 'features.marketInsights.title',
    descriptionKey: 'features.marketInsights.description',
  },
  {
    icon: <FaCloudSun size={40} className="text-yellow-400" />,
    titleKey: 'features.weatherUpdates.title',
    descriptionKey: 'features.weatherUpdates.description',
  },
  {
    icon: <FaHandshake size={40} className="text-purple-400" />,
    titleKey: 'features.expertConsultation.title',
    descriptionKey: 'features.expertConsultation.description',
  },
];

export default function ProductOverview() {
  const { t } = useTranslation();

  return (
    <section className="product-overview py-12 px-6 md:py-24 md:px-12 bg-green-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          {t('productOverview.title')}
        </h2>
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
  const { t } = useTranslation();

  return (
    <div
      className="feature-item bg-green-800 p-6 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105 hover:shadow-xl hover:rotate-2"
    >
      <div className="icon mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">{t(feature.titleKey)}</h3>
      <p className="text-green-200">{t(feature.descriptionKey)}</p>
    </div>
  );
}
