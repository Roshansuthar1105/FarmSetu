import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { FaCogs, FaCalendarCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ParchiManager = () => {
    const { BACKEND_URL } = useAuthContext();
    const [sourceId, setSourceId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [generatedSchedule, setGeneratedSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!sourceId || !startDate) {
            toast.error("Please provide Source ID and Start Date");
            return;
        }

        setLoading(true);
        try {
            // --- FIX START: Correct Token Extraction ---
            const userStr = localStorage.getItem("user");
            let token = null;
            if (userStr) {
                token = JSON.parse(userStr).token;
            }
            console.log(userStr,token)
            if (!token) {
                toast.error("Admin token missing. Please login again.");
                return;
            }
            // --- FIX END ---

            const res = await fetch(`${BACKEND_URL}/api/parchi/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Use the extracted token
                },
                body: JSON.stringify({ waterSourceId: sourceId, startDate })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                toast.success(`Success! Generated ${data.count} slots.`);
                setGeneratedSchedule(data.schedule);
            } else {
                toast.error(data.error || "Generation failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <FaCogs className="mr-3 text-green-500" /> Allocation Manager
            </h1>
            <p className="text-gray-400 mb-8">Generate weekly irrigation rosters based on landholding data.</p>

            {/* Generation Form */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Generate Roster</h3>
                <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    
                    {/* Input: Water Source ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Water Source ID (DB ID)</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={sourceId}
                                onChange={(e) => setSourceId(e.target.value)}
                                placeholder="e.g. 64f8a..." 
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Input: Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Cycle Start Date</label>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-medium py-2.5 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        ) : <FaCalendarCheck className="mr-2" />}
                        Generate Schedule
                    </button>
                </form>
            </div>

            {/* Results Table */}
            {generatedSchedule.length > 0 && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg mt-8">
                    <div className="px-6 py-4 bg-gray-750 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-green-400">Generated Schedule Preview</h3>
                        <span className="text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded">Total Slots: {generatedSchedule.length}</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-3">Start Time</th>
                                    <th className="px-6 py-3">End Time</th>
                                    <th className="px-6 py-3">Farmer ID</th>
                                    <th className="px-6 py-3">Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {generatedSchedule.map((slot, idx) => (
                                    <tr key={idx} className="hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-white">
                                            {new Date(slot.startTime).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300">
                                            {new Date(slot.endTime).toLocaleTimeString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                                            {slot.farmer}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-green-400 font-medium">
                                            {slot.durationMinutes} min
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParchiManager;