import React, { useState } from 'react';
import { Input, Textarea, Button, Card } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../context/AuthContext';

export default function Contact() {
  const { BACKEND_URL } = useAuthContext();
  const { t } = useTranslation();
  const userData = localStorage.getItem('user');
  let userName = '';
  let userEmail = '';
  if (userData) {
    userName = JSON.parse(userData).name;
    userEmail = JSON.parse(userData).email;
  }
  const [formData, setFormData] = useState({
    name: userName ? userName : '',
    email: userEmail ? userEmail : '',
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (!userData) {
      toast.error(t('contact.toast.loginRequired'));
    } else {
      e.preventDefault();
      try {
        const response = await fetch(`${BACKEND_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setIsSubmitted(true);
          toast.success(t('contact.toast.success'));
        } else {
          console.error('Failed to submit form');
          toast.error(t('contact.toast.failure'));
        }
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error(t('contact.toast.failure'));
      }
    }
  };
  return (
    <section className="contact py-16 px-6 md:py-24 md:px-12 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300 dark:from-green-200 dark:to-blue-200">
              {t('contact.title')}
            </span>
          </h2>
          <p className="text-gray-300 dark:text-gray-200 max-w-2xl mx-auto text-lg">
            {t('contact.subtitle', 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="form-container p-8 bg-gradient-to-br from-green-800 to-green-900 dark:from-green-700 dark:to-green-800 text-white shadow-xl rounded-2xl border border-green-700/30 dark:border-green-600/30 backdrop-blur-sm" variant="bordered">
            <h3 className="text-2xl font-semibold mb-6 text-green-100 dark:text-green-50">{t('contact.form.title')}</h3>
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/20 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl text-green-300 dark:text-green-200 mb-6">{t('contact.form.thankYou')}</p>
                <button
                  className="px-6 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 rounded-xl mt-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ ...formData, message: '' });
                  }}
                >
                  {t('contact.form.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-200 dark:text-green-100 mb-2">
                    {t('contact.form.nameLabel', 'Your Name')}
                  </label>
                  <Input
                    fullWidth
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                    size="lg"
                    className="rounded-xl text-black dark:text-white border-green-600/50 dark:border-green-500/50 focus:border-green-400 dark:focus:border-green-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-green-200 dark:text-green-100 mb-2">
                    {t('contact.form.emailLabel', 'Your Email')}
                  </label>
                  <Input
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                    size="lg"
                    className="rounded-xl text-black dark:text-white border-green-600/50 dark:border-green-500/50 focus:border-green-400 dark:focus:border-green-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-green-200 dark:text-green-100 mb-2">
                    {t('contact.form.messageLabel', 'Your Message')}
                  </label>
                  <Textarea
                    fullWidth
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    required
                    rows={5}
                    size="lg"
                    className="rounded-xl text-black dark:text-white border-green-600/50 dark:border-green-500/50 focus:border-green-400 dark:focus:border-green-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-400 dark:to-green-500 dark:hover:from-green-500 dark:hover:to-green-600 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  size="lg"
                >
                  {t('contact.form.submitButton')}
                </Button>
              </form>
            )}
          </Card>

          {/* Contact Details */}
          <Card className="contact-details p-8 bg-gradient-to-br from-green-800 to-green-900 dark:from-green-700 dark:to-green-800 text-white shadow-xl rounded-2xl border border-green-700/30 dark:border-green-600/30 backdrop-blur-sm" variant="bordered">
            <h3 className="text-2xl font-semibold mb-6 text-green-100 dark:text-green-50">{t('contact.details.title')}</h3>
            <p className="mb-8 text-green-200 dark:text-green-100">{t('contact.details.description')}</p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-green-200 dark:text-green-100">{t('contact.details.addressTitle', 'Address')}</h4>
                  <p className="text-green-300 dark:text-green-200 mt-1">{t('contact.details.address')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-green-200 dark:text-green-100">{t('contact.details.phoneTitle', 'Phone')}</h4>
                  <p className="text-green-300 dark:text-green-200 mt-1">{t('contact.details.phone')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-green-200 dark:text-green-100">{t('contact.details.emailTitle', 'Email')}</h4>
                  <p className="text-green-300 dark:text-green-200 mt-1">{t('contact.details.email')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-green-200 dark:text-green-100">{t('contact.details.faxTitle', 'Fax')}</h4>
                  <p className="text-green-300 dark:text-green-200 mt-1">{t('contact.details.fax')}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-green-700/30 dark:border-green-600/30">
              <h4 className="text-lg font-medium text-green-200 dark:text-green-100 mb-4">{t('contact.details.socialTitle', 'Connect With Us')}</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full text-green-300 dark:text-green-200 hover:bg-green-600/40 dark:hover:bg-green-500/40 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full text-green-300 dark:text-green-200 hover:bg-green-600/40 dark:hover:bg-green-500/40 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full text-green-300 dark:text-green-200 hover:bg-green-600/40 dark:hover:bg-green-500/40 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a href="#" className="bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full text-green-300 dark:text-green-200 hover:bg-green-600/40 dark:hover:bg-green-500/40 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
