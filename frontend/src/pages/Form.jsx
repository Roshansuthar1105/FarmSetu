import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';

export default function Form() {
  const [formData, setFormData] = useState({
    location: '',
    expertise: '',
    cropType: '',
    irrigationMethod: '',
    pesticideUsage: '',
    fertilizerUsage: '',
    farmSize: '',
    extraData: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/results');
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-neutral-200">
      {/* Navbar at the top */}
      <MyNavbar />

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-8 mt-16"> {/* Added mt-16 */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 bg-neutral-800 rounded-lg shadow-lg border border-green-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
            Farmer Input Form
          </h2>

          {/* Location Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your location"
            />
          </div>

          {/* Expertise Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="expertise">
              Expertise in Farming
            </label>
            <select
              name="expertise"
              id="expertise"
              value={formData.expertise}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your expertise level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Crop Type Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="cropType">
              Crop Type
            </label>
            <input
              type="text"
              name="cropType"
              id="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter the type of crops you grow"
            />
          </div>

          {/* Irrigation Method Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="irrigationMethod">
              Irrigation Method
            </label>
            <select
              name="irrigationMethod"
              id="irrigationMethod"
              value={formData.irrigationMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your irrigation method</option>
              <option value="Drip">Drip</option>
              <option value="Sprinkler">Sprinkler</option>
              <option value="Surface">Surface</option>
            </select>
          </div>

          {/* Pesticide Usage Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="pesticideUsage">
              Pesticide Usage
            </label>
            <input
              type="text"
              name="pesticideUsage"
              id="pesticideUsage"
              value={formData.pesticideUsage}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your pesticide usage"
            />
          </div>

          {/* Fertilizer Usage Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="fertilizerUsage">
              Fertilizer Usage
            </label>
            <input
              type="text"
              name="fertilizerUsage"
              id="fertilizerUsage"
              value={formData.fertilizerUsage}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your fertilizer usage"
            />
          </div>

          {/* Farm Size Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="farmSize">
              Farm Size
            </label>
            <input
              type="text"
              name="farmSize"
              id="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter the size of your farm"
            />
          </div>

          {/* Additional Information Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="extraData">
              Additional Information
            </label>
            <textarea
              name="extraData"
              id="extraData"
              value={formData.extraData}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter any additional information"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-neutral-100 rounded hover:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
