import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { useAuthContext } from '../../context/AuthContext';
import { FaUsers, FaLeaf, FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';

const AdminDashboard = () => {
    const { BACKEND_URL } = useAuthContext();
    const [stats, setStats] = useState({ totalUsers: 0, farmers: 0, sellers: 0, products: 0 });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Fetch real data from your backend
        const fetchData = async () => {
            try {
                // Fetch Users
                const userRes = await fetch(`${BACKEND_URL}/api/users/all`);
                const users = await userRes.json();
                
                // Process User Roles for Charts
                const farmers = users.filter(u => u.role === 'farmer').length;
                const sellers = users.filter(u => u.role === 'seller').length;
                const cooperatives = users.filter(u => u.role === 'cooperative').length;

                // Fetch Products
                const prodRes = await fetch(`${BACKEND_URL}/api/products`);
                const products = await prodRes.json();

                setStats({
                    totalUsers: users.length,
                    farmers,
                    sellers,
                    products: products.length
                });

                setChartData([
                    { name: 'Farmers', value: farmers },
                    { name: 'Sellers', value: sellers },
                    { name: 'Cooperatives', value: cooperatives },
                ]);

            } catch (error) {
                console.error("Error fetching admin stats:", error);
            }
        };
        fetchData();
    }, [BACKEND_URL]);

    const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard Overview</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="bg-blue-600" />
                <StatCard title="Active Farmers" value={stats.farmers} icon={<FaLeaf />} color="bg-green-600" />
                <StatCard title="Market Products" value={stats.products} icon={<FaShoppingCart />} color="bg-purple-600" />
                <StatCard title="Critical Alerts" value="12" icon={<FaExclamationTriangle />} color="bg-red-600" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Distribution Pie Chart */}
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
                    <div className="flex justify-center gap-4 mt-4 text-sm text-gray-400">
                        {chartData.map((entry, index) => (
                            <div key={index} className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Bar Chart (Dummy data for visualization if backend history is empty) */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-200 mb-6">Platform Activity (Weekly)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Mon', visits: 400, sales: 240 },
                                { name: 'Tue', visits: 300, sales: 139 },
                                { name: 'Wed', visits: 200, sales: 980 },
                                { name: 'Thu', visits: 278, sales: 390 },
                                { name: 'Fri', visits: 189, sales: 480 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip cursor={{ fill: '#374151' }} contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                <Bar dataKey="visits" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="sales" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className={`${color} rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform duration-200`}>
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