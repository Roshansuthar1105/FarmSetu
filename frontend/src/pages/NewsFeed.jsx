import React, { useState, useEffect, useRef } from 'react';
import MyNavbar from '../components/MyNavbar';
import Data from '../data/news.json';
import { FaSearch, FaCalendarAlt, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NewsFeed = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const topRef = useRef(null);
  // Fetch news data
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // const response = await axios.post('/api/news/');
        const data = Data || [];
        setNewsData(data);
        setFilteredNews(data); // Initialize filtered news with the same data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Filter news data based on search term
  useEffect(() => {
    if (!newsData) return;

    const filtered = searchTerm.trim() === ''
      ? newsData
      : newsData.filter(item =>
          (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.snippet && item.snippet.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    setFilteredNews(filtered);
  }, [newsData, searchTerm]);

  const loadMore = (value) => {
    setLimit(limit + value);
    // Scroll to top of news feed when changing pages
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setLimit(10); // Reset to first page when searching
  }
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="pt-20 max-w-7xl mx-auto my-6 px-3 md:px-5 lg:px-6 w-full">
        <div ref={topRef} className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-green-500 transition duration-500 ease-in-out transform hover:scale-105">
            Agriculture News Feed
          </h1>

          {/* Search bar */}
          <div className="relative max-w-sm mx-auto mb-6">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="w-20 h-20 border-4 border-green-500 border-opacity-50 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-green-400 animate-pulse">Loading latest news...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-6 text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <p className="text-gray-300 mt-2">Please try again later</p>
          </div>
        ) : (
          <>
            {filteredNews.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-xl text-gray-300">No news found matching "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredNews && filteredNews.length > 0 && filteredNews.slice(Math.max(0, limit-10), Math.min(limit, filteredNews.length)).map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg overflow-hidden flex flex-col h-full transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl hover:border-green-500"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={item.photo_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400/333/green?text=Agriculture+News";
                          }}
                        />
                      </div>
                      <div className="flex-grow p-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-white hover:text-green-300 group"
                        >
                          <h2 className="text-base font-semibold mb-2 text-green-400 group-hover:text-green-300 line-clamp-2">
                            {item.title}
                          </h2>
                          <div className="flex items-center text-gray-400 text-xs mb-2">
                            <FaCalendarAlt className="mr-1" />
                            <span>{item.published_datetime_utc ? new Date(item.published_datetime_utc).toLocaleDateString() : 'Unknown date'}</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                            {item.snippet}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-gray-400 text-xs">
                              {item.source_name || 'Unknown'}
                            </p>
                            <span className="text-green-400 text-xs flex items-center group-hover:text-green-300">
                              Read more <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination controls */}
                <div className="flex justify-between items-center sticky bottom-3 p-2 backdrop-blur-md bg-gray-900 bg-opacity-80 border border-gray-800 rounded-full shadow-lg max-w-xs mx-auto">
                  <button
                    className={`flex items-center justify-center bg-gray-800 hover:bg-green-700 text-white px-2 py-1 rounded-full transition-all duration-300 ${!filteredNews || limit <= 10 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    disabled={!filteredNews || limit <= 10}
                    onClick={() => loadMore(-10)}
                  >
                    <FaChevronLeft className="mr-1" /> <span className="text-xs">Prev</span>
                  </button>
                  <span className="text-gray-300 text-xs">
                    {Math.ceil(limit/10)} / {filteredNews && filteredNews.length > 0 ? Math.ceil(filteredNews.length/10) : 1}
                  </span>
                  <button
                    className={`flex items-center justify-center bg-gray-800 hover:bg-green-700 text-white px-2 py-1 rounded-full transition-all duration-300 ${!filteredNews || limit >= filteredNews.length ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    disabled={!filteredNews || limit >= filteredNews.length}
                    onClick={() => loadMore(10)}
                  >
                    <span className="text-xs">Next</span> <FaChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
