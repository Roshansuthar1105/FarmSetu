// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  const aboutLinks = [
    { to: '/mission', label: t('our_mission') },
    { to: '/team', label: t('meet_the_team') },
    { to: '/careers', label: t('careers') },
    { to: '/press', label: t('press_media') },
    { to: '/privacy', label: t('privacy_policy') },
    { to: '/faq', label: t('faqs') },
  ];
  const servicesLinks = [
    { to: '/form', label: t('crop_advice') },
    { to: '/farmermarketplace', label: t('market_trends') },
    { to: '/weather', label: t('weather_updates') },
    { to: '/chat', label: t('expert_consultation') },
    { to: '/resources', label: t('resources') },
  ];
  const usefulLinks = [
    { to: '/', label: t('home') },
    { to: '/profile', label: t('dashboard') },
    { to: '/pricing', label: t('pricing') },
    { to: '/contact', label: t('contact_us') },
    { to: '/news', label: t('news') },
  ];
  return (
    <footer className="bg-green-600 text-white py-8 border-t-2 border-green-800">
      <div className="container mx-auto flex flex-wrap justify-between p-2">
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2 text-center">{t('about_us')}</h2>
          <ul className='list-image-[url(logo.svg)] list-inside' >
            {aboutLinks.map(({ to, label }) => (
              <li className="mb-2" key={to}><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
           </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2 text-center">{t('services')}</h2>
          <ul className='list-image-[url(logo.svg)] list-inside'>
            {servicesLinks.map(({ to, label }) => (
              <li className="mb-2" key={to}><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2 text-center">{t('quick_links')}</h2>
          <ul className='list-image-[url(logo.svg)] list-inside'>
            {usefulLinks.map(({ to, label }) => (
              <li className="mb-2" key={to} ><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2 text-center">{t('contact_us')}</h2>
          <p>{t('contact_info.address')}</p>
          <p>{t('contact_info.phone')}</p>
          <p>{t('contact_info.email')}</p>
          <p>{t('contact_info.fax')}</p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-white to-transparent my-6 h-[1px] w-full opacity-30" />
      <div className="text-center mt-6">
        <p>&copy;{t('footer_rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
