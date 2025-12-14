import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTractor, FaLeaf } from 'react-icons/fa';
import { MdOutlineVerified } from "react-icons/md";

const AdminUserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { BACKEND_URL, authUser } = useAuthContext();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Reusing the public ID route, but admin context allows viewing anyone
                const res = await fetch(`${BACKEND_URL}/api/user/${id}`);
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("Failed to fetch user details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, [id, BACKEND_URL]);

    if (loading) return <div className="text-white p-10">Loading profile...</div>;
    if (!user) return <div className="text-white p-10">User not found.</div>;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <button 
                onClick={() => navigate('/admin/users')}
                className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
            >
                <FaArrowLeft className="mr-2" /> Back to User List
            </button>

            {/* Header Card */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20"></div>
                
                <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6">
                    <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-2xl z-10"
                    />
                    <div className="text-center md:text-left z-10 mb-2">
                        <h1 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                            {user.name} <MdOutlineVerified className="text-blue-400" />
                        </h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                            user.role === 'farmer' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'
                        }`}>
                            {user.role}
                        </span>
                        <p className="text-gray-400 text-sm mt-2">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar: Contact & Address */}
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                        <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center text-gray-300">
                                <div className="bg-gray-700 p-2 rounded-lg mr-3"><FaEnvelope className="text-blue-400"/></div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Email</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <div className="bg-gray-700 p-2 rounded-lg mr-3"><FaPhone className="text-green-400"/></div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Mobile</p>
                                    <p>{user.mobileNumber || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <div className="bg-gray-700 p-2 rounded-lg mr-3"><FaMapMarkerAlt className="text-red-400"/></div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Address</p>
                                    <p>{user.address?.village}, {user.address?.city}</p>
                                    <p className="text-xs text-gray-400">{user.address?.district}, {user.address?.state} - {user.address?.pincode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main: Farms / Data */}
                <div className="lg:col-span-2 space-y-6">
                    {user.role === 'farmer' && (
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                            <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2 flex items-center justify-between">
                                <span>Farm Portfolio</span>
                                <span className="bg-green-900 text-green-400 px-2 py-1 rounded text-xs">{user.farms?.length || 0} Farms</span>
                            </h3>

                            {user.farms && user.farms.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.farms.map((farm, idx) => (
                                        <div key={idx} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center">
                                                    <FaTractor className="text-green-500 mr-2 text-xl" />
                                                    <h4 className="font-bold text-white">{farm.farmName}</h4>
                                                </div>
                                                <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">{farm.area} {farm.areaUnit}</span>
                                            </div>
                                            
                                            <div className="text-xs text-gray-400 mb-3 flex items-center">
                                                <FaMapMarkerAlt className="mr-1" />
                                                {farm.location?.coordinates 
                                                    ? `${farm.location.coordinates[1].toFixed(4)}, ${farm.location.coordinates[0].toFixed(4)}`
                                                    : "Location not mapped"}
                                            </div>

                                            {/* Soil Stats Grid */}
                                            <div className="grid grid-cols-4 gap-2 text-center">
                                                <div className="bg-gray-800 p-1 rounded">
                                                    <p className="text-[10px] text-gray-500">pH</p>
                                                    <p className={`font-bold text-sm ${farm.soilHealth?.phLevel < 6 ? 'text-yellow-500' : 'text-green-400'}`}>
                                                        {farm.soilHealth?.phLevel}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-800 p-1 rounded">
                                                    <p className="text-[10px] text-gray-500">N</p>
                                                    <p className="font-bold text-white text-sm">{farm.soilHealth?.nitrogen}</p>
                                                </div>
                                                <div className="bg-gray-800 p-1 rounded">
                                                    <p className="text-[10px] text-gray-500">P</p>
                                                    <p className="font-bold text-white text-sm">{farm.soilHealth?.phosphorus}</p>
                                                </div>
                                                <div className="bg-gray-800 p-1 rounded">
                                                    <p className="text-[10px] text-gray-500">K</p>
                                                    <p className="font-bold text-white text-sm">{farm.soilHealth?.potassium}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    <FaLeaf className="text-4xl mx-auto mb-2 opacity-30" />
                                    <p>No farms registered for this user.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Placeholder for Recent Activity */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                         <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2">Recent System Activity</h3>
                         <p className="text-gray-500 italic">No recent login or transaction activity logs found.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDetails;