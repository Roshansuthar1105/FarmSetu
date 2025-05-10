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
    <section className="product-overview py-16 px-6 md:py-24 md:px-12 bg-gradient-to-b from-green-900 to-green-800 dark:from-green-800 dark:to-green-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {t('productOverview.title')}
          </h2>
          <p className="text-green-100 dark:text-green-50 max-w-2xl mx-auto text-lg">
            {t('productOverview.subtitle', 'Explore our comprehensive suite of tools designed to revolutionize your farming experience.')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
      className="feature-item bg-gradient-to-br from-green-700 to-green-800 dark:from-green-600 dark:to-green-700 p-8 rounded-2xl shadow-xl border border-green-600/30 dark:border-green-500/30 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-green-500/20 dark:hover:shadow-green-400/20 hover:-translate-y-1"
    >
      <div className="icon mb-6 bg-green-600/20 dark:bg-green-500/20 p-4 inline-block rounded-xl">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{t(feature.titleKey)}</h3>
      <p className="text-green-100 dark:text-green-50 leading-relaxed">{t(feature.descriptionKey)}</p>
    </div>
  );
}
