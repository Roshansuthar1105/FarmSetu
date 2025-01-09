// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const aboutLinks = [
    { to: '/mission', label: 'Our Mission' },
    { to: '/team', label: 'Meet the Team' },
    { to: '/careers', label: 'Careers' },
    { to: '/press', label: 'Press & Media' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/faq', label: 'FAQs' },
  ];
  const servicesLinks = [
    { to: '/form', label: 'Crop Advice' },
    { to: '/farmermarketplace', label: 'Market Trends' },
    { to: '/weather', label: 'Weather Updates' },
    { to: '/chat', label: 'Expert Consultation' },
    { to: '/resources', label: 'Resources' },
  ];
  const usefulLinks = [
    { to: '/', label: 'Home' },
    { to: '/profile', label: 'Dashboard' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/news', label: 'News' },
  ];
  return (
    <footer className="bg-green-600 text-white py-8 border-t-2 border-green-800">
      <div className="container mx-auto flex flex-wrap justify-between p-2">
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2 text-center">About Us</h2>
          <ul className='list-image-[url(logo.svg)] list-inside' >
            {aboutLinks.map(({ to, label }) => (
              <li className="mb-2" key={to}><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
           </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2 text-center">Services</h2>
          <ul className='list-image-[url(logo.svg)] list-inside'>
            {servicesLinks.map(({ to, label }) => (
              <li className="mb-2" key={to}><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2 text-center">Quick Links</h2>
          <ul className='list-image-[url(logo.svg)] list-inside'>
            {usefulLinks.map(({ to, label }) => (
              <li className="mb-2" key={to} ><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2 text-center">Contact Us</h2>
          <p>Address: 456 Farm Road, FarmCity, AG 67890, India</p>
          <p>Phone: +91 9876543210</p>
          <p>Email: support@farmsetu.com</p>
          <p>Fax: +91 9876543211</p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-white to-transparent my-6 h-[1px] w-full opacity-30" />
      <div className="text-center mt-6">
        <p>&copy; 2024 All rights reserved by FarmSetu</p>
      </div>
    </footer>
  );
};

export default Footer;
