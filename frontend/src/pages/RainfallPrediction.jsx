import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
    FaCloudRain, FaTemperatureHigh, FaTint, FaCity, 
    FaCalendarAlt, FaSearchLocation, FaWind, FaEye, FaClock 
} from 'react-icons/fa';
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';
import { useTranslation } from 'react-i18next';

const RainfallPrediction = () => {
    const { t } = useTranslation();
    const { ML_BACKEND_URL } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    
    const OPEN_WEATHER_API_KEY = "d9cd7656c459dff4f0527fdf1bdd2485"; 

    const [formData, setFormData] = useState({
        city: '',
        state: '',
        current_temp: '',
        current_humidity: '',
        current_month :new Date().getMonth() + 1
    });

    const getWeatherIcon = (condition) => {
        if (!condition) return <WiDaySunny className="text-4xl text-yellow-400" />;
        const main = condition.toLowerCase();
        if (main.includes('cloud')) return <WiCloudy className="text-4xl text-gray-300" />;
        if (main.includes('rain') || main.includes('drizzle')) return <WiRain className="text-4xl text-blue-400" />;
        if (main.includes('thunder')) return <WiThunderstorm className="text-4xl text-purple-400" />;
        if (main.includes('snow')) return <WiSnow className="text-4xl text-white" />;
        if (main.includes('mist') || main.includes('fog')) return <WiFog className="text-4xl text-gray-400" />;
        return <WiDaySunny className="text-4xl text-yellow-400" />;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchCurrentWeather = async () => {
        if (!formData.city || !formData.state) {
            toast.error(t('enter_city_state_warning') || 'Please enter City and State first');
            return;
        }

        setWeatherLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${formData.city},${formData.state},IN&appid=${OPEN_WEATHER_API_KEY}&units=metric`
            );

            if (!response.ok) throw new Error('Weather data not found');

            const data = await response.json();
            console.log("backend data : ",data);
            setWeatherData(data);

            setFormData(prev => ({
                ...prev,
                current_temp: data.main.temp,
                current_humidity: data.main.humidity
            }));

            toast.success(t('weather_fetched') || 'Weather data updated!');

        } catch (error) {
            console.error(error);
            toast.error('Could not fetch weather. Please check spelling.');
        } finally {
            setWeatherLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!formData.current_temp || !formData.current_humidity) {
            toast.error("Please fetch weather data or enter manually.");
            return;
        }

        setLoading(true);
        setPrediction(null);

        try {
            const response = await fetch(`${ML_BACKEND_URL}/api/predict/rainfall`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setPrediction(data);
                toast.success(t('prediction_success') || 'Prediction successful!');
            } else {
                toast.error(data.error || 'Prediction failed');
            }
        } catch (error) {
            console.error(error);
            toast.error(t('server_error') || 'Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    // Helper component for prediction cards
    const PredictionCard = ({ title, result, confidence }) => {
        const isRain = result === 'YES';
        const bgColor = isRain ? 'bg-green-900/40 border-green-500' : 'bg-red-900/40 border-red-500';
        const textColor = isRain ? 'text-green-400' : 'text-red-400';

        return (
            <div className={`border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-105 ${bgColor}`}>
                <h3 className="text-gray-200 font-semibold text-lg mb-2 flex items-center">
                    <FaClock className="mr-2 opacity-70" /> {title}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${textColor}`}>
                    {result}
                </div>
                <div className="text-sm text-gray-400">
                    Confidence: <span className="text-white font-medium">{confidence}%</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        <span className="text-blue-500">{t('kushal_sinchai') || "Kushal Sinchai"}</span> {t('prediction')}
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        {t('rainfall_desc') || "IoT-Driven Rainfall Prediction combining Real-time Weather Data with Machine Learning."}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* LEFT COL: Inputs */}
                    <div className="space-y-6">
                        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center border-b border-gray-700 pb-2">
                                <FaSearchLocation className="mr-2 text-blue-500" /> {t('location_details')}
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">{t('city')}</label>
                                        <div className="relative">
                                            <FaCity className="absolute left-3 top-3 text-gray-500" />
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="e.g. Pune"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">{t('state')}</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2.5 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="e.g. Maharashtra"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={fetchCurrentWeather}
                                    disabled={weatherLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow-md flex justify-center items-center"
                                >
                                    {weatherLoading ? <span className="animate-spin mr-2">⏳</span> : <FaCloudRain className="mr-2" />}
                                    {t('get_current_weather') || "Get Current Weather"}
                                </button>
                            </div>
                        </div>

                        {/* ML Prediction Button Section */}
                        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                             <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1 uppercase">{t('input_temp')}</label>
                                        <input 
                                            type="number" 
                                            name="current_temp" 
                                            value={formData.current_temp} 
                                            onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                            placeholder="Auto-filled"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1 uppercase">{t('input_humidity')}</label>
                                        <input 
                                            type="number" 
                                            name="current_humidity" 
                                            value={formData.current_humidity} 
                                            onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                            placeholder="Auto-filled"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !formData.current_temp}
                                    className={`w-full bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-4 rounded-lg transition-all shadow-lg flex justify-center items-center ${(!formData.current_temp) ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-700 hover:to-green-900'}`}
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                                        </svg>
                                    ) : (
                                        t('predict_rainfall')
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COL: Weather Dashboard & Results */}
                    <div className="space-y-6">
                        {/* Live Weather Card */}
                        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                {t('current_weather')} <span className="text-xs text-gray-500 ml-2 font-normal">(OpenWeatherMap)</span>
                            </h2>

                            {!weatherData ? (
                                <div className="h-40 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-700 rounded-lg">
                                    <FaCloudRain className="text-4xl mb-2 opacity-50" />
                                    <p>{t('enter_location_fetch') || "Enter location & click 'Get Current Weather'"}</p>
                                </div>
                            ) : (
                                <div className="animate-fade-in">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center">
                                            {getWeatherIcon(weatherData.weather[0].main)}
                                            <div className="ml-4">
                                                <div className="text-3xl font-bold text-white">{Math.round(weatherData.main.temp)}°C</div>
                                                <div className="text-gray-400 capitalize">{weatherData.weather[0].description}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">{t('feels_like')}</div>
                                            <div className="text-lg font-medium text-white">{Math.round(weatherData.main.feels_like)}°C</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-700/50 p-3 rounded-lg flex items-center">
                                            <FaTint className="text-blue-400 mr-3 text-xl" />
                                            <div>
                                                <div className="text-xs text-gray-400">{t('humidity')}</div>
                                                <div className="font-semibold text-white">{weatherData.main.humidity}%</div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-700/50 p-3 rounded-lg flex items-center">
                                            <FaWind className="text-gray-300 mr-3 text-xl" />
                                            <div>
                                                <div className="text-xs text-gray-400">{t('wind_speed')}</div>
                                                <div className="font-semibold text-white">{weatherData.wind.speed} m/s</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ML Prediction Results - 3 Cards */}
                        {prediction && (
                            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg animate-fade-in">
                                <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">
                                    {t('rainfall_predictions') || "Rainfall Predictions"}
                                </h2>
                                
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <PredictionCard 
                                        title="24 Hours" 
                                        result={prediction.rainfall_24h} 
                                        confidence={prediction.confidence_24h} 
                                    />
                                    <PredictionCard 
                                        title="48 Hours" 
                                        result={prediction.rainfall_48h} 
                                        confidence={prediction.confidence_48h} 
                                    />
                                    <PredictionCard 
                                        title="72 Hours" 
                                        result={prediction.rainfall_72h} 
                                        confidence={prediction.confidence_72h} 
                                    />
                                </div>

                                <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                                    <h4 className="text-blue-400 font-medium mb-1">{t('irrigation_advice') || "Irrigation Advice"}</h4>
                                    <p className="text-gray-300 text-sm">{prediction.irrigation_recommendation}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RainfallPrediction;