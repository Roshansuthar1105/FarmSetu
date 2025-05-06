// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFax,
  FaSeedling,
  FaChevronRight
} from 'react-icons/fa';
import farm from '../assets/farm.svg';
import setu from '../assets/setu.svg';

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

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaYoutube />, url: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-green-900 text-white">
      {/* Top wave separator */}
      <div className="w-full overflow-hidden ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-gray-900">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8">
        {/* Top section with logo and newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center mb-4 bg-white rounded p-2 w-48">
              <img src={farm} alt="Farm" className="h-10 w-auto" />
              <img src={setu} alt="Setu" className="h-10 w-auto ml-[-10px]" />
            </div>
            <p className="text-gray-300 max-w-md text-center md:text-left text-sm">
              Empowering farmers with technology, connecting communities, and promoting sustainable agriculture for a better future.
            </p>
          </div>

          <div className="w-full sm:w-96 md:w-auto">
            <h3 className="text-lg font-semibold mb-3 text-green-300 text-center md:text-left">Subscribe to our Newsletter</h3>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md sm:rounded-r-none bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-green-500 w-full mb-2 sm:mb-0"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md sm:rounded-l-none transition duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main links section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-400 border-b border-green-800 pb-2">{t('about_us')}</h2>
            <ul className="space-y-2">
              {aboutLinks.map(({ to, label }) => (
                <li className="transition-transform duration-300 hover:translate-x-1" key={to}>
                  <Link to={to} className="flex items-center text-gray-300 hover:text-green-300">
                    <FaChevronRight className="mr-2 text-xs text-green-500" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-400 border-b border-green-800 pb-2">{t('services')}</h2>
            <ul className="space-y-2">
              {servicesLinks.map(({ to, label }) => (
                <li className="transition-transform duration-300 hover:translate-x-1" key={to}>
                  <Link to={to} className="flex items-center text-gray-300 hover:text-green-300">
                    <FaChevronRight className="mr-2 text-xs text-green-500" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-400 border-b border-green-800 pb-2">{t('quick_links')}</h2>
            <ul className="space-y-2">
              {usefulLinks.map(({ to, label }) => (
                <li className="transition-transform duration-300 hover:translate-x-1" key={to}>
                  <Link to={to} className="flex items-center text-gray-300 hover:text-green-300">
                    <FaChevronRight className="mr-2 text-xs text-green-500" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-400 border-b border-green-800 pb-2">{t('contact_us')}</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-green-500 mt-1 mr-3" />
                <span className="text-gray-300">{t('contact_info.address')}</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-green-500 mr-3" />
                <span className="text-gray-300">{t('contact_info.phone')}</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-green-500 mr-3" />
                <span className="text-gray-300">{t('contact_info.email')}</span>
              </li>
              <li className="flex items-center">
                <FaFax className="text-green-500 mr-3" />
                <span className="text-gray-300">{t('contact_info.fax')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social media links */}
        <div className="py-6 px-4 sm:px-6 bg-gray-800 bg-opacity-50 rounded-lg mb-8">
          <h3 className="text-center text-lg font-semibold mb-4 text-green-300">Follow Us</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-900/30"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30 my-6" />

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
            <Link to="/privacy" className="hover:text-green-300 transition-colors duration-300 flex items-center">
              <FaSeedling className="mr-1 text-green-500" /> Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/terms" className="hover:text-green-300 transition-colors duration-300 flex items-center">
              <FaSeedling className="mr-1 text-green-500" /> Terms of Service
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/faq" className="hover:text-green-300 transition-colors duration-300 flex items-center">
              <FaSeedling className="mr-1 text-green-500" /> FAQs
            </Link>
          </div>
          <p className="mb-2">&copy; {new Date().getFullYear()} FarmSetu. All rights reserved.</p>
          <p className="text-xs text-gray-500">
            Designed with ❤️ for farmers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
