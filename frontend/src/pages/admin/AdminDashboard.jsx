// pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, AreaChart, Area 
} from 'recharts';
import { useAuthContext } from '../../context/AuthContext';
import { 
  FaUsers, FaLeaf, FaShoppingCart, FaExclamationTriangle, 
  FaUserPlus, FaChartLine, FaTractor, FaCalendarWeek, 
  FaArrowUp, FaArrowDown, FaDollarSign, FaSeedling,
  FaSpinner
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { BACKEND_URL, authUser } = useAuthContext();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, farmers: 0, sellers: 0, products: 0 });
  const [loading, setLoading] = useState(true);
  const [userGrowth, setUserGrowth] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userRes = await fetch(`${BACKEND_URL}/api/admin/users`, {
          headers: { 'Authorization': `Bearer ${authUser?.token}` }
        });
        const users = await userRes.json();
        
        if (Array.isArray(users)) {
          const farmers = users.filter(u => u.role === 'farmer').length;
          const sellers = users.filter(u => u.role === 'seller').length;
          const cooperatives = users.filter(u => u.role === 'cooperative').length;

          const prodRes = await fetch(`${BACKEND_URL}/api/products`);
          const products = await prodRes.json();
          const productCount = Array.isArray(products) ? products.length : 0;

          setStats({
            totalUsers: users.length,
            farmers,
            sellers,
            cooperatives,
            products: productCount
          });

          // Generate user growth data (last 7 days)
          const growth = [];
          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            growth.push({
              date: date.toLocaleDateString('en-US', { weekday: 'short' }),
              count: Math.floor(Math.random() * 50) + 10
            });
          }
          setUserGrowth(growth);

          // Get recent users (last 5)
          setRecentUsers(users.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [BACKEND_URL, authUser]);

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  const StatCard = ({ title, value, icon, color, trend, trendValue, onClick }) => (
    <div
      onClick={onClick}
      className={`${color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <FaArrowUp className="text-green-300 text-xs mr-1" />
              ) : (
                <FaArrowDown className="text-red-300 text-xs mr-1" />
              )}
              <span className="text-white/70 text-xs">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-green-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {authUser?.name?.split(' ')[0] || 'Admin'}!</h1>
            <p className="text-white/80">Here's what's happening with your platform today.</p>
          </div>
          <div className="hidden md:block">
            <FaChartLine className="text-5xl text-white/20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<FaUsers className="text-2xl text-white" />} 
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="up"
          trendValue="+12% from last month"
          onClick={() => navigate('/admin/users')}
        />
        <StatCard 
          title="Active Farmers" 
          value={stats.farmers} 
          icon={<FaLeaf className="text-2xl text-white" />} 
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend="up"
          trendValue="+8% from last month"
        />
        <StatCard 
          title="Market Products" 
          value={stats.products} 
          icon={<FaShoppingCart className="text-2xl text-white" />} 
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend="down"
          trendValue="-2% from last month"
        />
        <StatCard 
          title="Active Schemes" 
          value="8" 
          icon={<FaSeedling className="text-2xl text-white" />} 
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          trend="up"
          trendValue="+2 new schemes"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">User Growth</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last 7 days activity</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">+23.5%</span>
              <FaChartLine className="text-green-500" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">User Distribution</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Breakdown by role</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Farmers', value: stats.farmers },
                    { name: 'Sellers', value: stats.sellers },
                    { name: 'Cooperatives', value: stats.cooperatives || 0 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {[0, 1, 2].map((index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Users</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Latest registered members</p>
          </div>
          <button 
            onClick={() => navigate('/admin/users')}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer" onClick={() => navigate(`/admin/user/${user._id}`)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                      user.role === 'farmer' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      user.role === 'seller' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.address?.city || 'N/A'}, {user.address?.state || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;