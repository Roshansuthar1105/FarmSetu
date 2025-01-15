import { link } from '@nextui-org/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function PaymentCard() {
  const [paymentMethod, setPaymentMethod] = useState('')
  const btns = [
    {
      title: 'Credit Card',
      link: 'creditCard',
    },
    {
      title: 'PayPal',
      link: 'paypal',
    },
    {
      title: 'Bank Transfer',
      link: 'bankTransfer',
    },
    {
      title: 'UPI',
      link: 'upi',
    },
  ]
  return (
    <div className="w-full h-full p-6 bg-slate-800 rounded-lg shadow-md flex flex-col md:flex-row">
        {/* <h2 className="text-2xl font-bold mb-4 text-green-200 w-full ">Choose Your Payment Method</h2> */}
      <div className="w-full md:w-1/4 mx-6">
        <h2 className="text-2xl font-bold mb-4 text-green-100">Choose Your Payment Method</h2>
        <div className="flex flex-col space-y-4">
          {
            btns.map((btn) => {
              return (
                <button key={btn.link}
            className={`w-full py-3 px-6 rounded-lg text-black ${paymentMethod === btn.link ? 'bg-green-600 text-white border-2 ' : 'bg-green-400'} hover:bg-green-600 transition-transform duration-300`}
            onClick={() => setPaymentMethod(btn.link)}
          >
            {btn.title}
          </button>
              );
            })
          }
          
        </div>
      </div>
      <div className="w-full md:w-3/4 mt-6 md:mt-0 flex flex-col justify-center items-center">
        {paymentMethod === 'creditCard' && (
          <div className="bg-white rounded-lg p-4 w-80 h-48 shadow-md">
            <div className="flex justify-between">
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-bold text-gray-600">Card Number:</h3>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength="19"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-bold text-gray-600">Expiration Date:</h3>
                <input
                  type="text"
                  id="expirationDate"
                  placeholder="MM/YY"
                  className="w-20 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength="5"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})/g, '$1/').trim();
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-bold text-gray-600">Cardholder Name:</h3>
                <input
                  type="text"
                  id="cardholderName"
                  placeholder="John Doe"
                  className="w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-bold text-gray-600">CVV:</h3>
                <input
                  type="text"
                  id="cvv"
                  placeholder="123"
                  className="w-20 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength="3"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="Visa Logo" className="w-12 h-12" />
            </div>
          </div>
        )}
        {paymentMethod === 'paypal' && (
          <div>
            <h3 className="text-xl font-bold mb-2 text-green-200">PayPal Details</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="paypalEmail" className="text-sm text-gray-200">
                  PayPal Email:
                </label>
                <input
                  type="email"
                  id="paypalEmail"
                  placeholder="example@example.com"
                  className="w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
            </div>
          </div>
        )}
        {paymentMethod === 'bankTransfer' && (
          <div>
            <h3 className="text-xl font-bold mb-2 text-green-200">Bank Transfer Details</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="accountNumber" className="text-sm text-gray-200">
                  Account Number:
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  placeholder="1234567890"
                  className="w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <div>
                <label htmlFor="routingNumber" className="text-sm text-gray-200">
                  Routing Number:
                </label>
                <input
                  type="text"
                  id="routingNumber"
                  placeholder="123456789"
                  className="w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
            </div>
          </div>
        )}
        {paymentMethod === 'upi' && (
          <div>
            <h3 className="text-xl font-bold mb-2 text-green-200">UPI Details</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="upiId" className="text-sm text-gray-200">
                  UPI ID:
                </label>
                <input
                  type="text"
                  id="upiId"
                  placeholder="example@upi"
                  className="w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
            </div>
          </div>
        )}
        <button
          className="py-3 px-12 rounded-lg text-black bg-green-500 hover:bg-green-700 hover:text-white mt-6"
          onClick={() => {
            toast.success("Order Confirmed");
          }}
        >
          Proceed
        </button>
      </div>
    </div>
  )
}

export default PaymentCard