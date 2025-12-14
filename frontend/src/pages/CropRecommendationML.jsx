import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
    FaLeaf, FaFlask, FaTint, FaTemperatureHigh, FaCloudShowersHeavy, FaWater, 
    FaSun, FaHourglassHalf, FaCloudSun, FaExclamationTriangle, FaTools, 
    FaChartLine, FaRupeeSign, FaCheckCircle, FaBug, FaTractor 
} from 'react-icons/fa';
import { GiFertilizerBag, GiSpade, GiPlantRoots } from "react-icons/gi"; 
import { useTranslation } from 'react-i18next';

// --- Sub-Component: Input Field ---
const InputField = ({ label, name, icon: Icon, placeholder, min, max, value, onChange }) => (
    <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="text-green-500" />
            </div>
            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                max={max}
                className="w-full bg-gray-700/50 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block pl-10 p-2.5 placeholder-gray-500 transition-all"
                required
            />
        </div>
    </div>
);

// --- Sub-Component: Detailed Result Display ---
const CropResultDetails = ({ result }) => {
    const { details } = result;
    if (!details) return null;

    return (
        <div className="space-y-6 animate-slide-up">
            {/* Header */}
            <div className="bg-gray-800 border-l-4 border-green-500 p-6 rounded-r-xl shadow-lg flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white font-serif tracking-wide flex items-center">
                        <span className="text-green-500 mr-2">🌿</span> 
                        Recommended Crop: 
                        <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded ml-2 border border-green-500/30 uppercase">
                            {result.predicted_crop}
                        </span>
                        <span className="text-green-500 ml-2">🌱</span>
                    </h2>
                </div>
            </div>

            {/* Optimal Growing Conditions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-md hover:border-green-500/50 transition-colors">
                <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                    <FaSun className="mr-2" /> Optimal Growing Conditions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start p-3 bg-gray-700/30 rounded-lg">
                        <GiPlantRoots className="text-yellow-500 text-xl mr-3 mt-1" />
                        <div>
                            <h4 className="text-gray-400 text-xs uppercase font-bold">Soil Type</h4>
                            <p className="text-white font-medium">{details.soil_type || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-700/30 rounded-lg">
                        <FaCloudSun className="text-blue-400 text-xl mr-3 mt-1" />
                        <div>
                            <h4 className="text-gray-400 text-xs uppercase font-bold">Climate</h4>
                            <p className="text-white font-medium">{details.best_grown_in || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-700/30 rounded-lg">
                        <FaHourglassHalf className="text-purple-400 text-xl mr-3 mt-1" />
                        <div>
                            <h4 className="text-gray-400 text-xs uppercase font-bold">Growing Time</h4>
                            <p className="text-white font-medium">{details.growing_time || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-700/30 rounded-lg">
                        <FaLeaf className="text-green-500 text-xl mr-3 mt-1" />
                        <div>
                            <h4 className="text-gray-400 text-xs uppercase font-bold">Best Season</h4>
                            <p className="text-white font-medium">{details.best_season || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-700/30 rounded-lg">
                        <FaTemperatureHigh className="text-red-400 text-xl mr-3 mt-1" />
                        <div>
                            <h4 className="text-gray-400 text-xs uppercase font-bold">Ideal Temperature</h4>
                            <p className="text-white font-medium">{details.ideal_temperature || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cultivation Steps */}
            {details.steps && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-md">
                    <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                        <GiSpade className="mr-2" /> Cultivation Steps
                    </h3>
                    <ol className="space-y-3">
                        {details.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start group">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-900/50 text-green-400 border border-green-500/50 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                    {idx + 1}
                                </span>
                                <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Challenges & Solutions */}
            {details.problems_and_solutions && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-md">
                    <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
                        <FaExclamationTriangle className="mr-2" /> Common Challenges
                    </h3>
                    <div className="space-y-3">
                        {Object.entries(details.problems_and_solutions).map(([problem, solution], idx) => (
                            <div key={idx} className="bg-red-900/10 border border-red-900/30 p-4 rounded-lg">
                                <h4 className="text-red-300 font-bold flex items-center text-sm mb-1">
                                    <FaBug className="mr-2" /> {problem}
                                </h4>
                                <p className="text-gray-400 text-sm pl-6">{solution}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Two Column Section: Tools & Economics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Tools */}
                {details.tools_needed && (
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-md">
                        <h3 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center">
                            <FaTools className="mr-2" /> Required Tools
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {details.tools_needed.map((tool, idx) => (
                                <span key={idx} className="bg-yellow-900/20 text-yellow-200 border border-yellow-700/30 px-3 py-1 rounded-full text-sm flex items-center">
                                    <FaCheckCircle className="mr-2 text-xs opacity-50" /> {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Economics */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-md">
                    <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                        <FaChartLine className="mr-2" /> Economics
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-800/30">
                            <div className="text-blue-300 text-xs uppercase font-bold mb-1">Projected Yield</div>
                            <div className="text-white font-medium">{details.expected_yield || "N/A"}</div>
                        </div>
                        <div className="bg-green-900/20 p-3 rounded-lg border border-green-800/30">
                            <div className="text-green-300 text-xs uppercase font-bold mb-1 flex items-center">
                                <FaRupeeSign className="mr-1" /> Market Price
                            </div>
                            <div className="text-white font-medium">{details.market_price || "N/A"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CropRecommendationML = () => {
    const { t } = useTranslation();
    const { authUser, setAuthUser, ML_BACKEND_URL, BACKEND_URL } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [selectedFarm, setSelectedFarm] = useState("new");

    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
        water_level: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Handle Farm Selection Logic ---
    const handleFarmSelection = (e) => {
        const farmId = e.target.value;
        setSelectedFarm(farmId);

        if (farmId === "new") {
            // Reset soil nutrients if new farm is selected, keep weather/manual inputs empty or default
            setFormData(prev => ({
                ...prev,
                nitrogen: '',
                phosphorus: '',
                potassium: '',
                ph: ''
            }));
        } else {
            // Find farm in user context and populate data
            const farm = authUser?.farms?.find(f => f._id === farmId);
            if (farm && farm.soilHealth) {
                setFormData(prev => ({
                    ...prev,
                    nitrogen: farm.soilHealth.nitrogen || '',
                    phosphorus: farm.soilHealth.phosphorus || '',
                    potassium: farm.soilHealth.potassium || '',
                    ph: farm.soilHealth.phLevel || '', // Map phLevel (DB) to ph (ML)
                }));
                toast.success(`Loaded soil data from ${farm.farmName}`);
            }
        }
    };
    // --- NEW: Function to Log Data to Backend ---
    const logMLData = async (predictionResult) => {
        try {
            // Ensure user is logged in before logging
            if (!authUser || !authUser.token) return;

            await fetch(`${BACKEND_URL}/api/ml/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.token}` // Important for 'protect' middleware
                },
                body: JSON.stringify({
                    type: 'crop_recommendation',
                    inputData: {
                        ...formData,
                        // Add lat/lng if you are capturing them, otherwise they are optional
                        latitude: 26.9, 
                        longitude: 75.8 
                    },
                    predictionResult: predictionResult 
                })
            });
            console.log("ML Prediction logged successfully");
        } catch (error) {
            console.error("Failed to log ML data:", error);
            // We don't show an error toast here to avoid disrupting the user experience
            // since seeing the result is more important than logging history.
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            // 1. Get Prediction from ML Server
            const response = await fetch(`${ML_BACKEND_URL}/api/predict/crop`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setResult(data);
                toast.success(t('crop_predicted_success') || 'Crop recommendation ready!');
                // --- 2. LOG DATA TO BACKEND (NEW) ---
                // We call this immediately after success. No await needed if we don't want to block UI.
                logMLData(data);
                // 2. If an existing farm was selected, update its soil data in the backend
                if (selectedFarm !== "new") {
                    updateFarmData(selectedFarm);
                }
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

    // --- Function to update Farm Data in Background ---
    const updateFarmData = async (farmId) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/user/farm/${farmId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.token}` // Ensure token is passed
                },
                body: JSON.stringify({
                    soilHealth: {
                        nitrogen: formData.nitrogen,
                        phosphorus: formData.phosphorus,
                        potassium: formData.potassium,
                        phLevel: formData.ph // Map back to DB schema name
                    }
                })
            });

            if (res.ok) {
                const data = await res.json();
                
                // Update Local Context to reflect changes immediately
                const updatedUser = { ...authUser };
                const farmIndex = updatedUser.farms.findIndex(f => f._id === farmId);
                if (farmIndex !== -1) {
                    updatedUser.farms[farmIndex] = data.farm; // Update the specific farm
                    setAuthUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
                toast.success("Farm soil records updated successfully!");
            }
        } catch (error) {
            console.error("Failed to update farm data", error);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        <span className="text-green-500">{t('smart_crop')}</span> {t('recommendation')}
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        {t('crop_desc') || "Analyze your soil nutrients and environmental conditions to find the most suitable crop for your farm."}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Form Section (Takes 4 columns on large screens) */}
                    <div className="lg:col-span-4 h-fit bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl sticky top-24">
                        
                        {/* Farm Selection Dropdown */}
                        <div className="mb-6">
                            <label className="text-sm font-medium text-gray-300 mb-2 block">Select Farm Profile</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaTractor className="text-green-500" />
                                </div>
                                <select 
                                    value={selectedFarm}
                                    onChange={handleFarmSelection}
                                    className="w-full bg-gray-700 text-white pl-10 p-2.5 rounded-lg border border-gray-600 focus:ring-green-500 focus:border-green-500 outline-none appearance-none cursor-pointer"
                                >
                                    <option value="new">Custom / New Farm Input</option>
                                    {authUser?.farms?.map((farm) => (
                                        <option key={farm._id} value={farm._id}>
                                            {farm.farmName} (Area: {farm.area} {farm.areaUnit})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedFarm !== "new" && (
                                <p className="text-xs text-green-400 mt-2">
                                    * Soil data loaded. Adjusting values here will update your farm record upon prediction.
                                </p>
                            )}
                        </div>

                        <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-3 flex items-center">
                            <FaFlask className="mr-2 text-green-500" /> {t('soil_analysis')}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Nitrogen (N)" name="nitrogen" icon={GiFertilizerBag} placeholder="0-140" value={formData.nitrogen} onChange={handleChange} />
                                <InputField label="Phosphorus (P)" name="phosphorus" icon={GiFertilizerBag} placeholder="0-145" value={formData.phosphorus} onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Potassium (K)" name="potassium" icon={GiFertilizerBag} placeholder="0-205" value={formData.potassium} onChange={handleChange} />
                                <InputField label="pH Level" name="ph" icon={FaFlask} placeholder="0-14" value={formData.ph} onChange={handleChange} />
                            </div>
                            
                            <div className="border-t border-gray-700 my-1"></div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Temperature (°C)" name="temperature" icon={FaTemperatureHigh} placeholder="Celsius" value={formData.temperature} onChange={handleChange} />
                                <InputField label="Humidity (%)" name="humidity" icon={FaTint} placeholder="%" value={formData.humidity} onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Rainfall (mm)" name="rainfall" icon={FaCloudShowersHeavy} placeholder="mm" value={formData.rainfall} onChange={handleChange} />
                                <InputField label="Water Level" name="water_level" icon={FaWater} placeholder="Index" value={formData.water_level} onChange={handleChange} />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:scale-[1.02] flex justify-center items-center"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FaLeaf className="mr-2" /> {selectedFarm !== "new" ? "Recommend & Update Farm" : t('recommend_crop')}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Result Section (Takes 8 columns on large screens) */}
                    <div className="lg:col-span-8">
                        {result ? (
                            <CropResultDetails result={result} t={t} />
                        ) : (
                            <div className="h-full min-h-[400px] bg-gray-800/50 border border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-800 p-6 rounded-full mb-6 animate-pulse">
                                    <FaLeaf className="text-6xl text-gray-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-300 mb-2">{t('ready_to_analyze') || "Ready to Analyze"}</h3>
                                <p className="text-gray-500 max-w-sm">
                                    Enter your soil and climate data in the form to get an AI-powered crop recommendation with detailed farming guide.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropRecommendationML;