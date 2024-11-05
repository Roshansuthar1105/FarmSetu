// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2">About Us</h2>
          <ul>
            <li className="mb-2"><a href="#mission" className="hover:underline">Our Mission</a></li>
            <li className="mb-2"><a href="#team" className="hover:underline">Meet the Team</a></li>
            <li className="mb-2"><a href="#careers" className="hover:underline">Careers</a></li>
            <li className="mb-2"><a href="#press" className="hover:underline">Press & Media</a></li>
            <li className="mb-2"><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
            <li className="mb-2"><a href="#faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2">Services</h2>
          <ul>
            <li className="mb-2"><a href="#crop-advice" className="hover:underline">Crop Advice</a></li>
            <li className="mb-2"><a href="#market-trends" className="hover:underline">Market Trends</a></li>
            <li className="mb-2"><a href="#weather-updates" className="hover:underline">Weather Updates</a></li>
            <li className="mb-2"><a href="#expert-consultation" className="hover:underline">Expert Consultation</a></li>
            <li className="mb-2"><a href="#resources" className="hover:underline">Resources</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2">Useful Links</h2>
          <ul>
            <li className="mb-2"><a href="#home" className="hover:underline">Home</a></li>
            <li className="mb-2"><a href="#dashboard" className="hover:underline">Dashboard</a></li>
            <li className="mb-2"><a href="#pricing" className="hover:underline">Pricing</a></li>
            <li className="mb-2"><a href="#contact" className="hover:underline">Contact Us</a></li>
            <li className="mb-2"><a href="#blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h2 className="font-bold mb-2">Contact Us</h2>
          <p>Address: 456 Farm Road, AgriTown, AG 67890, USA</p>
          <p>Phone: +1 (345) 678-9012</p>
          <p>Email: support@agripulse.com</p>
          <p>Fax: +1 (345) 678-9013</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <p>&copy; 2024 All rights reserved by AgroTrend</p>
      </div>
    </footer>
  );
};

export default Footer;
