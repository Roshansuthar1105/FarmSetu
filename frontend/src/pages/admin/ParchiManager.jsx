import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { FaCogs, FaCalendarCheck, FaPlus, FaCheck, FaTimes, FaWater } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ParchiManager = () => {
    const { BACKEND_URL } = useAuthContext();
    const [activeTab, setActiveTab] = useState('requests'); // 'sources', 'requests', 'roster'
    
    // State for Requests
    const [pendingRequests, setPendingRequests] = useState([]);
    
    // State for New Source
    const [newSource, setNewSource] = useState({ sourceId: '', village: '', capacityLPH: 5000, startHour: 6, endHour: 18 });
    
    // State for Roster
    const [allSources, setAllSources] = useState([]); // List of sources for dropdown
    const [sourceId, setSourceId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [generatedSchedule, setGeneratedSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- Helper: Get Token ---
    const getToken = () => {
        const userStr = localStorage.getItem("user");
        return userStr ? JSON.parse(userStr).token : null;
    };

    // --- Fetch Pending Requests ---
    const fetchRequests = async () => {
        try {
            const token = getToken();
            const res = await fetch(`${BACKEND_URL}/api/parchi/admin/requests`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setPendingRequests(await res.json());
        } catch (error) {
            console.error(error);
        }
    };

    // --- Fetch All Sources (For Dropdown) ---
    const fetchSources = async () => {
        try {
            const token = getToken();
            const res = await fetch(`${BACKEND_URL}/api/parchi/sources`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setAllSources(data);
            }
        } catch (error) {
            console.error("Error fetching sources", error);
        }
    };

    // --- Effect: Load Data based on Tab ---
    useEffect(() => {
        if (activeTab === 'requests') fetchRequests();
        if (activeTab === 'roster') fetchSources(); // Fetch sources when Roster tab is active
    }, [activeTab]);

    // --- Action: Add Source ---
    const handleAddSource = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = getToken();
            const res = await fetch(`${BACKEND_URL}/api/parchi/source`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newSource)
            });
            if (res.ok) {
                toast.success("Water Source Added!");
                setNewSource({ sourceId: '', village: '', capacityLPH: 5000, startHour: 6, endHour: 18 });
            } else {
                toast.error("Failed to add source");
            }
        } catch(err) { toast.error("Server Error"); }
        setLoading(false);
    };

    // --- Action: Approve/Reject Request ---
    const handleRequestAction = async (requestId, status) => {
        try {
            const token = getToken();
            const res = await fetch(`${BACKEND_URL}/api/parchi/admin/request-status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ requestId, status })
            });
            
            if (res.ok) {
                toast.success(`Request ${status}`);
                fetchRequests(); // Refresh list
            }
        } catch (error) {
            toast.error("Action failed");
        }
    };

    // --- Action: Generate Roster ---
    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!sourceId || !startDate) return toast.error("Select a Source and Date");
        setLoading(true);
        try {
            const token = getToken();
            const res = await fetch(`${BACKEND_URL}/api/parchi/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ waterSourceId: sourceId, startDate })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(`Generated ${data.count} slots.`);
                setGeneratedSchedule(data.schedule);
            } else {
                toast.error(data.error || "Failed to generate schedule");
            }
        } catch (error) { toast.error("Server error"); }
        setLoading(false);
    };

    return (
        <div className="space-y-6 animate-fade-in-up pb-10">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <FaCogs className="mr-3 text-green-500" /> Water Allocation Manager
            </h1>

            {/* TABS */}
            <div className="flex space-x-4 border-b border-gray-700 pb-1">
                {['requests', 'sources', 'roster'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium capitalize transition-colors ${
                            activeTab === tab 
                            ? 'text-green-400 border-b-2 border-green-400' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {tab === 'requests' ? 'Pending Requests' : tab === 'sources' ? 'Add Water Source' : 'Generate Roster'}
                    </button>
                ))}
            </div>

            {/* --- TAB: REQUESTS --- */}
            {activeTab === 'requests' && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="text-lg font-semibold text-white">Farmer Water Requests</h3>
                    </div>
                    {pendingRequests.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No pending requests found.</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-3">Farmer</th>
                                    <th className="px-6 py-3">Source</th>
                                    <th className="px-6 py-3">Requested Date</th>
                                    <th className="px-6 py-3">Reason</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {pendingRequests.map(req => (
                                    <tr key={req._id} className="hover:bg-gray-700/50">
                                        <td className="px-6 py-4 text-white">
                                            <div className="font-bold">{req.farmer?.name}</div>
                                            <div className="text-xs text-gray-400">{req.farmer?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{req.waterSource?.village} ({req.waterSource?.sourceId})</td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {new Date(req.preferredDate).toLocaleString()} <br/>
                                            <span className="text-xs text-blue-400">{req.durationMinutes} mins</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 italic">"{req.reason}"</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleRequestAction(req._id, 'approved')} className="text-green-400 hover:text-green-300"><FaCheck size={18} /></button>
                                            <button onClick={() => handleRequestAction(req._id, 'rejected')} className="text-red-400 hover:text-red-300"><FaTimes size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* --- TAB: ADD SOURCES --- */}
            {activeTab === 'sources' && (
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 max-w-2xl">
                    <h3 className="text-lg font-semibold text-white mb-4">Register New Water Resource</h3>
                    <form onSubmit={handleAddSource} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Source ID (Unique)</label>
                                <input type="text" placeholder="e.g. WELL-RJ-01" required
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                    value={newSource.sourceId} onChange={e => setNewSource({...newSource, sourceId: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Village/Location</label>
                                <input type="text" placeholder="e.g. Rampur" required
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                    value={newSource.village} onChange={e => setNewSource({...newSource, village: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Capacity (Liters/Hour)</label>
                            <input type="number" placeholder="5000" required
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                value={newSource.capacityLPH} onChange={e => setNewSource({...newSource, capacityLPH: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Start Hour (24h)</label>
                                <input type="number" placeholder="6" required
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                    value={newSource.startHour} onChange={e => setNewSource({...newSource, startHour: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">End Hour (24h)</label>
                                <input type="number" placeholder="18" required
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                    value={newSource.endHour} onChange={e => setNewSource({...newSource, endHour: e.target.value})}
                                />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mt-2">
                            {loading ? 'Adding...' : 'Add Water Source'}
                        </button>
                    </form>
                </div>
            )}

            {/* --- TAB: ROSTER (UPDATED WITH DROPDOWN) --- */}
            {activeTab === 'roster' && (
                <div className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Generate Weekly Roster</h3>
                        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Select Water Source</label>
                                <select 
                                    value={sourceId} 
                                    onChange={(e) => setSourceId(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
                                >
                                    <option value="">-- Choose Source --</option>
                                    {allSources.length > 0 ? (
                                        allSources.map(s => (
                                            <option key={s._id} value={s._id}>
                                                {s.village} ({s.sourceId})
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>Loading sources...</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Cycle Start Date</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded flex items-center justify-center">
                                {loading ? 'Processing...' : <><FaCalendarCheck className="mr-2" /> Generate</>}
                            </button>
                        </form>
                    </div>
                    {/* Schedule Table */}
                    {generatedSchedule.length > 0 && (
                        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                                <h3 className="text-green-400 font-bold">Generated Roster Preview</h3>
                                <span className="text-xs text-gray-500">{generatedSchedule.length} slots created</span>
                            </div>
                            <table className="w-full text-left text-sm text-gray-300">
                                <thead className="bg-gray-900 text-xs uppercase">
                                    <tr><th className="p-3">Start Time</th><th className="p-3">End Time</th><th className="p-3">Farmer ID</th></tr>
                                </thead>
                                <tbody>
                                    {generatedSchedule.map((s, i) => (
                                        <tr key={i} className="border-t border-gray-700 hover:bg-gray-700/30">
                                            <td className="p-3">{new Date(s.startTime).toLocaleString()}</td>
                                            <td className="p-3">{new Date(s.endTime).toLocaleTimeString()}</td>
                                            <td className="p-3 font-mono text-xs">{s.farmer}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ParchiManager;