import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyNavbar from '../components/MyNavbar';
import citySuggestions from '../data/cities.json';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Weather = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Fetch city suggestions from imported JSON
  const fetchCitySuggestions = () => {
    if (city.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = citySuggestions.filter(c => c.toLowerCase().includes(city.toLowerCase()));
    setSuggestions(filteredSuggestions);
  };

  useEffect(() => {
    fetchCitySuggestions();
  }, [city]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    if (city.trim() === '') {
      toast.error(t('enter_city')); // Translated error message
      setLoading(false);
      return;
    }
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
      setError(t('weather_fetch_error')); // Translated error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col ">
      <div className={`pt-16 ${!loading ? 'mb-48' : ''}`}>
      <h1 className="text-4xl font-bold my-6 text-center text-green-500 transition duration-500 ease-in-out transform hover:scale-105">
          Weather
        </h1>
        <div className="max-w-3xl  my-8 p-6 bg-gray-800 shadow-lg rounded-lg relative mx-4 md:mx-auto ">
          <div className=" flex flex-row items-center justify-between">
            <input
              type="text"
              placeholder={t('enter_city_placeholder')}
              value={city}
              list="city-suggestions"
              onChange={(e) => setCity(e.target.value)}
              className="p-3 border border-gray-700 rounded-lg w-3/5 sm:w-7/8 sm:text-base text-xs bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />
            <button
              onClick={fetchWeatherData}
              className="w-2/5 sm:w-3/8 p-3 bg-green-600 ml-2 text-white rounded-lg sm:text-base text-xs hover:bg-green-500 transition ease-in-out duration-300"
            >
              {t('get_weather')} {/* Translation key */}
            </button>
            <datalist id="city-suggestions">
              {suggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-8 border-t-8 border-green-500 border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : weatherData ? (
            <div className="space-y-6 mt-5">
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
                  <h3 className="text-xl font-semibold mb-2 text-green-400">{t('temperature')} 🌡️</h3> {/* Translation key */}
                  <p className="text-white">{t('feels_like')}: {weatherData.main.feels_like}°C ❄️</p> {/* Translation key */}
                  <p className="text-white">{t('min_temp')}: {weatherData.main.temp_min}°C 🥶</p> {/* Translation key */}
                  <p className="text-white">{t('max_temp')}: {weatherData.main.temp_max}°C ☀️</p> {/* Translation key */}
                </div>
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">{t('weather_details')} 🌪️</h3> {/* Translation key */}
                  <p className="text-white">{t('humidity')}: {weatherData.main.humidity}% 💧</p> {/* Translation key */}
                  <p className="text-white">{t('pressure')}: {weatherData.main.pressure} hPa ⚖️</p> {/* Translation key */}
                  <p className="text-white">{t('visibility')}: {weatherData.visibility / 1000} km 🌆</p> {/* Translation key */}
                </div>
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">{t('wind')} 💨</h3> {/* Translation key */}
                  <p className="text-white">{t('wind_speed')}: {weatherData.wind.speed} m/s 🚀</p> {/* Translation key */}
                  <p className="text-white">{t('wind_direction')}: {weatherData.wind.deg}° 🔄</p> {/* Translation key */}
                </div>
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">{t('clouds')} ☁️</h3> {/* Translation key */}
                  <p className="text-white">{t('cloud_coverage')}: {weatherData.clouds.all}% 🌫️</p> {/* Translation key */}
                </div>
                <div className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">{t('sunrise_sunset')} 🌅</h3> {/* Translation key */}
                  <p className="text-white">{t('sunrise')}: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} ☀️</p> {/* Translation key */}
                  <p className="text-white">{t('sunset')}: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} 🌇</p> {/* Translation key */}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Weather;
