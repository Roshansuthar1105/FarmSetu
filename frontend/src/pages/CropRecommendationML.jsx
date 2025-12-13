import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaLeaf, FaFlask, FaTint, FaTemperatureHigh, FaCloudShowersHeavy, FaWater } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Diagram Tag for context:
// 
const CropRecommendationML = () => {
    const { t } = useTranslation();
    const { ML_BACKEND_URL } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
        water_level: '' // Based on app.py requirement
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${ML_BACKEND_URL}/api/predict/crop`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            if (response.ok) {
                setResult(data);
                toast.success(t('crop_predicted_success') || 'Crop recommendation ready!');
            } else {
                toast.error(data.error || 'Prediction failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({ label, name, icon: Icon, placeholder, min, max }) => (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="text-green-500" />
                </div>
                <input
                    type="number"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    className="w-full bg-gray-700/50 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block pl-10 p-2.5 placeholder-gray-500"
                    required
                />
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        <span className="text-green-500">{t('smart_crop')}</span> {t('recommendation')}
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        {t('crop_desc') || "Analyze your soil nutrients and environmental conditions to find the most suitable crop for your farm."}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
                        <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">
                            {t('soil_analysis')}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                            <InputField label={`${t('nitrogen')} (N)`} name="nitrogen" icon={FaFlask} placeholder="Ratio (0-140)" />
                            <InputField label={`${t('phosphorus')} (P)`} name="phosphorus" icon={FaFlask} placeholder="Ratio (0-145)" />
                            <InputField label={`${t('potassium')} (K)`} name="potassium" icon={FaFlask} placeholder="Ratio (0-205)" />
                            <InputField label={`${t('ph_level')} (pH)`} name="ph" icon={FaFlask} placeholder="0-14" />
                            
                            <div className="md:col-span-2 border-t border-gray-700 my-2"></div>
                            
                            <InputField label={`${t('temperature')} (°C)`} name="temperature" icon={FaTemperatureHigh} placeholder="In Celsius" />
                            <InputField label={`${t('humidity')} (%)`} name="humidity" icon={FaTint} placeholder="Relative Humidity" />
                            <InputField label={`${t('rainfall')} (mm)`} name="rainfall" icon={FaCloudShowersHeavy} placeholder="Annual Rainfall" />
                            <InputField label={t('water_level')} name="water_level" icon={FaWater} placeholder="Water Level Index" />

                            <div className="md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:scale-[1.01] flex justify-center items-center"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                                        </svg>
                                    ) : (
                                        <>
                                            <FaLeaf className="mr-2" /> {t('recommend_crop')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Result Section */}
                    <div className="lg:col-span-1">
                        {result ? (
                            <div className="bg-gray-800 border-2 border-green-600/50 rounded-xl p-6 shadow-2xl h-full flex flex-col animate-slide-up-1">
                                <div className="text-center mb-6">
                                    <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                        <FaLeaf className="text-5xl text-green-500" />
                                    </div>
                                    <h3 className="text-gray-400 uppercase tracking-wider text-sm mb-1">{t('best_crop_match')}</h3>
                                    <h2 className="text-3xl font-bold text-white capitalize">{result.predicted_crop}</h2>
                                </div>

                                <div className="flex-grow space-y-4">
                                    {result.details && (
                                        <>
                                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                                <h4 className="text-green-400 font-medium mb-1">{t('description')}</h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">{result.details.description || "No description available."}</p>
                                            </div>
                                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                                <h4 className="text-green-400 font-medium mb-1">{t('required_conditions')}</h4>
                                                <p className="text-gray-300 text-sm">
                                                    Best grown in {result.details.season || "specific"} season.
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg h-full flex flex-col items-center justify-center text-center opacity-70">
                                <FaLeaf className="text-6xl text-gray-600 mb-4" />
                                <p className="text-gray-400">{t('result_placeholder')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropRecommendationML;