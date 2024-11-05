// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const aboutLinks = [
    { to: '/mission', label: 'Our Mission' },
    { to: '/team', label: 'Meet the Team' },
    { to: '/careers', label: 'Careers' },
    { to: '/press', label: 'Press & Media' },
  ];
  const servicesLinks = [
    { to: '/crop-advice', label: 'Crop Advice' },
    { to: '/market-trends', label: 'Market Trends' },
    { to: '/weather-updates', label: 'Weather Updates' },
    { to: '/expert-consultation', label: 'Expert Consultation' },
    { to: '/resources', label: 'Resources' },
  ];
  const usefulLinks = [
    { to: '/home', label: 'Home' },
    { to: '/profile', label: 'Dashboard' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/news', label: 'News' },
  ];
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2">About Us</h2>
          <ul>
            {aboutLinks.map(({ to, label }) => (
              <li className="mb-2"><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
            <li className="mb-2"><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li className="mb-2"><Link to="/faq" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2">Services</h2>
          <ul>
            {servicesLinks.map(({ to, label }) => (
              <li className="mb-2"><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2">Useful Links</h2>
          <ul>
            {usefulLinks.map(({ to, label }) => (
              <li className="mb-2"><Link to={to} className="hover:underline">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2">Contact Us</h2>
          <p>Address: 456 Farm Road, AgriTown, AG 67890, India</p>
          <p>Phone: +91 9876543210</p>
          <p>Email: support@farmsetu.com</p>
          <p>Fax: +91 9876543211</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <p>&copy; 2024 All rights reserved by FarmSetu</p>
      </div>
    </footer>
  );
};

export default Footer;
