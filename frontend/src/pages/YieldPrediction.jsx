import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaLeaf, FaCloudRain, FaMapMarkerAlt, FaFlask, FaCalendarAlt, FaSeedling, FaChartLine } from 'react-icons/fa';
import { MdOutlinePestControl } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

// Data Lists (Moved outside component for cleaner render)
const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const seasons = [
    "Kharif", "Rabi", "Whole Year", "Summer", "Winter", "Autumn"
];

const crops = [
    "Rice", "Maize", "Chickpea", "Kidneybeans", "Pigeonpeas", "Mothbeans", "Mungbean", 
    "Blackgram", "Lentil", "Pomegranate", "Banana", "Mango", "Grapes", "Watermelon", 
    "Muskmelon", "Apple", "Orange", "Papaya", "Coconut", "Cotton", "Jute", "Coffee",
    "Wheat", "Sugarcane", "Tea", "Tobacco", "Groundnut"
];

const YieldPrediction = () => {
    const { t } = useTranslation();
    const { ML_BACKEND_URL } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const [formData, setFormData] = useState({
        State: '',
        Crop: '',
        Season: '',
        Crop_Year: new Date().getFullYear(),
        Annual_Rainfall: '',
        Fertilizer: '',
        Pesticide: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Basic Validation
        if (!formData.State || !formData.Crop || !formData.Season) {
            toast.error("Please select State, Crop, and Season.");
            return;
        }

        try {
            // Using ML_BACKEND_URL for consistency with CropRecommendationML
            const response = await fetch(`${ML_BACKEND_URL}/api/predict/yield`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                setResult(data);
                toast.success('Yield predicted successfully!');
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

    // Reusable Input Component (Matches CropRecommendationML)
    const InputField = ({ label, name, type = "number", icon: Icon, placeholder }) => (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="text-green-500" />
                </div>
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full bg-gray-700/50 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block pl-10 p-2.5 placeholder-gray-500"
                    required
                />
            </div>
        </div>
    );

    // Reusable Select Component (Styled to match InputField)
    const SelectField = ({ label, name, icon: Icon, options, defaultText }) => (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="text-green-500" />
                </div>
                <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block pl-10 p-2.5 appearance-none"
                    required
                >
                    <option value="" className="text-gray-500">{defaultText}</option>
                    {options.map(opt => (
                        <option key={opt} value={opt} className="bg-gray-800 text-white">{opt}</option>
                    ))}
                </select>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        <span className="text-green-500">Smart Yield</span> Estimator
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Leverage advanced AI to forecast crop production based on regional climate, soil inputs, and historical data.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
                        <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">
                            Production Parameters
                        </h2>
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                            
                            {/* Dropdowns */}
                            <SelectField 
                                label="State" 
                                name="State" 
                                icon={FaMapMarkerAlt} 
                                options={states} 
                                defaultText="Select State" 
                            />
                            <SelectField 
                                label="Crop Type" 
                                name="Crop" 
                                icon={FaSeedling} 
                                options={crops} 
                                defaultText="Select Crop" 
                            />
                            <SelectField 
                                label="Season" 
                                name="Season" 
                                icon={FaCloudRain} 
                                options={seasons} 
                                defaultText="Select Season" 
                            />
                            
                            {/* Numeric Inputs */}
                            <InputField 
                                label="Crop Year" 
                                name="Crop_Year" 
                                icon={FaCalendarAlt} 
                                placeholder="e.g. 2025" 
                            />
                            
                            <div className="md:col-span-2 border-t border-gray-700 my-2"></div>

                            <InputField 
                                label="Annual Rainfall (mm)" 
                                name="Annual_Rainfall" 
                                icon={FaCloudRain} 
                                placeholder="e.g. 850" 
                            />
                            <InputField 
                                label="Fertilizer (kg)" 
                                name="Fertilizer" 
                                icon={FaFlask} 
                                placeholder="e.g. 120" 
                            />
                            <InputField 
                                label="Pesticide (kg)" 
                                name="Pesticide" 
                                icon={MdOutlinePestControl} 
                                placeholder="e.g. 30" 
                            />

                            {/* Submit Button */}
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
                                            <FaChartLine className="mr-2" /> Predict Yield
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
                                        <FaChartLine className="text-5xl text-green-500" />
                                    </div>
                                    <h3 className="text-gray-400 uppercase tracking-wider text-sm mb-1">Estimated Yield</h3>
                                    <h2 className="text-4xl font-bold text-white">
                                        {result.predicted_yield}
                                    </h2>
                                    <p className="text-green-400 font-medium text-sm mt-1">Production Units</p>
                                </div>

                                <div className="flex-grow space-y-4">
                                    <div className="bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="text-green-400 font-medium mb-1">Configuration</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            Prediction based on <strong>{formData.Season}</strong> season in <strong>{formData.State}</strong>.
                                        </p>
                                    </div>
                                    <div className="bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="text-green-400 font-medium mb-1">Inputs</h4>
                                        <ul className="text-gray-300 text-sm list-disc list-inside">
                                            <li>Rainfall: {formData.Annual_Rainfall} mm</li>
                                            <li>Fertilizer: {formData.Fertilizer} kg</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg h-full flex flex-col items-center justify-center text-center opacity-70">
                                <FaLeaf className="text-6xl text-gray-600 mb-4" />
                                <p className="text-gray-400">Fill the form parameters to generate a production forecast.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YieldPrediction;