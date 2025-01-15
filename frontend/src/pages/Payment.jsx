import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckOut from "./CheckOut";
import PaymentCard from "../components/PaymentCard";
const pricingPlans = [
  {
    title: 'Basic Plan',
    price: '₹1500/month',
    pricepermonth:1500,
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

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[0]);
  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <section className="pricing py-12 px-6 md:py-24 md:px-12 bg-green-950 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-200">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg shadow-lg flex flex-col justify-between w-80 mx-auto transition-transform duration-300 ${
                index === 1 ? 'transform scale-110' : 'transform scale-95'
              }`}
              style={{ minHeight: '400px' }}
              onClick={() => handlePlanSelect(plan)}
            >
              {/* Enhanced Animated Gradient Border for the middle card */}
              {index === 1 && (
                <div className="absolute inset-0 rounded-lg p-1 animate-gradient-border">
                  <div
                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-700 h-full rounded-lg"
                    style={{ padding: '6px', margin: '-6px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
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
                  <h3 className="text-2xl font-semibold mb-4 text-green-200">{plan.title}</h3>
                  <p className="text-3xl font-bold mb-4 text-green-100">{plan.price}</p>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, i) => (
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
                    onClick={()=>setSelectedPlan(plan)}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-24" >
      {/* <CheckOut plan={selectedPlan} /> */}
      {/* {} */}
      <PaymentCard/>
      </div>
      {/* {selectedPlan && (
        <div className="selected-plan-section py-12 px-6 md:py-24 md:px-12 bg-green-950 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-200">Selected Plan: {selectedPlan.title}</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2 text-green-200">Selected Plan: {selectedPlan.title}</h3>
              <p className="text-xl font-semibold mb-4 text-green-100">Price: {selectedPlan.price}</p>
            </div>
            <button
              className="w-full py-3 px-6 rounded-lg text-white bg-green-600 hover:bg-green-900 transform hover:scale-105 transition-transform duration-300"
              onClick={() => navigate('/payment-processing')}
            >
              Make Payment
            </button>
          </div>
        </div>
      )} */}
    </section>
  );
}
