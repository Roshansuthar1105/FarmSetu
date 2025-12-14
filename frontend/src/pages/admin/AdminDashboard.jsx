import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { useAuthContext } from '../../context/AuthContext';
import { FaUsers, FaLeaf, FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // <--- Import useNavigate

const AdminDashboard = () => {
    const { BACKEND_URL, authUser } = useAuthContext();
    const navigate = useNavigate(); // <--- Initialize hook
    const [stats, setStats] = useState({ totalUsers: 0, farmers: 0, sellers: 0, products: 0 });
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ensure auth token is sent if your backend protects this route
                const userRes = await fetch(`${BACKEND_URL}/api/admin/users`, {
                    headers: { 'Authorization': `Bearer ${authUser?.token}` }
                });
                const users = await userRes.json();
                console.log(authUser,`Bearer ${authUser?.token}`,userRes);
                // If users is array, calculate stats. If error, users might be {error: ...}
                if(Array.isArray(users)) {
                    const farmers = users.filter(u => u.role === 'farmer').length;
                    const sellers = users.filter(u => u.role === 'seller').length;
                    const cooperatives = users.filter(u => u.role === 'cooperative').length;

                    // Fetch Products (Optional, assuming public or admin route)
                    const prodRes = await fetch(`${BACKEND_URL}/api/products`);
                    const products = await prodRes.json();
                    const productCount = Array.isArray(products) ? products.length : 0;

                    setStats({
                        totalUsers: users.length,
                        farmers,
                        sellers,
                        products: productCount
                    });

                    setChartData([
                        { name: 'Farmers', value: farmers },
                        { name: 'Sellers', value: sellers },
                        { name: 'Cooperatives', value: cooperatives },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            }
        };
        fetchData();
    }, [BACKEND_URL, authUser]);

    const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard Overview</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* CLICKABLE CARD: Navigates to User List */}
                <StatCard 
                    title="Total Users" 
                    value={stats.totalUsers} 
                    icon={<FaUsers />} 
                    color="bg-blue-600"
                    onClick={() => navigate('/admin/users')} // <--- Navigate on click
                />
                <StatCard title="Active Farmers" value={stats.farmers} icon={<FaLeaf />} color="bg-green-600" />
                <StatCard title="Market Products" value={stats.products} icon={<FaShoppingCart />} color="bg-purple-600" />
                <StatCard title="Critical Alerts" value="12" icon={<FaExclamationTriangle />} color="bg-red-600" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-200 mb-6">User Demographics</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-200 mb-6">Platform Activity (Weekly)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Mon', visits: 400 },
                                { name: 'Tue', visits: 300 },
                                { name: 'Wed', visits: 200 },
                                { name: 'Thu', visits: 278 },
                                { name: 'Fri', visits: 189 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip cursor={{ fill: '#374151' }} contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                <Bar dataKey="visits" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Updated StatCard to handle onClick
const StatCard = ({ title, value, icon, color, onClick }) => (
    <div 
        onClick={onClick}
        className={`${color} rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform duration-200 ${onClick ? 'cursor-pointer' : ''}`}
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium opacity-80">{title}</p>
                <h3 className="text-3xl font-bold mt-2">{value}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-xl">
                {icon}
            </div>
        </div>
    </div>
);

export default AdminDashboard;