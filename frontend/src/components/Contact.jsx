import React, { useEffect, useState } from 'react';
import { Input, Textarea, Button, Card } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
export default function Contact() {
    const {BACKEND_URL} = useAuthContext();
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
    message: '',
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
    if(!userData){
      toast.error('Please login to contact us');
    }else{
    e.preventDefault();
    try {
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      setIsSubmitted(true);
      toast.success('Message sent successfully');
    } else {
      console.error('Failed to submit form');
      toast.error('Failed to submit form');
    }
    setIsSubmitted(true);
  } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  };

  return (
    <section className="contact py-12 px-6 md:py-24 md:px-12 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-300">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="form-container p-8 bg-green-800 text-white shadow-md" variant="bordered">
            <h3 className="text-xl font-semibold mb-4 text-green-200">Send us a message</h3>
            {isSubmitted ? (
              <>
              <p className="text-green-400">Thank you for contacting us! We'll get back to you soon.</p>
              <button className="px-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md mt-4" size="lg" onClick={() => {setIsSubmitted(false);setFormData({...formData, message: ''});}}>Send another message</button>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Input
                    fullWidth
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    size="lg"
                    className="bg-green-700 text-black border-green-600"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    size="lg"
                    className="bg-green-700 text-black border-green-600"
                  />
                </div>
                <div className="mb-4">
                  <Textarea
                    fullWidth
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    rows={4}
                    size="lg"
                    className="bg-green-700 text-black border-green-600"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            )}
          </Card>

          {/* Contact Details */}
          <Card className="contact-details p-8 bg-green-800 text-white shadow-md" variant="bordered">
            <h3 className="text-xl font-semibold mb-4 text-green-200">Get in Touch</h3>
            <p className="mb-8">Feel free to reach out to us through any of the following methods:</p>
            <ul className="list-none pl-3 list-inside flex flex-col items-start justify-start">
              <li className="mb-2">
                <strong className="text-green-400">Address:</strong> 456 Farm Lane, FarmCity, Rajasthan 302022, India
              </li>
              <li className="mb-2">
                <strong className="text-green-400">Phone:</strong> +91 9876543210
              </li>
              <li className="mb-2">
                <strong className="text-green-400">Email:</strong> support@farmsetu.com
              </li>
              <li className="mb-2">
                <strong className="text-green-400">Fax:</strong> +91 9876543211
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
