import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pricing from "../components/Pricing";
import Checkout from "../components/Checkout";
import PaymentSuccess from "../components/PaymentSuccess.jsx";
const pricingPlans = [
  {
    title: 'Basic Plan',
    price: '₹1,500/month',
    pricepermonth: 1500,
    features: [
      'Access to Agriculture Tools & Marketplace',
      '1 Soil Health Check per month',
      '1 Crop Recommendation per month',
      '5 AI Expert Chat messages per day',
      'Weekly Weather Updates & News',
      'Standard Email Support',
    ],
    buttonText: 'Get Started',
    buttonColor: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Pro Plan',
    price: '₹3,000/month',
    pricepermonth: 3000,
    features: [
      'All Basic Plan Features',
      '5 Soil Health Checks per month',
      '5 Crop Recommendations per month',
      '*Unlimited* AI Expert Chat',
      'Live Real-Time Market Analysis & Trends',
      'Priority Email & Dedicated Chat Support',
    ],
    buttonText: 'Upgrade Now',
    buttonColor: 'bg-lime-600 hover:bg-lime-700', // Changed to lime for better contrast and agriculture theme
    popular: true,
  },
  {
    title: 'Enterprise Plan',
    price: '₹5,000/month',
    pricepermonth: 5000,
    features: [
      'All Pro Plan Features (Unlimited Usage)',
      'Custom Solutions & Platform Integrations',
      'Dedicated Account Manager & 24/7 Support',
      '0.5% Transaction Fee on Marketplace (vs 3%)',
      'On-site Consultations & Data Export',
      'Priority Govt./Insurance Scheme Processing',
    ],
    buttonText: 'Contact Us',
    buttonColor: 'bg-gray-800 hover:bg-gray-900', // Changed to dark for Enterprise feel
  },
];
// const pricingPlans = [
//   {
//     title: 'Basic Plan',
//     price: '₹1500/month',
//     pricepermonth: 1500,
//     features: [
//       'Access to Agriculture Tools',
//       'Market Insights & Trends',
//       'Weekly Weather Updates',
//       'Email Support',
//     ],
//     buttonText: 'Get Started',
//     buttonColor: 'bg-green-600 hover:bg-green-900',
//   },
//   {
//     title: 'Pro Plan',
//     price: '₹3000/month',
//     pricepermonth: 3000,
//     features: [
//       'All Basic Plan Features',
//       'Advanced Crop Analytics',
//       'Daily Market Insights',
//       'Priority Email & Chat Support',
//       'Expert Consultation Sessions',
//     ],
//     buttonText: 'Upgrade Now',
//     buttonColor: 'bg-black hover:bg-gray-900',
//     popular: true,
//   },
//   {
//     title: 'Enterprise Plan',
//     price: '₹5000/month',
//     pricepermonth: 5000,
//     features: [
//       'All Pro Plan Features',
//       'Custom Solutions & Integrations',
//       'Dedicated Account Manager',
//       '24/7 Support',
//       'On-site Consultations',
//     ],
//     buttonText: 'Contact Us',
//     buttonColor: 'bg-green-600 hover:bg-green-700',
//   },
// ];

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if a plan was passed via navigation state
  React.useEffect(() => {
    if (location.state?.selectedPlan) {
      console.log('Plan received via navigation:', location.state.selectedPlan);
      setSelectedPlan(location.state.selectedPlan);
    }
  }, [location.state]);

  const onSelectPlan = (plan) => {
    console.log('Plan selected in Payment component:', plan);
    setSelectedPlan(plan);
  };

  const handleBackToPlans = () => {
    setSelectedPlan(null);
  };

  return (
    <section className="pricing py-12 px-6 md:py-24 md:px-12 bg-gradient-to-b from-slate-700 to-slate-900 text-white min-h-screen flex items-center justify-center">
      {selectedPlan ? (
        <Checkout plan={selectedPlan} onBack={handleBackToPlans} />
      ) : (
        <div className="w-full">
          <Pricing onSelectPlan={onSelectPlan} pricingPlans={pricingPlans} />
        </div>
      )}
    </section>
  );
}