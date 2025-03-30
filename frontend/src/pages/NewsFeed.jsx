import React, { useState, useEffect } from 'react';
import MyNavbar from '../components/MyNavbar';
import Data from '../data/news.json';
const NewsFeed = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    const fetchNewsData = async () => {
        try {
          // const response = await axios.post('/api/news/');
          setNewsData(Data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
        // const url = 'https://google-news13.p.rapidapi.com/search?keyword=agriculture&lr=en-US';
        // const url =`https://newsapi.org/v2/top-headlines?q=agriculture&from=2024-11-04&to=${new Date().toISOString().split('T')[0]}&sortBy=relevancy&apiKey=3bd19f3433c440e68ecaed975c5e2d4d`;
        // console.log(url);
        // const options = {
        //   method: 'GET',
        // };

        // try {
        //   const response = await fetch(url, options);
        //   const result = await response.json();
        //   console.log(result.articles[0]);
        //   setNewsData(result.articles);
        // } catch (error) {
        //   console.error(error);
        // } finally {
        //   setLoading(false);
        // }

    //   const url = 'https://real-time-news-data.p.rapidapi.com/search?query=agriculture&time_published=anytime&country=US&lang=en';
    //   const options = {
    //     method: 'GET',
    //     headers: {
    //       'x-rapidapi-key': '2cbdd8bf5cmsh714c8b4ba144e97p104dddjsn2493098c2349',
    //       'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
    //     }
    //   };

    //   try {
    //     const response = await fetch(url, options);
    //     const result = await response.json();
    //     setNewsData(result.data);
    //     console.log(result.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   finally {
    //     setLoading(false);
    //   }
    };


    fetchNewsData();
  }, []);

  const loadMore = (value) => {
    setLimit(limit + value);
  }
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="pt-20 max-w-3xl mx-auto my-8 px-4 md:px-0">
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
          <div className="space-y-8 px-4 sm:px-10 "> {/* Increased spacing between cards */}
            {newsData && newsData.slice(limit-10, limit).map((item, index) => (
              <div
                key={index}
                className="bg-green-800 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row lg:flex-row transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex-grow w-full md:w-1/2 lg:w-2/5">
                  {(
                    <img
                      src={item.photo_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow p-6 w-full md:w-1/2 lg:w-3/5">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white hover:text-green-300 transition duration-300"
                  >
                    <h2 className="text-2xl font-semibold mb-2 text-green-300">
                      {item.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-2">
                      {new Date(item.published_datetime_utc).toLocaleDateString()}
                    </p>
                    <p className="text-gray-100">
                      {item.snippet}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Source: {item.source_name}
                    </p>
                  </a>
                </div>
              </div>
            ))}
            <div className="flex justify-between sticky bottom-0 p-1 backdrop-blur-sm bg-[#ffffff29] border-t-3 border-gray-900 md:px-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md" disabled={limit === 10} onClick={()=>loadMore(-10)} >Prev</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md" disabled={limit >= newsData.length} onClick={()=>loadMore(10)} >Next</button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default NewsFeed;
