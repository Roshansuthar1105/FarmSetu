import React, { useState } from 'react';
import MyNavbar from './MyNavbar';
import Footer from './Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is FarmSetu?",
      answer: "FarmSetu is a comprehensive agricultural platform that connects farmers with resources, markets, and expert knowledge to improve farming practices and profitability."
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Sign Up' button and filling out the registration form with your details. You'll need to provide your name, email, and create a password."
    },
    {
      question: "What services do you offer?",
      answer: "We offer a range of services including marketplace access, weather updates, crop advisory, real-time market prices, expert consultation, and community forums for knowledge sharing."
    },
    {
      question: "Is FarmSetu available in my region?",
      answer: "FarmSetu is currently expanding its services across various regions. Please check our coverage area page or contact our support team to confirm availability in your specific location."
    },
    {
      question: "How can I sell my products?",
      answer: "After creating a seller account, you can list your products by providing details like product description, pricing, and images. Our team will review and approve your listings."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-800 dark:bg-black">
      <MyNavbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-10 text-center">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-green-600 dark:border-green-700 rounded-lg overflow-hidden bg-gray-700 dark:bg-gray-900"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-green-100 dark:text-green-200 font-medium">
                  {faq.question}
                </span>
                <span className={`transform transition-transform duration-200 text-green-400 ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div 
                className={`px-6 py-4 bg-gray-600 dark:bg-gray-800 transition-all duration-200 ease-in-out ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                <p className="text-gray-200 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
