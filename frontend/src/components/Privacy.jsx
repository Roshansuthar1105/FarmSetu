import React from 'react';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-800 dark:bg-black">
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-10 text-center">
          {t('privacy_title')}
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-8 text-gray-300 dark:text-gray-400">
          <section>
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-500 mb-4">{t('privacy_section_1_title')}</h2>
            <p className="mb-4">
              {t('privacy_section_1_content')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('privacy_section_1_list_1')}</li>
              <li>{t('privacy_section_1_list_2')}</li>
              <li>{t('privacy_section_1_list_3')}</li>
              <li>{t('privacy_section_1_list_4')}</li>
              <li>{t('privacy_section_1_list_5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-500 mb-4">{t('privacy_section_2_title')}</h2>
            <p className="mb-4">
              {t('privacy_section_2_content')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('privacy_section_2_list_1')}</li>
              <li>{t('privacy_section_2_list_2')}</li>
              <li>{t('privacy_section_2_list_3')}</li>
              <li>{t('privacy_section_2_list_4')}</li>
              <li>{t('privacy_section_2_list_5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-500 mb-4">{t('privacy_section_3_title')}</h2>
            <p>
              {t('privacy_section_3_content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-500 mb-4">{t('privacy_section_4_title')}</h2>
            <p>
              {t('privacy_section_4_content')}
            </p>
          </section>
        </div>
      </div>
      
    </div>
  );
};

export default Privacy;
