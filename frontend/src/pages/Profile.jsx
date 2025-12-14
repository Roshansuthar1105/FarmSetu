import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
    FaEnvelope, FaMapMarkerAlt, FaPhone,
    FaTractor, FaPlus, FaLeaf, FaTrash, FaTimes, FaSave,
    FaBug, FaRobot, FaCalendarAlt, FaEye, FaThermometerHalf, FaTint, FaFlask
} from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { IoLogOut, IoSettingsSharp } from "react-icons/io5";
import { GrContactInfo } from "react-icons/gr";
import { MdDashboard, MdTrendingUp, MdOutlineVerified } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import toast from "react-hot-toast";

// --- MAP IMPORTS ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- SUB-COMPONENT: HISTORY DETAILS MODAL ---
const LogDetailsModal = ({ log, onClose }) => {
    if (!log) return null;

    const isCrop = log.type === 'crop_recommendation';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-lg overflow-hidden relative">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <FaTimes size={20} />
                </button>

                {/* Header */}
                <div className={`p-6 ${isCrop ? 'bg-gradient-to-r from-green-900/50 to-gray-800' : 'bg-gradient-to-r from-red-900/50 to-gray-800'}`}>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {isCrop ? 'Crop Recommendation' : 'Disease Detection'} Result
                    </h3>
                    <h2 className="text-3xl font-bold text-white capitalize flex items-center gap-3">
                        {isCrop ? <FaLeaf className="text-green-500"/> : <FaBug className="text-red-500"/>}
                        {isCrop ? log.predictionResult?.predicted_crop : log.predictionResult?.disease}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 flex items-center">
                        <FaCalendarAlt className="mr-2"/> {new Date(log.createdAt).toLocaleString()}
                    </p>
                </div>

                {/* Body - Inputs Used */}
                <div className="p-6">
                    <h4 className="text-white font-semibold mb-4 border-b border-gray-700 pb-2">Analysis Parameters Used</h4>
                    
                    {isCrop ? (
                        <div className="grid grid-cols-2 gap-4">
                            <StatItem label="Nitrogen (N)" value={log.inputData?.nitrogen} icon={<FaFlask className="text-blue-400"/>} />
                            <StatItem label="Phosphorus (P)" value={log.inputData?.phosphorus} icon={<FaFlask className="text-purple-400"/>} />
                            <StatItem label="Potassium (K)" value={log.inputData?.potassium} icon={<FaFlask className="text-yellow-400"/>} />
                            <StatItem label="pH Level" value={log.inputData?.ph} icon={<FaFlask className="text-green-400"/>} />
                            <StatItem label="Temperature" value={`${log.inputData?.temperature}°C`} icon={<FaThermometerHalf className="text-red-400"/>} />
                            <StatItem label="Rainfall" value={`${log.inputData?.rainfall}mm`} icon={<FaTint className="text-blue-300"/>} />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                                <p className="text-gray-400 text-sm">Diagnosis Confidence</p>
                                <p className="text-2xl font-bold text-white">
                                    {log.predictionResult?.confidence ? `${log.predictionResult.confidence}%` : 'N/A'}
                                </p>
                            </div>
                            {log.inputData?.imageUrl && (
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">Analyzed Image</p>
                                    <img src={log.inputData.imageUrl} alt="Leaf Scan" className="w-full h-48 object-cover rounded-lg border border-gray-600"/>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-900 border-t border-gray-700 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, icon }) => (
    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 flex items-center justify-between">
        <div>
            <p className="text-xs text-gray-500 uppercase">{label}</p>
            <p className="text-white font-medium">{value || 'N/A'}</p>
        </div>
        <div className="opacity-50 text-lg">{icon}</div>
    </div>
);


const Profile = () => {
    const navigate = useNavigate();
    const { authUser, setAuthUser, BACKEND_URL } = useAuthContext();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    
    // --- Farm Management State ---
    const [showAddFarm, setShowAddFarm] = useState(false);
    const [editingFarm, setEditingFarm] = useState(null); 
    
    // --- ML History State ---
    const [mlHistory, setMlHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null); // State for the Modal
    
    // Initial State for Forms
    const initialFarmState = {
        farmName: '', 
        area: '', 
        areaUnit: 'acre', 
        coordinates: [75.7873, 26.9124], 
        soilHealth: { nitrogen: 0, phosphorus: 0, potassium: 0, phLevel: 7 }
    };
    
    const [formData, setFormData] = useState(initialFarmState);

    // --- Helper Component: Map Marker ---
    const LocationMarker = ({ position, setPosition }) => {
        const markerRef = useRef(null)
        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current;
                    if (marker != null) {
                        const { lat, lng } = marker.getLatLng();
                        setPosition([lng, lat]); 
                    }
                },
            }),
            [setPosition],
        )

        return (
            <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={[position[1], position[0]]} 
                ref={markerRef}>
                <Popup>Farm Location</Popup>
            </Marker>
        )
    }

    // --- Existing Dummy Data for Charts ---
    const cropData = [
        { name: 'Wheat', value: 35 }, { name: 'Rice', value: 25 },
        { name: 'Corn', value: 20 }, { name: 'Soybeans', value: 15 },
        { name: 'Other', value: 5 },
    ];
    const activityData = [
        { name: 'Mon', value: 4 }, { name: 'Tue', value: 3 },
        { name: 'Wed', value: 7 }, { name: 'Thu', value: 2 },
        { name: 'Fri', value: 5 }, { name: 'Sat', value: 8 },
        { name: 'Sun', value: 6 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // --- Fetch ML History when tab is active ---
    useEffect(() => {
        if (activeTab === 'activity') {
            const fetchHistory = async () => {
                setHistoryLoading(true);
                try {
                    const res = await fetch(`${BACKEND_URL}/api/ml/history`, {
                        headers: { 'Authorization': `Bearer ${authUser?.token}` }
                    });
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setMlHistory(data);
                    }
                } catch (error) {
                    console.error("Failed to fetch ML history", error);
                    toast.error("Could not load activity history");
                } finally {
                    setHistoryLoading(false);
                }
            };
            fetchHistory();
        }
    }, [activeTab, BACKEND_URL, authUser]);

    // --- HANDLERS ---
    const openAddMode = () => {
        setFormData(initialFarmState);
        setEditingFarm(null);
        setShowAddFarm(true);
    };

    const openEditMode = (farm) => {
        setEditingFarm(farm);
        setFormData({
            farmName: farm.farmName,
            area: farm.area,
            areaUnit: farm.areaUnit,
            coordinates: farm.location?.coordinates || initialFarmState.coordinates,
            soilHealth: { 
                nitrogen: farm.soilHealth?.nitrogen || 0, 
                phosphorus: farm.soilHealth?.phosphorus || 0, 
                potassium: farm.soilHealth?.potassium || 0, 
                phLevel: farm.soilHealth?.phLevel || 7 
            }
        });
        setShowAddFarm(true); 
    };

    const handleSubmitFarm = async (e) => {
        e.preventDefault();
        const endpoint = editingFarm 
            ? `${BACKEND_URL}/api/user/farm/${editingFarm._id}` 
            : `${BACKEND_URL}/api/user/add-farm`;
        const method = editingFarm ? 'PATCH' : 'POST';

        try {
            const res = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.token}` 
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if(res.ok) {
                toast.success(editingFarm ? "Farm Updated!" : "Farm Added!");
                let updatedFarms;
                if (editingFarm) {
                    updatedFarms = authUser.farms.map(f => f._id === editingFarm._id ? data.farm : f);
                } else {
                    updatedFarms = data.farms; 
                }
                const updatedUser = { ...authUser, farms: updatedFarms };
                setAuthUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setShowAddFarm(false);
                setEditingFarm(null);
            } else {
                toast.error(data.error || "Operation failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network Error");
        }
    };

    const handleDeleteFarm = async (farmId) => {
        if(!window.confirm("Are you sure you want to delete this farm record?")) return;
        try {
            const res = await fetch(`${BACKEND_URL}/api/user/farm/${farmId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authUser.token}` }
            });
            const data = await res.json();
            if(res.ok) {
                toast.success("Farm Deleted");
                const updatedFarms = authUser.farms.filter(f => f._id !== farmId);
                const updatedUser = { ...authUser, farms: updatedFarms };
                setAuthUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 ">
                <div className="w-16 h-16 border-8 border-t-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 pt-20">
            {/* Modal Render */}
            <LogDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} />

            <div className="container mx-auto px-4 py-8">
                {/* --- Profile Header --- */}
                <div className="bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="h-40 bg-gradient-to-r from-green-600 to-blue-600 relative"></div>
                    <div className="flex flex-col md:flex-row px-6 py-4 relative">
                        <div className="absolute -top-16 left-6">
                            <img 
                                src={authUser?.avatar} 
                                alt="Profile" 
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-800 object-cover shadow-lg" 
                            />
                        </div>
                        <div className="mt-16 md:mt-0 md:ml-36 text-white">
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                {authUser?.name} <MdOutlineVerified className="text-blue-400" />
                            </h1>
                            <p className="text-gray-300 flex items-center text-sm mt-1">
                                <FaMapMarkerAlt className="mr-2 text-red-400"/> 
                                {authUser?.address?.city || 'India'}, {authUser?.address?.state}
                            </p>
                        </div>
                    </div>

                    {/* --- Tabs --- */}
                    <div className="border-t border-gray-700 px-6 overflow-x-auto">
                        <div className="flex space-x-1 py-3">
                            {[
                                { id: 'overview', icon: <MdDashboard/>, label: 'Overview' },
                                { id: 'farms', icon: <FaTractor/>, label: 'My Farms' }, 
                                { id: 'activity', icon: <MdTrendingUp/>, label: 'Analysis History' },
                                { id: 'personal', icon: <GrContactInfo/>, label: 'Personal Info' },
                                { id: 'settings', icon: <IoSettingsSharp/>, label: 'Settings' }
                            ].map(tab => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        activeTab === tab.id ? 'bg-green-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* --- Left Sidebar --- */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                            <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2">Contact Details</h3>
                            <div className="space-y-4 text-gray-300 text-sm">
                                <div className="flex items-center">
                                    <div className="bg-gray-700 p-2 rounded-full mr-3"><FaEnvelope className="text-green-500"/></div>
                                    <span>{authUser?.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-gray-700 p-2 rounded-full mr-3"><FaPhone className="text-blue-500"/></div>
                                    <span>{authUser?.mobileNumber || 'Not provided'}</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-gray-700 p-2 rounded-full mr-3"><FaMapMarkerAlt className="text-red-500"/></div>
                                    <span>{authUser?.address?.village ? `${authUser.address.village}, ${authUser.address.district}` : 'Address not updated'}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate(`/profile/edit/${authUser?._id}`)}
                                className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition text-sm flex items-center justify-center gap-2"
                            >
                                <BiEdit /> Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* --- Main Content --- */}
                    <div className="md:col-span-2">
                        
                        {/* 1. OVERVIEW */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                                    <h2 className="text-xl font-bold text-white mb-6">Farm Analytics</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="h-64">
                                            <h4 className="text-gray-400 text-sm mb-4 text-center">Crop Distribution</h4>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={cropData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                                                        {cropData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                                    </Pie>
                                                    <Tooltip contentStyle={{backgroundColor: '#1f2937', border: 'none', color: 'white'}}/>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="h-64">
                                            <h4 className="text-gray-400 text-sm mb-4 text-center">Weekly Activity</h4>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={activityData}>
                                                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12}/>
                                                    <YAxis stroke="#9CA3AF" fontSize={12}/>
                                                    <Tooltip cursor={{fill: '#374151'}} contentStyle={{backgroundColor: '#1f2937', border: 'none', color: 'white'}}/>
                                                    <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. MY FARMS */}
                        {activeTab === 'farms' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Land Records</h2>
                                        <p className="text-gray-400 text-sm">Manage your plots and soil data</p>
                                    </div>
                                    {!showAddFarm && (
                                        <button 
                                            onClick={openAddMode}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition shadow-lg"
                                        >
                                            <FaPlus className="mr-2"/> Add New Plot
                                        </button>
                                    )}
                                </div>

                                {showAddFarm && (
                                    <div className="bg-gray-800 p-6 rounded-xl border border-blue-500/50 shadow-xl animate-fade-in-down">
                                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                                            <h3 className="text-lg font-bold text-white">
                                                {editingFarm ? `Edit Farm: ${editingFarm.farmName}` : "Register New Land"}
                                            </h3>
                                            <button onClick={() => setShowAddFarm(false)} className="text-gray-400 hover:text-white">
                                                <FaTimes size={20}/>
                                            </button>
                                        </div>
                                        <form onSubmit={handleSubmitFarm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-gray-400 text-xs uppercase">Farm Name</label>
                                                    <input className="w-full bg-gray-700 text-white p-2 rounded mt-1 focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. North Field" value={formData.farmName} onChange={e => setFormData({...formData, farmName: e.target.value})} required />
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <label className="text-gray-400 text-xs uppercase">Area Size</label>
                                                        <input className="w-full bg-gray-700 text-white p-2 rounded mt-1 focus:ring-2 focus:ring-green-500 outline-none" type="number" placeholder="0" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} required />
                                                    </div>
                                                    <div className="w-1/3">
                                                        <label className="text-gray-400 text-xs uppercase">Unit</label>
                                                        <select className="w-full bg-gray-700 text-white p-2 rounded mt-1 outline-none" value={formData.areaUnit} onChange={e => setFormData({...formData, areaUnit: e.target.value})}>
                                                            <option value="acre">Acre</option>
                                                            <option value="hectare">Hectare</option>
                                                            <option value="bigha">Bigha</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-gray-400 text-xs uppercase">Location</label>
                                                    <div className="flex gap-2 mt-1">
                                                        <input disabled className="w-1/2 bg-gray-900 text-gray-500 p-2 rounded border border-gray-700" value={formData.coordinates[1].toFixed(4)} placeholder="Latitude" />
                                                        <input disabled className="w-1/2 bg-gray-900 text-gray-500 p-2 rounded border border-gray-700" value={formData.coordinates[0].toFixed(4)} placeholder="Longitude" />
                                                    </div>
                                                    <p className="text-xs text-blue-400 mt-1">*Drag the blue pin on map to update</p>
                                                </div>
                                            </div>
                                            <div className="h-64 rounded-lg overflow-hidden border border-gray-600 relative z-0">
                                                <MapContainer 
                                                    center={[formData.coordinates[1], formData.coordinates[0]]} 
                                                    zoom={13} 
                                                    style={{ height: '100%', width: '100%' }}
                                                >
                                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                                                    <LocationMarker position={formData.coordinates} setPosition={(coords) => setFormData(prev => ({...prev, coordinates: coords}))} />
                                                </MapContainer>
                                            </div>
                                            <div className="col-span-2 bg-gray-700/50 p-4 rounded-lg mt-2">
                                                <p className="text-sm text-green-400 mb-3 font-semibold">Soil Nutrition Data</p>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    <div>
                                                        <label className="text-gray-400 text-xs">pH Level</label>
                                                        <input className="w-full bg-gray-700 text-white p-2 rounded mt-1" type="number" step="0.1" value={formData.soilHealth.phLevel} onChange={e => setFormData({...formData, soilHealth: {...formData.soilHealth, phLevel: e.target.value}})} />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-xs">Nitrogen (N)</label>
                                                        <input className="w-full bg-gray-700 text-white p-2 rounded mt-1" type="number" value={formData.soilHealth.nitrogen} onChange={e => setFormData({...formData, soilHealth: {...formData.soilHealth, nitrogen: e.target.value}})} />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-xs">Phosphorus (P)</label>
                                                        <input className="w-full bg-gray-700 text-white p-2 rounded mt-1" type="number" value={formData.soilHealth.phosphorus} onChange={e => setFormData({...formData, soilHealth: {...formData.soilHealth, phosphorus: e.target.value}})} />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-xs">Potassium (K)</label>
                                                        <input className="w-full bg-gray-700 text-white p-2 rounded mt-1" type="number" value={formData.soilHealth.potassium} onChange={e => setFormData({...formData, soilHealth: {...formData.soilHealth, potassium: e.target.value}})} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2 flex justify-end gap-2 mt-2">
                                                <button type="button" onClick={() => setShowAddFarm(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                                                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium flex items-center gap-2">
                                                    <FaSave /> {editingFarm ? "Update Record" : "Save Record"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {authUser?.farms?.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4">
                                        {authUser.farms.map((farm, index) => (
                                            <div key={index} className="bg-gray-800 p-5 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-md border-l-4 border-green-500 hover:bg-gray-750 transition group">
                                                <div className="flex items-start gap-4 flex-1 cursor-pointer" onClick={() => openEditMode(farm)} title="Click to View/Edit Details">
                                                    <div className="bg-green-900/30 p-3 rounded-lg">
                                                        <FaTractor className="text-2xl text-green-400"/>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition">{farm.farmName}</h3>
                                                        <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                                                            <FaLeaf className="text-green-600"/> {farm.area} {farm.areaUnit} 
                                                            <span className="text-gray-600">|</span> 
                                                            <FaMapMarkerAlt className="text-gray-500"/> 
                                                            {farm.location?.coordinates ? `${farm.location.coordinates[1].toFixed(2)}, ${farm.location.coordinates[0].toFixed(2)}` : 'Location not mapped'}
                                                        </p>
                                                        <div className="flex gap-2 mt-3 flex-wrap">
                                                            <span className={`px-2 py-0.5 rounded text-xs font-mono ${farm.soilHealth?.phLevel < 6 ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'}`}>pH: {farm.soilHealth?.phLevel}</span>
                                                            <span className="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300">N: {farm.soilHealth?.nitrogen}</span>
                                                            <span className="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300">P: {farm.soilHealth?.phosphorus}</span>
                                                            <span className="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300">K: {farm.soilHealth?.potassium}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 md:mt-0 flex gap-3">
                                                    <button onClick={() => openEditMode(farm)} className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition"><BiEdit size={20} /></button>
                                                    <button onClick={() => handleDeleteFarm(farm._id)} className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition"><FaTrash size={18} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                                        <FaTractor className="text-5xl text-gray-600 mb-4"/>
                                        <h3 className="text-xl text-gray-400 font-semibold">No Land Records Found</h3>
                                        <p className="text-gray-500 text-sm mt-2 max-w-md text-center">Add your farm details to get AI-based crop recommendations and soil health analysis.</p>
                                        <button onClick={openAddMode} className="mt-6 text-green-400 hover:text-green-300 font-medium">Register your first plot &rarr;</button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 4. ACTIVITY HISTORY (UPDATED) */}
                        {activeTab === 'activity' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-4">Analysis History</h2>
                                {historyLoading ? (
                                    <div className="text-center py-10 text-gray-400">Loading your history...</div>
                                ) : mlHistory.length > 0 ? (
                                    <div className="grid gap-4">
                                        {mlHistory.map((log) => (
                                            <div key={log._id} className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md hover:border-gray-600 transition flex flex-col md:flex-row justify-between md:items-center group">
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-3 rounded-lg ${log.type === 'crop_recommendation' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                                        {log.type === 'crop_recommendation' ? <FaLeaf size={24} /> : <FaBug size={24} />}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white capitalize">
                                                            {log.type === 'crop_recommendation' 
                                                                ? `Crop: ${log.predictionResult?.predicted_crop}` 
                                                                : `Disease: ${log.predictionResult?.disease}`}
                                                        </h3>
                                                        <div className="text-sm text-gray-400 flex flex-wrap gap-2 mt-1">
                                                            <span className="flex items-center"><FaCalendarAlt className="mr-1" /> {new Date(log.createdAt).toLocaleDateString()}</span>
                                                            <span className="bg-gray-700 px-2 rounded-full text-xs py-0.5 capitalize">{log.type.replace('_', ' ')}</span>
                                                            {log.predictionResult?.confidence && (
                                                                <span className="text-green-400 font-mono text-xs">Conf: {log.predictionResult.confidence}%</span>
                                                            )}
                                                        </div>
                                                        {/* Summary Preview */}
                                                        {log.type === 'crop_recommendation' && (
                                                            <div className="text-xs text-gray-500 mt-2 opacity-80">
                                                                Inputs: N:{log.inputData?.nitrogen} P:{log.inputData?.phosphorus} K:{log.inputData?.potassium} pH:{log.inputData?.ph}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-4 md:mt-0 flex justify-end">
                                                   <button 
                                                        onClick={() => setSelectedLog(log)}
                                                        className="px-4 py-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition flex items-center text-sm font-medium"
                                                   >
                                                        <FaEye className="mr-2"/> View Details
                                                   </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                                        <FaRobot className="text-5xl text-gray-600 mb-4 mx-auto"/>
                                        <h3 className="text-xl text-gray-400 font-semibold">No Analysis Records</h3>
                                        <p className="text-gray-500 text-sm mt-2">Use our AI tools to get crop recommendations or disease detection to see your history here.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 5. PERSONAL INFO */}
                        {activeTab === 'personal' && (
                            <div className="bg-gray-800 rounded-xl p-6 text-white shadow-lg border border-gray-700">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">Personal Information</h2>
                                    <button onClick={() => navigate(`/profile/edit/${authUser._id}`)} className="text-green-400 hover:text-green-300 bg-green-400/10 p-2 rounded-lg transition"><BiEdit size={20}/></button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    <InfoItem label="Full Name" value={authUser?.name} />
                                    <InfoItem label="Email Address" value={authUser?.email} />
                                    <InfoItem label="Role" value={authUser?.role} capitalize />
                                    <InfoItem label="Mobile Number" value={authUser?.mobileNumber || 'N/A'} />
                                    <InfoItem label="Village" value={authUser?.address?.village || 'N/A'} />
                                    <InfoItem label="City / Tehsil" value={authUser?.address?.city || 'N/A'} />
                                    <InfoItem label="District" value={authUser?.address?.district || 'N/A'} />
                                    <InfoItem label="State" value={authUser?.address?.state || 'N/A'} />
                                </div>
                            </div>
                        )}

                        {/* 6. SETTINGS */}
                        {activeTab === 'settings' && (
                            <div className="bg-gray-800 p-8 rounded-xl text-center text-gray-400">
                                <IoSettingsSharp className="text-4xl mx-auto mb-4"/>
                                <button 
                                    onClick={() => {
                                        localStorage.removeItem('user');
                                        setAuthUser(null);
                                        navigate('/login');
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
                                >
                                    <IoLogOut /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-component for info display
const InfoItem = ({ label, value, capitalize }) => (
    <div className="border-b border-gray-700 pb-2">
        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{label}</p>
        <p className={`font-medium text-lg ${capitalize ? 'capitalize' : ''}`}>{value}</p>
    </div>
);

export default Profile;