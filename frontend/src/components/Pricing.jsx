import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const pricingPlans = [
  {
    titleKey: 'pricingPlans.basicPlan.title',
    priceKey: 'pricingPlans.basicPlan.price',
    featuresKey: 'pricingPlans.basicPlan.features',
    buttonTextKey: 'pricingPlans.buttonText.getStarted',
    buttonColor: 'bg-green-600 hover:bg-green-900',
  },
  {
    titleKey: 'pricingPlans.proPlan.title',
    priceKey: 'pricingPlans.proPlan.price',
    featuresKey: 'pricingPlans.proPlan.features',
    buttonTextKey: 'pricingPlans.buttonText.upgradeNow',
    buttonColor: 'bg-gray-900 hover:bg-gray-700',
  },
  {
    titleKey: 'pricingPlans.enterprisePlan.title',
    priceKey: 'pricingPlans.enterprisePlan.price',
    featuresKey: 'pricingPlans.enterprisePlan.features',
    buttonTextKey: 'pricingPlans.buttonText.contactUs',
    buttonColor: 'bg-green-600 hover:bg-green-700',
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="pricing py-6 px-0  sm:py-12 sm:px-6 bg-green-950 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-200">
          {t('pricingPlans.title')}
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg shadow-lg flex flex-col justify-between sm:w-80 sm:px-5 w-full overflow-hidden mx-auto transition-transform duration-300 my-2 ${
                index === 1 ? 'transform scale-110 order-3 md:order-2 lg:order-1' : 'transform scale-95 order-3 md:order-1'
              }`}
              style={{ minHeight: '200px'}}
            >
              {index === 1 && (
                <div className="absolute inset-0 rounded-lg p-1 animate-gradient-border">
                  <div
                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-700 h-full rounded-lg"
                    style={{ padding: '3px', margin: '-3px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
                  >
                    <div className="bg-black h-full rounded-lg"></div>
                  </div>
                </div>
              )}
              <div
                className={`relative p-6 rounded-lg h-full flex flex-col justify-between ${
                  index === 1 ? 'bg-transparent' : 'bg-green-800'
                }`}
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-200">{t(plan.titleKey)}</h3>
                  <p className="text-3xl font-bold mb-4 text-green-100">{t(plan.priceKey)}</p>
                  <ul className="mb-6 space-y-3">
                    {t(plan.featuresKey, { returnObjects: true }).map((feature, i) => (
                      <li key={i} className="flex items-center text-green-300">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center mt-auto">
                  <button
                    className={`w-full py-3 px-6 rounded-lg text-white ${plan.buttonColor} transform hover:scale-105 transition-transform duration-300`}
                    onClick={() => navigate('/payment')}
                  >
                    {t(plan.buttonTextKey)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
