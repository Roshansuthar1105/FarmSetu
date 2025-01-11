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
    <section className="features py-12 px-6 md:py-24 md:px-12 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-300">
          {t('keyFeatures')}
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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useTranslation();

  return (
    <div
      ref={ref}
      className={`feature-item bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition duration-1000 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="feature-icon mb-4 text-green-400">{feature.icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-green-300">
        {t(feature.titleKey)}
      </h3>
      <p className="text-gray-300">{t(feature.descriptionKey)}</p>
    </div>
  );
}
