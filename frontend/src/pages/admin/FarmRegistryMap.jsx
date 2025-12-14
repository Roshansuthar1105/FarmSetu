import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuthContext } from '../../context/AuthContext';
import { FaTractor, FaPhone } from 'react-icons/fa';
import L from 'leaflet';

// Fix Leaflet Icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const FarmRegistryMap = () => {
  const { BACKEND_URL, authUser } = useAuthContext();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ALL users (which includes their farms)
        const res = await fetch(`${BACKEND_URL}/api/admin/users?role=farmer`, {
            headers: { 'Authorization': `Bearer ${authUser?.token}` }
        });
        const data = await res.json();
        setFarmers(data);
      } catch (err) {
        console.error("Failed to load map data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [BACKEND_URL, authUser]);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col space-y-4">
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
        <div>
            <h1 className="text-2xl font-bold text-white">Global Farm Registry</h1>
            <p className="text-gray-400 text-sm">Interactive map of all registered farm plots and soil health data.</p>
        </div>
        <div className="bg-gray-700 px-4 py-2 rounded-lg">
            <span className="text-gray-400 text-sm">Total Active Plots: </span>
            <span className="text-green-400 font-bold ml-2">
                {farmers.reduce((acc, user) => acc + (user.farms?.length || 0), 0)}
            </span>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border-2 border-gray-700 relative shadow-2xl z-0">
        {loading ? (
            <div className="flex items-center justify-center h-full bg-gray-900 text-white">Loading geospatial data...</div>
        ) : (
            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {farmers.map((user) => (
                user.farms?.map((farm, idx) => {
                    // Only map if coordinates exist
                    if(farm.location?.coordinates && farm.location.coordinates.length === 2) {
                        return (
                            <Marker 
                                key={`${user._id}-${idx}`} 
                                position={[farm.location.coordinates[1], farm.location.coordinates[0]]} // [Lat, Lng]
                            >
                                <Popup>
                                    <div className="min-w-[200px]">
                                        <h3 className="font-bold text-lg text-gray-800 border-b pb-1 mb-2 flex items-center">
                                            <FaTractor className="mr-2 text-green-600"/> {farm.farmName}
                                        </h3>
                                        
                                        <div className="text-sm text-gray-600 mb-2">
                                            <strong>Owner:</strong> {user.name} <br/>
                                            <div className="flex items-center mt-1">
                                                <FaPhone className="mr-1 text-gray-400" size={10}/> {user.mobileNumber || "N/A"}
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 p-2 rounded text-xs grid grid-cols-2 gap-2">
                                            <div><strong>Area:</strong> {farm.area} {farm.areaUnit}</div>
                                            <div><strong>pH:</strong> <span className={farm.soilHealth?.phLevel < 6 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>{farm.soilHealth?.phLevel}</span></div>
                                            <div><strong>Nitrogen:</strong> {farm.soilHealth?.nitrogen}</div>
                                            <div><strong>Phosphorus:</strong> {farm.soilHealth?.phosphorus}</div>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }
                    return null;
                })
            ))}
            </MapContainer>
        )}
      </div>
    </div>
  );
};

export default FarmRegistryMap;