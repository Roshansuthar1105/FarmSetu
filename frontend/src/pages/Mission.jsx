import React from 'react';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';

const Mission = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
        <MyNavbar/>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Our Mission</h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-300 mb-6">
            At FarmSetu, our mission is to empower farmers and revolutionize agriculture through innovative technology and sustainable practices. We believe in creating a future where farming is more efficient, profitable, and environmentally conscious.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Empowering Farmers</h3>
              <p className="text-gray-600">
                We provide farmers with cutting-edge tools, resources, and knowledge to optimize their farming operations and increase productivity.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Sustainable Agriculture</h3>
              <p className="text-gray-600">
                We promote sustainable farming practices that protect our environment while ensuring food security for future generations.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate and integrate modern technology to make farming more efficient and accessible.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Community Support</h3>
              <p className="text-gray-600">
                We build strong farming communities by facilitating knowledge sharing and providing expert support.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            Join us in our journey to transform agriculture and create a more sustainable future for farming communities across India.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Mission;
