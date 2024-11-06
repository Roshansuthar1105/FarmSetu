import React from 'react';
import MyNavbar from './MyNavbar';
import Footer from './Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-800 dark:bg-black">
      <MyNavbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-10 text-center">
          Privacy Policy
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-8 text-gray-300 dark:text-gray-400">
          <section>
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-500 mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including when you create an account, make a purchase, or contact us for support. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information</li>
              <li>Login credentials</li>
              <li>Payment information</li>
              <li>Farm/business details</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-500 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process transactions</li>
              <li>Send important notifications</li>
              <li>Personalize your experience</li>
              <li>Ensure platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-500 mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We strive to protect your data but cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-500 mb-4">Contact Us</h2>
            <p>
              If you have questions about our privacy policy, please contact us at privacy@farmsetu.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
