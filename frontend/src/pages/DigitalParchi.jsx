import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { FaWater, FaClock, FaCalendarAlt, FaHistory, FaPlus, FaTimes, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import toast from "react-hot-toast";

const DigitalParchi = () => {
  const { BACKEND_URL, authUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState('turns'); // 'turns' or 'requests'

  // Data State
  const [myTurns, setMyTurns] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [liveStatus, setLiveStatus] = useState(null);
  const [availableSources, setAvailableSources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestData, setRequestData] = useState({ sourceId: "", date: "", duration: 60, reason: "" });

  // --- 1. Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = userStr ? JSON.parse(userStr).token : null;
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        // Parallel Fetch
        const [turnsRes, reqRes, liveRes, sourcesRes] = await Promise.all([
            fetch(`${BACKEND_URL}/api/parchi/my-turns`, { headers }),
            fetch(`${BACKEND_URL}/api/parchi/my-requests`, { headers }),
            fetch(`${BACKEND_URL}/api/parchi/live`, { headers }),
            fetch(`${BACKEND_URL}/api/parchi/sources`, { headers }) // Fetch all sources
        ]);

        if (turnsRes.ok) setMyTurns(await turnsRes.json());
        if (reqRes.ok) setMyRequests(await reqRes.json());
        if (liveRes.ok) setLiveStatus(await liveRes.json());
        if (sourcesRes.ok) setAvailableSources(await sourcesRes.json());

      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [BACKEND_URL]);

  // --- 2. Handle Application ---
  const handleApply = async (e) => {
    e.preventDefault();
    if(!requestData.sourceId) return toast.error("Please select a water source");

    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      const res = await fetch(`${BACKEND_URL}/api/parchi/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          waterSourceId: requestData.sourceId,
          preferredDate: requestData.date,
          durationMinutes: requestData.duration,
          reason: requestData.reason,
          farmerId: authUser?._id
        }),
      });

      if (res.ok) {
        toast.success("Request Submitted! Waiting for approval.");
        setIsModalOpen(false);
        // Refresh requests
        const reqRes = await fetch(`${BACKEND_URL}/api/parchi/my-requests`, { 
            headers: { Authorization: `Bearer ${token}` } 
        });
        setMyRequests(await reqRes.json());
        setActiveTab('requests'); // Switch to requests tab
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed");
      }
    } catch (err) { toast.error("Server Error"); }
  };

  if (loading) return <div className="text-white text-center pt-20">Loading Parchi System...</div>;

  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-4 pb-12 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Digital Parchi
            </h1>
            <p className="text-gray-400 mt-1">Manage irrigation turns & requests</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center shadow-lg">
             <FaPlus className="mr-2" /> Request Water
          </button>
        </div>

        {/* Live Status Widget (Same as before, abbreviated) */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
             <h2 className="text-xl font-bold mb-2 flex items-center">
                <span className={`w-3 h-3 rounded-full mr-3 ${liveStatus?.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                Live Status: {liveStatus?.status || "Idle"}
             </h2>
             {liveStatus?.status === 'Active' && (
                 <div className="text-gray-300">
                     Current User: <span className="text-green-400 font-bold">{liveStatus.currentFarmer?.name}</span> <br/>
                     Ends at: {new Date(liveStatus.endsAt).toLocaleTimeString()}
                 </div>
             )}
        </div>

        {/* Tabs for Turns vs Requests */}
        <div className="flex space-x-6 border-b border-gray-700">
            <button onClick={() => setActiveTab('turns')} className={`pb-2 ${activeTab === 'turns' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'}`}>
                Upcoming Allocations
            </button>
            <button onClick={() => setActiveTab('requests')} className={`pb-2 ${activeTab === 'requests' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'}`}>
                My Request History
            </button>
        </div>

        {/* CONTENT AREA */}
        {activeTab === 'turns' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myTurns.length > 0 ? myTurns.map(turn => (
                    <div key={turn._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition">
                        <div className="text-xs text-green-400 border border-green-900 bg-green-900/20 px-2 py-1 rounded w-fit mb-3">SCHEDULED</div>
                        <h3 className="text-lg font-bold">{new Date(turn.startTime).toDateString()}</h3>
                        <p className="text-3xl font-light text-white my-2">{new Date(turn.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        <p className="text-gray-400 text-sm">Duration: {turn.durationMinutes} mins</p>
                        <p className="text-gray-500 text-xs mt-2">Source: {turn.waterSource?.village}</p>
                    </div>
                )) : <p className="text-gray-500 col-span-3 text-center py-10">No upcoming turns scheduled.</p>}
            </div>
        ) : (
            <div className="space-y-4">
                {myRequests.length > 0 ? myRequests.map(req => (
                    <div key={req._id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                        <div>
                            <div className="text-white font-bold">{new Date(req.preferredDate).toLocaleString()}</div>
                            <div className="text-sm text-gray-400">Source: {req.waterSource?.village} | Duration: {req.durationMinutes}m</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center ${
                            req.status === 'approved' ? 'bg-green-900 text-green-400' : 
                            req.status === 'rejected' ? 'bg-red-900 text-red-400' : 'bg-yellow-900 text-yellow-400'
                        }`}>
                            {req.status === 'approved' && <FaCheckCircle className="mr-2"/>}
                            {req.status === 'pending' && <FaHourglassHalf className="mr-2"/>}
                            {req.status === 'rejected' && <FaTimes className="mr-2"/>}
                            {req.status}
                        </div>
                    </div>
                )) : <p className="text-gray-500 text-center py-10">No requests history found.</p>}
            </div>
        )}

        {/* MODAL */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-600">
                    <h3 className="text-xl font-bold mb-4">Request Water</h3>
                    <form onSubmit={handleApply} className="space-y-4">
                        
                        {/* Source Selector */}
                        <div>
                            <label className="block text-xs text-gray-400 uppercase mb-1">Select Water Source</label>
                            <select 
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
                                onChange={(e) => setRequestData({...requestData, sourceId: e.target.value})}
                            >
                                <option value="">-- Choose Source --</option>
                                {availableSources.map(s => (
                                    <option key={s._id} value={s._id}>{s.village} ({s.sourceId})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 uppercase mb-1">Date & Time</label>
                            <input type="datetime-local" required className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
                                onChange={(e) => setRequestData({...requestData, date: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 uppercase mb-1">Duration (Mins)</label>
                            <input type="number" defaultValue="60" min="30" max="180" className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
                                onChange={(e) => setRequestData({...requestData, duration: e.target.value})}
                            />
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-700 py-3 rounded text-white">Cancel</button>
                            <button type="submit" className="flex-1 bg-green-600 py-3 rounded text-white font-bold">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default DigitalParchi;