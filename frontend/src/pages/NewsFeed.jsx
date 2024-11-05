import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';

const NewsFeed = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.post('/api/news/');
        console.log(response.data);
        setNewsData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <MyNavbar className="fixed top-0 left-0 right-0 z-10 bg-green-900 shadow-lg" />
      <div className="pt-20 max-w-3xl mx-auto my-8 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-500 transition duration-500 ease-in-out transform hover:scale-105">
          Agriculture News Feed
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-24 h-24 border-8 border-t-8 border-green-500 border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="space-y-8"> {/* Increased spacing between cards */}
            {newsData.map((item, index) => (
              <div
                key={index}
                className="bg-green-800 shadow-lg rounded-lg overflow-hidden flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow p-8 text-white hover:bg-green-700 transition duration-300"
                >
                  <h2 className="text-2xl font-semibold text-green-300"> {/* Increased font size */}
                    {item.text}
                  </h2>
                </a>
                {item.imgSrc && (
                  <img
                    src={item.imgSrc}
                    alt={item.text}
                    className="w-32 h-32 object-cover rounded-r-lg" /* Increased image size */
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NewsFeed;
