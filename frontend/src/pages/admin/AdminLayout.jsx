import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { FaMapMarkedAlt, FaSeedling, FaUsers, FaSignOutAlt, FaChartPie, FaClipboardList } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { FaRobot } from 'react-icons/fa';
const AdminLayout = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthUser(null);
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col border-r border-gray-700 shadow-xl z-20">
        <div className="p-6 border-b border-gray-700 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                FarmSetu Admin
            </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          <Link to="/admin" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all group">
            <MdDashboard className="mr-3 text-xl group-hover:text-green-400" /> 
            <span className="font-medium">Dashboard Overview</span>
          </Link>
          <Link to="/admin/heatmap" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all group">
            <FaMapMarkedAlt className="mr-3 text-xl group-hover:text-blue-400" /> 
            <span className="font-medium">Kisan Registry Map</span>
          </Link>
          <Link to="/admin/schemes" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all group">
            <FaSeedling className="mr-3 text-xl group-hover:text-yellow-400" /> 
            <span className="font-medium">Scheme Targeter</span>
          </Link>
          <Link to="/admin/users" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all group">
            <FaUsers className="mr-3 text-xl group-hover:text-purple-400" /> 
            <span className="font-medium">User Management</span>
          </Link>
          <Link to="/admin/parchi-manager" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all group">
            <FaClipboardList className="mr-3 text-xl group-hover:text-cyan-400" /> 
            <span className="font-medium">Irrigation Allocator</span>
          </Link>
          <Link to="/admin/ml-reports" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all group">
            <FaRobot className="mr-3 text-xl group-hover:text-pink-400" /> 
            <span className="font-medium">AI & ML Registry</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-900 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="p-8 relative z-10">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;