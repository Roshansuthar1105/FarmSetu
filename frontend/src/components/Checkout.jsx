import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ plan, onBack, onPaymentSuccess }) {
  const [activePaymentMethod, setActivePaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Card details
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    // UPI details
    upiId: '',
    // Net Banking
    bank: '',
    // Wallet
    wallet: ''
  });

  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India'
  ];

  const wallets = [
    'PayTM',
    'PhonePe',
    'Google Pay',
    'Amazon Pay',
    'MobiKwik'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Payment details:", {
      plan: plan.title,
      price: plan.pricepermonth,
      method: activePaymentMethod,
      ...formData
    });

    // Around line 95-105, replace the navigation code:
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate successful payment
      const paymentData = {
        plan: plan,
        amount: plan.pricepermonth,
        method: activePaymentMethod
      };

      // Use the callback if provided, otherwise navigate directly
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentData);
      } else {
        navigate('/payment-success', { state: paymentData });
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderCardForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="cardNumber">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          className="w-full p-4 rounded-xl bg-green-700/30 text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="expiryDate">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full p-4 rounded-xl bg-green-700/30 text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="cvv">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            className="w-full p-4 rounded-xl bg-green-700/30 text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
            placeholder="123"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="name">
          Cardholder Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-4 rounded-xl bg-green-700/30 text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
          placeholder="John Doe"
          required
        />
      </div>
    </div>
  );

  const renderUPIForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="upiId">
          UPI ID
        </label>
        <input
          type="text"
          id="upiId"
          name="upiId"
          value={formData.upiId}
          onChange={handleInputChange}
          className="w-full p-4 rounded-xl bg-green-700/30 text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
          placeholder="yourname@upi"
          required
        />
      </div>
      <div className="text-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="text-sm text-gray-600 mb-2">Scan QR Code to Pay</div>
          <div className="bg-gray-200 p-8 rounded-lg inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-bold">QR CODE</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-3">UPI: farmsetu@icici</div>
        </div>
      </div>
    </div>
  );

  const renderNetBankingForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="bank">
          Select Bank
        </label>
        <select
          id="bank"
          name="bank"
          value={formData.bank}
          onChange={handleInputChange}
          className="w-full p-4 rounded-xl bg-green-700/30 text-white border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
          required
        >
          <option value="">Choose your bank</option>
          {banks.map(bank => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>
      </div>
      <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-yellow-200 text-sm">You will be redirected to your bank's secure portal</span>
        </div>
      </div>
    </div>
  );

  const renderWalletForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="wallet">
          Select Wallet
        </label>
        <select
          id="wallet"
          name="wallet"
          value={formData.wallet}
          onChange={handleInputChange}
          className="w-full p-4 rounded-xl bg-green-700/30 text-white border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
          required
        >
          <option value="">Choose your wallet</option>
          {wallets.map(wallet => (
            <option key={wallet} value={wallet}>{wallet}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderPaymentForm = () => {
    switch (activePaymentMethod) {
      case 'card':
        return renderCardForm();
      case 'upi':
        return renderUPIForm();
      case 'netbanking':
        return renderNetBankingForm();
      case 'wallet':
        return renderWalletForm();
      default:
        return renderCardForm();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-lime-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-green-300">
              FarmSetu Payment Gateway
            </h1>
          </div>
          <p className="text-green-200">Secure Payment Gateway</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-800 to-emerald-900 rounded-2xl shadow-2xl border border-green-600/30 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                <button
                  onClick={onBack}
                  className="text-green-300 hover:text-yellow-300 transition-colors flex items-center text-sm font-semibold"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Change Plan
                </button>
              </div>

              <div className="bg-green-700/30 rounded-xl p-4 mb-4 border border-green-600/20">
                <h3 className="text-lg font-semibold text-white mb-2">{plan.title}</h3>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-yellow-300">₹{plan.pricepermonth}</span>
                  <span className="text-green-200 text-sm">per month</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-green-200">
                  <span>Plan Price</span>
                  <span>₹{plan.pricepermonth}</span>
                </div>
                <div className="flex justify-between text-green-200">
                  <span>Platform Fee (1%)</span>
                  <span>₹{(plan.pricepermonth * 0.01).toFixed(2)}</span>
                </div>
                <div className="border-t border-green-600/30 pt-3">
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total Amount</span>
                    <span>₹{(plan.pricepermonth * 1.01).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="bg-green-700/20 rounded-xl p-4 border border-green-600/20">
                <h4 className="font-semibold text-white mb-3">Plan Includes:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-green-200 text-sm">
                      <svg className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-800 to-emerald-900 rounded-2xl shadow-2xl border border-green-600/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Payment Details</h2>
                <div className="flex items-center bg-green-700/30 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-yellow-300 text-sm font-semibold">Secure</span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl bg-green-700/30 text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl bg-green-700/30 text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setActivePaymentMethod(method.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${activePaymentMethod === method.id
                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                        : 'border-green-600/30 bg-green-700/30 text-green-200 hover:border-yellow-400/50'
                        }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`mb-2 ${activePaymentMethod === method.id ? 'text-yellow-400' : 'text-green-300'
                          }`}>
                          {method.icon}
                        </div>
                        <span className="text-xs font-semibold text-center">{method.name}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit}>
                  {renderPaymentForm()}

                  {/* Terms and Submit */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="w-4 h-4 text-yellow-400 bg-green-700 border-green-600 rounded focus:ring-yellow-400 focus:ring-2"
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-green-200">
                        I agree to the <a href="#" className="text-yellow-300 hover:underline">Terms of Service</a> and <a href="#" className="text-yellow-300 hover:underline">Privacy Policy</a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-xl text-green-900 font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </>
                      ) : (
                        `Pay ₹${(plan.pricepermonth * 1.01).toFixed(2)}`
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-green-600/30">
                <div className="flex items-center text-green-200 text-sm">
                  <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  256-bit SSL Secure
                </div>
                <div className="flex items-center text-green-200 text-sm">
                  <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  PCI DSS Compliant
                </div>
                <div className="flex items-center text-green-200 text-sm">
                  <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Money Back Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}