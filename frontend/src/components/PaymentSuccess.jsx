import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [paymentData, setPaymentData] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (location.state) {
      setPaymentData(location.state);
    } else {
      // Redirect to home if no payment data
      navigate('/');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/dashboard');
    }
  }, [countdown, navigate]);

  const handleDashboardRedirect = () => {
    navigate('/dashboard');
  };

  const handleDownloadInvoice = () => {
    // Simulate invoice download
    alert('Invoice download started!');
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-lime-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-green-200">Loading payment details...</p>
        </div>
      </div>
    );
  }

  const { plan, amount, method } = paymentData;

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'upi':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'netbanking':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case 'wallet':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      'card': 'Credit/Debit Card',
      'upi': 'UPI Payment',
      'netbanking': 'Net Banking',
      'wallet': 'Digital Wallet'
    };
    return methods[method] || 'Payment';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-lime-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Animated Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-white">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-green-300 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            Welcome to FarmSetu ! Your agricultural journey is about to get much smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Confirmation Card */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-800 to-emerald-900 rounded-2xl shadow-2xl border border-green-600/30 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Order Confirmed</h2>
                <div className="bg-green-600/30 px-4 py-2 rounded-full border border-green-500/30">
                  <span className="text-yellow-300 font-semibold">Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-700/30 rounded-xl p-6 border border-green-600/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Plan Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-200">Plan Name</span>
                      <span className="text-white font-semibold">{plan.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-200">Billing Cycle</span>
                      <span className="text-white font-semibold">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-200">Next Billing</span>
                      <span className="text-white font-semibold">
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-700/30 rounded-xl p-6 border border-green-600/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-200">Amount Paid</span>
                      <span className="text-yellow-300 font-bold text-lg">₹{(amount * 1.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-200">Payment Method</span>
                      <span className="text-white font-semibold flex items-center">
                        {getPaymentMethodIcon(method)}
                        <span className="ml-2">{getPaymentMethodName(method)}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-200">Transaction ID</span>
                      <span className="text-white font-mono">TXN{Date.now().toString().slice(-8)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next Section */}
              <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-300 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  What happens next?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <p className="text-green-200 text-sm">Access your dashboard immediately</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <p className="text-green-200 text-sm">Explore farming tools & analytics</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <p className="text-green-200 text-sm">Get expert support when needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-800 to-emerald-900 rounded-2xl shadow-2xl border border-green-600/30 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleDashboardRedirect}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 font-bold py-4 px-6 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Go to Dashboard
                </button>

                <button
                  onClick={handleDownloadInvoice}
                  className="w-full bg-green-700/30 border border-green-600/30 text-green-200 font-semibold py-4 px-6 rounded-xl hover:bg-green-600/40 hover:border-green-500/40 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Invoice
                </button>

                <button
                  onClick={() => navigate('/tools')}
                  className="w-full bg-green-700/30 border border-green-600/30 text-green-200 font-semibold py-4 px-6 rounded-xl hover:bg-green-600/40 hover:border-green-500/40 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Explore Tools
                </button>
              </div>

              {/* Countdown Timer */}
              <div className="mt-8 p-4 bg-green-700/20 rounded-xl border border-green-600/20">
                <p className="text-green-200 text-sm text-center mb-2">
                  Redirecting to dashboard in
                </p>
                <div className="text-center">
                  <span className="text-2xl font-bold text-yellow-300">{countdown}</span>
                  <span className="text-green-200 ml-1">seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-gradient-to-br from-green-800 to-emerald-900 rounded-2xl shadow-2xl border border-green-600/30 p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Welcome to Your Farming Toolkit
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plan.features.map((feature, index) => (
              <div key={index} className="bg-green-700/30 rounded-xl p-6 border border-green-600/20 hover:border-yellow-400/30 transition-all duration-200 group">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">{feature}</h3>
                <p className="text-green-200 text-sm">
                  Now available in your dashboard
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="text-center mt-12">
          <div className="bg-green-700/20 rounded-2xl p-8 border border-green-600/30">
            <h3 className="text-xl font-bold text-white mb-4">Need Help Getting Started?</h3>
            <p className="text-green-200 mb-6 max-w-2xl mx-auto">
              Our agricultural experts are here to help you make the most of your FarmSetu subscription.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Tutorial
              </button>
              <button className="bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500/30 transition-all duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}