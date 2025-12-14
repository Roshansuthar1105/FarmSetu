import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaArrowLeft, FaThermometerHalf, FaTint, FaFlask, FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';

// Leaflet Icon Fix
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const MLReportDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { BACKEND_URL, authUser } = useAuthContext();
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/admin/ml-report/${id}`, {
                    headers: { 'Authorization': `Bearer ${authUser?.token}` }
                });
                const data = await res.json();
                console.log("user data ",data)
                setReport(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchReport();
    }, [id, BACKEND_URL, authUser]);

    if (!report) return <div className="p-10 text-white text-center">Loading Report...</div>;

    // Check if coordinates exist in inputData (some old records might not have them)
    const hasLocation = report.inputData?.latitude && report.inputData?.longitude;

    return (
        <div className="space-y-6 animate-fade-in-up pb-10">
            <button onClick={() => navigate('/admin/ml-reports')} className="text-gray-400 hover:text-white flex items-center mb-4">
                <FaArrowLeft className="mr-2" /> Back to Registry
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Main Result Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-800 rounded-xl p-8 border-l-4 border-green-500 shadow-xl">
                        <h2 className="text-gray-400 text-sm uppercase font-bold mb-1">Prediction Result</h2>
                        <h1 className="text-4xl font-bold text-white capitalize mb-4">
                            {report.type === 'crop_recommendation' ? report.predictionResult?.predicted_crop : report.predictionResult?.disease}
                        </h1>
                        <div className="flex items-center gap-4">
                            <img src={report.user?.avatar} className="w-10 h-10 rounded-full border border-gray-600" alt="user" />
                            <div>
                                <p className="text-white font-medium">{report.user?.name}</p>
                                <p className="text-xs text-gray-500">{new Date(report.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Input Data Visualization */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2">Input Parameters Analyzed</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatBox label="Nitrogen" value={report.inputData.nitrogen} icon={<FaFlask className="text-blue-400"/>} />
                            <StatBox label="Phosphorus" value={report.inputData.phosphorus} icon={<FaFlask className="text-purple-400"/>} />
                            <StatBox label="Potassium" value={report.inputData.potassium} icon={<FaFlask className="text-yellow-400"/>} />
                            <StatBox label="pH Level" value={report.inputData.ph} icon={<FaFlask className="text-green-400"/>} />
                            <StatBox label="Temperature" value={`${report.inputData.temperature}°C`} icon={<FaThermometerHalf className="text-red-400"/>} />
                            <StatBox label="Humidity" value={`${report.inputData.humidity}%`} icon={<FaTint className="text-blue-300"/>} />
                            <StatBox label="Rainfall" value={`${report.inputData.rainfall}mm`} icon={<FaTint className="text-cyan-400"/>} />
                        </div>
                    </div>
                </div>

                {/* 2. Map & Location Side Panel */}
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col">
                        <h3 className="text-white font-bold mb-4 flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-red-500"/> Field Location
                        </h3>
                        
                        <div className="flex-1 min-h-[300px] rounded-lg overflow-hidden border border-gray-600 relative z-0">
                            {hasLocation ? (
                                <MapContainer 
                                    center={[report.inputData.latitude, report.inputData.longitude]} 
                                    zoom={13} 
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[report.inputData.latitude, report.inputData.longitude]}>
                                        <Popup>Analyzed Field Location</Popup>
                                    </Marker>
                                </MapContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500 bg-gray-900">
                                    No GPS Data Recorded
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-400">
                            <p><strong>Village:</strong> {report.user?.address?.village || 'N/A'}</p>
                            <p><strong>District:</strong> {report.user?.address?.district || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ label, value, icon }) => (
    <div className="bg-gray-700/30 p-3 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 uppercase">{label}</span>
            {icon}
        </div>
        <div className="text-lg font-bold text-white">{value || "N/A"}</div>
    </div>
);

export default MLReportDetail;