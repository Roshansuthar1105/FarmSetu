import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Essential for map rendering
import { useAuthContext } from '../../context/AuthContext';

const RegistryHeatmap = () => {
  const { BACKEND_URL } = useAuthContext();
  const [points, setPoints] = useState([]);
  const [filter, setFilter] = useState('ph'); // 'ph', 'nitrogen', 'disease'

  useEffect(() => {
    // 1. Fetch Heatmap Data from Backend
    const fetchMapData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/heatmap?parameter=${filter}`, {
            headers: { 'Authorization': `Bearer ${document.cookie}` } // Send cookies/token if needed
        }); 
        if(res.ok){
            const data = await res.json();
            setPoints(data);
        }
      } catch (err) {
        console.error("Failed to load map data", err);
      }
    };
    fetchMapData();
  }, [filter, BACKEND_URL]);

  // Color Scale Logic
  const getColor = (val) => {
    if (filter === 'disease') return val > 5 ? '#ef4444' : '#22c55e'; // Red (High disease) vs Green (Safe)
    if (filter === 'ph') return val < 5.5 || val > 7.5 ? '#eab308' : '#22c55e'; // Yellow (Bad pH) vs Green (Neutral)
    return `rgba(59, 130, 246, ${val/100})`; // Blue gradient for Nitrogen
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col space-y-4">
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl shadow-md">
        <div>
            <h1 className="text-2xl font-bold text-white">Kisan Registry Visualization</h1>
            <p className="text-gray-400 text-sm">Geospatial analysis of soil health and active diseases</p>
        </div>
        
        <div className="flex items-center space-x-4">
            <span className="text-gray-300 font-medium">Data Layer:</span>
            <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
            >
            <option value="ph">Soil pH Level</option>
            <option value="nitrogen">Nitrogen Levels</option>
            <option value="disease">Active Disease Outbreaks</option>
            </select>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border-2 border-gray-700 relative shadow-2xl">
        <MapContainer center={[26.9124, 75.7873]} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.map((pt, idx) => (
            <CircleMarker 
              key={idx} 
              center={[pt.lat, pt.lng]} 
              radius={10}
              pathOptions={{ 
                  color: 'white', 
                  weight: 1,
                  fillColor: getColor(pt.weight), 
                  fillOpacity: 0.8 
              }}
            >
              <Popup className="text-black">
                <div className="font-bold text-sm mb-1 uppercase text-gray-600">{filter} Reading</div>
                <div className="text-lg font-bold">{pt.weight}</div>
                <div className="text-xs text-gray-500 mt-1">Lat: {pt.lat.toFixed(4)}, Lng: {pt.lng.toFixed(4)}</div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        
        {/* Floating Legend */}
        <div className="absolute bottom-6 right-6 bg-gray-900/90 backdrop-blur-md p-4 rounded-lg shadow-xl z-[1000] border border-gray-700">
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Legend</h4>
            <div className="space-y-2">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> <span className="text-gray-300 text-xs">Healthy / Optimal</span></div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span> <span className="text-gray-300 text-xs">Warning / Acidic</span></div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span> <span className="text-gray-300 text-xs">Critical / Diseased</span></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryHeatmap;