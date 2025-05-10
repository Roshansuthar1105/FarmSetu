import React from 'react';
import { FaSeedling, FaChartLine, FaCloudSun, FaUsers } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import 'animate.css/animate.min.css'; // Importing animate.css for animations

const features = [
  {
    icon: <FaSeedling size={40} />,
    titleKey: 'cropRecommendationsTitle',
    descriptionKey: 'cropRecommendationsDescription',
  },
  {
    icon: <FaChartLine size={40} />,
    titleKey: 'marketInsightsTitle',
    descriptionKey: 'marketInsightsDescription',
  },
  {
    icon: <FaCloudSun size={40} />,
    titleKey: 'weatherUpdatesTitle',
    descriptionKey: 'weatherUpdatesDescription',
  },
  {
    icon: <FaUsers size={40} />,
    titleKey: 'expertConsultationTitle',
    descriptionKey: 'expertConsultationDescription',
  },
];

export default function Features() {
  const { t } = useTranslation();
  return (
    <section className="features py-16 px-6 md:py-24 md:px-12 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300 dark:from-green-200 dark:to-blue-200">
              {t('keyFeatures')}
            </span>
          </h2>
          <p className="text-gray-300 dark:text-gray-200 max-w-2xl mx-auto text-lg">
            {t('featuresSubtitle', 'Discover the powerful tools and features that make our platform stand out.')}
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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useTranslation();

  return (
    <div
      ref={ref}
      className={`feature-item bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700/30 dark:border-gray-600/30 backdrop-blur-sm transform transition duration-1000 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } hover:shadow-green-500/10 dark:hover:shadow-green-400/10 hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="feature-icon mb-6 text-green-400 dark:text-green-300 bg-green-500/10 dark:bg-green-400/10 p-4 inline-block rounded-xl">{feature.icon}</div>
      <h3 className="text-xl font-bold mb-3 text-green-300 dark:text-green-200">
        {t(feature.titleKey)}
      </h3>
      <p className="text-gray-300 dark:text-gray-200 leading-relaxed">{t(feature.descriptionKey)}</p>
    </div>
  );
}
