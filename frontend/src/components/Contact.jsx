import React, { useState } from 'react';
import { Input, Textarea, Button, Card } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../context/AuthContext';
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

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
  const socialLinks = [
    { icon: <FaWhatsapp />, url: 'https://wa.me/917878952931?text=Hello%20there!%20I%20visited%20your%20Project%20Farmsetu.', label: 'Whatsapp' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/direct/inbox/?follow=Roshansuthar1105&message=Hello%20there!%20I%20visited%20your%20Project%20FarmSetu.', label: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/roshansuthar', label: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/roshansuthar1105', label: 'Github' },
  ];
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
                {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl bg-green-600/20 dark:bg-green-500/20 p-3 rounded-full text-green-300 dark:text-green-200 hover:bg-green-600/40 dark:hover:bg-green-500/40 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
