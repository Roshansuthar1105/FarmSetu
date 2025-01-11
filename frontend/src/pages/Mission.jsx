import React from 'react';
import { useTranslation } from 'react-i18next';

const Mission = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">{t('our_mission')}</h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-300 mb-6">
            {t('mission_description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">{t('empowering_farmers')}</h3>
              <p className="text-gray-600">
                {t('empowering_farmers_description')}
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">{t('sustainable_agriculture')}</h3>
              <p className="text-gray-600">
                {t('sustainable_agriculture_description')}
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">{t('innovation')}</h3>
              <p className="text-gray-600">
                {t('innovation_description')}
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">{t('community_support')}</h3>
              <p className="text-gray-600">
                {t('community_support_description')}
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            {t('join_us')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
