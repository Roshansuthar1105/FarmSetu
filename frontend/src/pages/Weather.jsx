import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import citySuggestions from '../data/cities.json';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch city suggestions from imported JSON
  const fetchCitySuggestions = () => {
    if (city.trim() === '') {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }
    const filteredSuggestions = citySuggestions.filter(c => c.toLowerCase().includes(city.toLowerCase()));
    setSuggestions(filteredSuggestions);
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    fetchCitySuggestions();
  }, [city]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    setShowSuggestions(false); // Hide suggestions after button click
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: 'd9cd7656c459dff4f0527fdf1bdd2485', // Replace with your OpenWeather API key
          units: 'metric' // For temperature in Celsius
        }
      });
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("click on sufff",suggestion);
    setCity(suggestion);
    console.log("city",city);
    // fetchWeatherData(); // Immediately fetch weather data when suggestion is clicked
    setSuggestions([]);
    setHighlightedIndex(-1);
    setShowSuggestions(false); // Hide suggestions after selection
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (highlightedIndex >= 0) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <MyNavbar className="fixed top-0 left-0 right-0 z-10 bg-green-900 shadow-lg" />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto my-8 p-6 bg-gray-800 shadow-lg rounded-lg relative">
          <div className="mb-6 flex flex-row items-center justify-between">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-3 border border-gray-700 rounded-lg w-3/4 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              onFocus={() => setShowSuggestions(true)} // Show suggestions when input is focused
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Hide suggestions after a slight delay on blur
            />
            <button
              onClick={fetchWeatherData}
              className="w-1/4 p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition ease-in-out duration-300"
            >
              Get Weather
            </button>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 top-16 bg-gray-800 border border-gray-700 rounded-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() =>{ handleSuggestionClick(suggestion);}}
                    className={`p-2 cursor-pointer hover:bg-gray-700 text-white ${
                      index === highlightedIndex ? 'bg-gray-600' : ''
                    }`}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-8 border-t-8 border-green-500 border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : weatherData ? (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 text-center text-green-300">{weatherData.name}</h1>
              <div className="flex items-center justify-center mb-6">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt={weatherData.weather[0].description}
                  className="w-24 h-24"
                />
                <div className="ml-4 text-white">
                  <h2 className="text-3xl font-semibold">{weatherData.main.temp}°C</h2>
                  <p className="text-xl text-white">{weatherData.weather[0].description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">Temperature</h3>
                  <p className="text-white">Feels Like: {weatherData.main.feels_like}°C</p>
                  <p className="text-white">Min Temp: {weatherData.main.temp_min}°C</p>
                  <p className="text-white">Max Temp: {weatherData.main.temp_max}°C</p>
                </div>
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">Weather Details</h3>
                  <p className="text-white">Humidity: {weatherData.main.humidity}%</p>
                  <p className="text-white">Pressure: {weatherData.main.pressure} hPa</p>
                  <p className="text-white">Visibility: {weatherData.visibility / 1000} km</p>
                </div>
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">Wind</h3>
                  <p className="text-white">Speed: {weatherData.wind.speed} m/s</p>
                  <p className="text-white">Direction: {weatherData.wind.deg}°</p>
                </div>
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">Clouds</h3>
                  <p className="text-white">Coverage: {weatherData.clouds.all}%</p>
                </div>
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">Sunrise/Sunset</h3>
                  <p className="text-white">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                  <p className="text-white">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Weather;
