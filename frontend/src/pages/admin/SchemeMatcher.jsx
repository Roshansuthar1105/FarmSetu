import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { FaSearch, FaEnvelope, FaFileDownload, FaLeaf, FaMapMarkerAlt } from 'react-icons/fa';

const SchemeMatcher = () => {
  const { BACKEND_URL } = useAuthContext();
  const [criteria, setCriteria] = useState({ maxPh: '', city: '' });
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/schemes/match`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie}` 
        },
        body: JSON.stringify({ criteria })
      });
      const data = await res.json();
      setBeneficiaries(data);
    } catch (err) {
      console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-white">Targeted Scheme Distribution</h1>
            <p className="text-gray-400 mt-1">Identify eligible farmers based on soil health and location.</p>
        </div>
      </div>
      
      {/* Filter Panel */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
            <FaSearch className="mr-2" /> Find Eligible Beneficiaries
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">Max Soil pH (Acidic Soil Scheme)</label>
            <input 
              type="number" 
              className="w-full bg-gray-900 border border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={criteria.maxPh}
              onChange={(e) => setCriteria({...criteria, maxPh: e.target.value})}
              placeholder="e.g., 6.0"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">Region Filter (City)</label>
            <input 
              type="text" 
              className="w-full bg-gray-900 border border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={criteria.city}
              onChange={(e) => setCriteria({...criteria, city: e.target.value})}
              placeholder="e.g., Jaipur"
            />
          </div>
          <button 
            onClick={handleMatch}
            disabled={loading}
            className="h-[50px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg shadow-lg flex items-center justify-center transition-all disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Find Eligible Farmers"}
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
            <h3 className="font-semibold text-gray-200">Search Results ({beneficiaries.length})</h3>
            {beneficiaries.length > 0 && (
                <button className="text-sm text-green-400 flex items-center hover:text-green-300">
                    <FaFileDownload className="mr-2" /> Export CSV
                </button>
            )}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-900 uppercase text-xs font-semibold text-gray-400">
                <tr>
                <th className="p-4">Farmer Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Location</th>
                <th className="p-4">Farm Details</th>
                <th className="p-4">Detected Issue</th>
                <th className="p-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
                {beneficiaries.map((user) => (
                <tr key={user._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 font-medium text-white flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-900 text-green-400 flex items-center justify-center font-bold mr-3 border border-green-700">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        {user.name}
                    </td>
                    <td className="p-4">
                        <div className="text-sm text-white">{user.mobileNumber || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="p-4 text-sm">
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-gray-500"/>
                            {user.address?.city || 'Unknown'}, {user.address?.district}
                        </div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center text-sm">
                            <FaLeaf className="mr-2 text-green-500"/> 
                            {user.farms?.length || 0} Plots
                        </div>
                    </td>
                    <td className="p-4">
                        {/* Display the pH of the first farm as an example indicator */}
                        {user.farms && user.farms.length > 0 ? (
                            <span className={`font-medium px-2 py-1 rounded text-xs ${user.farms[0].soilHealth?.phLevel < 6 ? 'bg-yellow-400/20 text-yellow-400' : 'bg-green-400/20 text-green-400'}`}>
                                pH: {user.farms[0].soilHealth?.phLevel}
                            </span>
                        ) : (
                            <span className="text-gray-500 text-xs">No Data</span>
                        )}
                    </td>
                    <td className="p-4 text-right">
                    <button className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-lg transition-colors" title="Send Notification">
                        <FaEnvelope />
                    </button>
                    </td>
                </tr>
                ))}
                
                {beneficiaries.length === 0 && !loading && (
                <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-500 italic">
                        {hasSearched ? "No farmers found matching these criteria." : "Enter criteria above to start searching."}
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default SchemeMatcher;