import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckOut from "./CheckOut";
import PaymentCard from "../components/PaymentCard";
import Pricing from "../components/Pricing";
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
    <section className="pricing py-12 px-6 md:py-24 md:px-12 bg-gradient-to-b from-slate-700 to-slate-900 text-white">
      <div className="rounded-xl overflow-hidden " >

      <Pricing/>
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
