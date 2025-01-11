import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: t('faq_1_question'),
      answer: t('faq_1_answer')
    },
    {
      question: t('faq_2_question'),
      answer: t('faq_2_answer')
    },
    {
      question: t('faq_3_question'),
      answer: t('faq_3_answer')
    },
    {
      question: t('faq_4_question'),
      answer: t('faq_4_answer')
    },
    {
      question: t('faq_5_question'),
      answer: t('faq_5_answer')
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-800 dark:bg-black">
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-10 text-center">
          {t('faq_title')}
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
      
    </div>
  );
};

export default FAQ;
