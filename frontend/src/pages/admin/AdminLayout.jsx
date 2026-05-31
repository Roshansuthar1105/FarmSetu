// layouts/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { 
  FaTachometerAlt, 
  FaMapMarkedAlt, 
  FaSeedling, 
  FaUsers, 
  FaClipboardList, 
  FaRobot, 
  FaEnvelope, 
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaBell,
  FaUserCircle,
  FaCog,
  FaQuestionCircle
} from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Check if route is active
  const isActive = (path) => {
    return location.pathname === `/admin${path}` || location.pathname === `/admin${path}/`;
  };

  // Navigation items
  const navItems = [
    { path: '', name: 'Dashboard', icon: <MdDashboard /> },
    { path: '/users', name: 'User Management', icon: <FaUsers /> },
    { path: '/heatmap', name: 'Farm Registry Map', icon: <FaMapMarkedAlt /> },
    { path: '/schemes', name: 'Scheme Targeter', icon: <FaSeedling /> },
    { path: '/parchi-manager', name: 'Irrigation Allocator', icon: <FaClipboardList /> },
    { path: '/ml-reports', name: 'AI & ML Registry', icon: <FaRobot /> },
    { path: '/newsletter', name: 'Newsletter Manager', icon: <FaEnvelope /> },
  ];

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-950 shadow-2xl transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo Area */}
        <div className={`flex items-center justify-between p-5 border-b border-gray-700 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-white font-bold text-lg">FarmSetu Admin</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">F</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={`/admin${item.path}`}
              className={`flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className={`text-xl ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`}>
                {item.icon}
              </span>
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`flex items-center w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 mb-3 ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            {sidebarCollapsed ? <FaChevronRight /> : <><FaChevronLeft className="mr-2" /> Collapse</>}
          </button>
          
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200 ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <FaSignOutAlt className={`${sidebarCollapsed ? '' : 'mr-2'}`} />
            {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Top Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
          <div className="px-6 py-3 flex justify-between items-center">
            {/* Page Title */}
            <div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                {navItems.find(item => isActive(item.path))?.name || 'Dashboard'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getGreeting()}, {authUser?.name?.split(' ')[0] || 'Admin'}
              </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <FaBell className="text-lg" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <img
                    src={authUser?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {authUser?.name || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {authUser?.role || 'Administrator'}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{authUser?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{authUser?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FaUserCircle className="mr-3 text-gray-400" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FaCog className="mr-3 text-gray-400" />
                        Settings
                      </Link>
                      <Link
                        to="/help"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FaQuestionCircle className="mr-3 text-gray-400" />
                        Help & Support
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;