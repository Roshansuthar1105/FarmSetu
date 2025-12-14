import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEye, FaLeaf, FaBug, FaRobot } from 'react-icons/fa';

const MLActivityLog = () => {
    const { BACKEND_URL, authUser } = useAuthContext();
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/admin/ml-reports`, {
                    headers: { 'Authorization': `Bearer ${authUser?.token}` }
                });
                const data = await res.json();
                console.log("object",data)
                if (Array.isArray(data)) {
                    setLogs(data);
                    setFilteredLogs(data);
                }
            } catch (err) {
                console.error("Failed to fetch logs", err);
            } finally {
                setLoading(false);
            }
        };
        if (authUser) fetchLogs();
    }, [BACKEND_URL, authUser]);

    useEffect(() => {
        if (filterType === 'all') {
            setFilteredLogs(logs);
        } else {
            setFilteredLogs(logs.filter(log => log.type === filterType));
        }
    }, [filterType, logs]);

    const getTypeIcon = (type) => {
        if (type === 'crop_recommendation') return <FaLeaf className="text-green-500" />;
        if (type === 'disease_detection') return <FaBug className="text-red-500" />;
        return <FaRobot className="text-blue-500" />;
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">AI Prediction Registry</h1>
                    <p className="text-gray-400 mt-1">Monitor real-time ML model usage across the platform.</p>
                </div>
                <div className="bg-gray-800 p-1 rounded-lg flex space-x-1 border border-gray-700">
                    <button 
                        onClick={() => setFilterType('all')}
                        className={`px-4 py-2 rounded-md text-sm transition ${filterType === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilterType('crop_recommendation')}
                        className={`px-4 py-2 rounded-md text-sm transition ${filterType === 'crop_recommendation' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Crop Rec.
                    </button>
                    <button 
                        onClick={() => setFilterType('disease_detection')}
                        className={`px-4 py-2 rounded-md text-sm transition ${filterType === 'disease_detection' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Disease
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-900 text-xs uppercase font-semibold text-gray-400">
                        <tr>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Farmer</th>
                            <th className="p-4">Model Type</th>
                            <th className="p-4">Prediction Result</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {loading ? <tr><td colSpan="5" className="p-6 text-center">Loading data...</td></tr> : 
                         filteredLogs.map(log => (
                            <tr key={log._id} className="hover:bg-gray-700/50 transition">
                                <td className="p-4 text-sm text-gray-400">
                                    {new Date(log.createdAt).toLocaleString()}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <img src={log.user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-8 h-8 rounded-full mr-3" alt="avatar"/>
                                        <span className="font-medium text-white">{log.user?.name || "Unknown"}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 capitalize bg-gray-900 w-fit px-3 py-1 rounded-full text-xs font-medium border border-gray-700">
                                        {getTypeIcon(log.type)} {log.type.replace('_', ' ')}
                                    </div>
                                </td>
                                <td className="p-4 font-bold text-white">
                                    {log.type === 'crop_recommendation' ? log.predictionResult?.predicted_crop : log.predictionResult?.disease}
                                </td>
                                <td className="p-4 text-center">
                                    <button 
                                        onClick={() => navigate(`/admin/ml-report/${log._id}`)}
                                        className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-lg transition"
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MLActivityLog;