import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const localPricingPlans = [
  {
    title: 'Basic Plan',
    price: '₹1500/month',
    pricepermonth: 1500,
    features: [
      'Access to Agriculture Tools',
      'Market Insights & Trends',
      'Weekly Weather Updates',
      'Email Support',
    ],
    buttonText: 'Get Started',
    buttonColor: 'bg-green-600 hover:bg-green-900',
  },
  {
    title: 'Pro Plan',
    price: '₹3000/month',
    pricepermonth: 3000,
    features: [
      'All Basic Plan Features',
      'Advanced Crop Analytics',
      'Daily Market Insights',
      'Priority Email & Chat Support',
      'Expert Consultation Sessions',
    ],
    buttonText: 'Upgrade Now',
    buttonColor: 'bg-black hover:bg-gray-900',
    popular: true,
  },
  {
    title: 'Enterprise Plan',
    price: '₹5000/month',
    pricepermonth: 5000,
    features: [
      'All Pro Plan Features',
      'Custom Solutions & Integrations',
      'Dedicated Account Manager',
      '24/7 Support',
      'On-site Consultations',
    ],
    buttonText: 'Contact Us',
    buttonColor: 'bg-green-600 hover:bg-green-700',
  },
];

// Icon components defined separately
const BasicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 mx-auto text-green-400 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ProIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 mx-auto text-blue-400 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const EnterpriseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 mx-auto text-green-400 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// Map plan titles to icons
const planIcons = {
  'Basic Plan': <BasicIcon />,
  'Pro Plan': <ProIcon />,
  'Enterprise Plan': <EnterpriseIcon />,
};

export default function Pricing({ onSelectPlan, pricingPlans = localPricingPlans }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  console.log('onSelectPlan function in Pricing:', onSelectPlan);
  
  const handlePlanSelect = (plan) => {
    console.log('Plan selected:', plan);
    
    // Create a clean plan object without React elements for navigation
    const cleanPlan = {
      title: plan.title,
      price: plan.price,
      pricepermonth: plan.pricepermonth,
      features: plan.features,
      buttonText: plan.buttonText,
      buttonColor: plan.buttonColor,
      popular: plan.popular || false
    };
    
    if (onSelectPlan && typeof onSelectPlan === 'function') {
      onSelectPlan(cleanPlan);
    } else {
      console.warn('onSelectPlan is not available. Navigating to payment page...');
      // Navigate to payment page with clean plan data (no React elements)
      navigate('/payment', { state: { selectedPlan: cleanPlan } });
    }
  };

  const getPlanIcon = (planTitle) => {
    return planIcons[planTitle] || <BasicIcon />;
  };

  return (  
    <section className="pricing py-16 px-6 md:py-24 md:px-12 bg-transparent dark:from-gray-900 dark:to-gray-800 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300 dark:from-green-200 dark:to-blue-200">
              {t('pricingPlans.title', 'Choose a Plan')}
            </span>
          </h2>
          <p className="text-gray-300 dark:text-gray-200 max-w-2xl mx-auto text-lg">
            {t('pricingPlans.subtitle', 'Choose the perfect plan for your needs. Upgrade or downgrade at any time.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.popular ? 'md:scale-105 md:-translate-y-2 z-10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg z-20">
                  {t('pricingPlans.popularBadge', 'MOST POPULAR')}
                </div>
              )}

              {plan.popular ? (
                <div className="absolute inset-0 p-0.5 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-pulse">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900"></div>
                </div>
              ) : null}

              <div className={`relative p-8 h-full flex flex-col bg-gradient-to-br ${
                plan.popular
                  ? 'from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900'
                  : 'from-green-800 to-green-900 dark:from-green-700 dark:to-green-800'
              } rounded-2xl shadow-xl border ${
                plan.popular
                  ? 'border-blue-500/30 dark:border-blue-400/30'
                  : 'border-green-700/30 dark:border-green-600/30'
              }`}>
                {getPlanIcon(plan.title)}
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.popular
                    ? 'text-blue-300 dark:text-blue-200'
                    : 'text-green-300 dark:text-green-200'
                }`}>
                  {t(plan.titleKey) || plan.title}
                </h3>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-white mb-2">{t(plan.priceKey) || plan.price}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-200">
                    {t('pricingPlans.billingCycle', 'per month, billed annually')}
                  </p>
                </div>
                <div className={`w-16 h-1 mb-6 rounded-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500'
                    : 'bg-gradient-to-r from-green-400 to-green-500'
                }`}></div>
                <ul className="mb-8 space-y-4 flex-grow">
                  {(t(plan.featuresKey, { returnObjects: true }) || plan.features).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className={`w-5 h-5 mt-0.5 mr-3 ${
                          plan.popular
                            ? 'text-blue-400 dark:text-blue-300'
                            : 'text-green-400 dark:text-green-300'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-200 dark:text-gray-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 px-6 rounded-xl text-white font-medium ${plan.buttonColor} shadow-lg transform hover:scale-105 transition-all duration-300`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {t(plan.buttonTextKey) || plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 dark:text-gray-200">
            {t('pricingPlans.guarantee', '30-day money-back guarantee. No questions asked.')}
          </p>
        </div>
      </div>
    </section>
  );
}