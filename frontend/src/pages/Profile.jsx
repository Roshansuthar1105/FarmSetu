import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
    FaBriefcase, FaEnvelope, FaShoppingCart, FaUser, FaMapMarkerAlt, FaPhone,
    FaStar, FaLeaf, FaSeedling, FaTractor, FaChartLine, FaClipboardCheck,
    FaUserFriends, FaRegThumbsUp, FaRegComment, FaShare, FaAward, FaMedal
} from "react-icons/fa";
import { FaCalendarDays, FaMessage, FaEarthAsia } from "react-icons/fa6";
import { BiEdit, BiSolidMessageSquareEdit } from "react-icons/bi";
import { HiViewGrid } from "react-icons/hi";
import { IoLogOut, IoSettingsSharp, IoStatsChart } from "react-icons/io5";
import { GrContactInfo } from "react-icons/gr";
import { MdDashboard, MdOutlineVerified, MdTrendingUp, MdNotificationsActive } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const Profile = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [stats, setStats] = useState({
        posts: 0,
        cartItems: 0,
        productsViewed: 42,
        commentsReceived: 8
    });

    // Sample data for charts
    const cropData = [
        { name: 'Wheat', value: 35 },
        { name: 'Rice', value: 25 },
        { name: 'Corn', value: 20 },
        { name: 'Soybeans', value: 15 },
        { name: 'Other', value: 5 },
    ];

    const activityData = [
        { name: 'Mon', value: 4 },
        { name: 'Tue', value: 3 },
        { name: 'Wed', value: 7 },
        { name: 'Thu', value: 2 },
        { name: 'Fri', value: 5 },
        { name: 'Sat', value: 8 },
        { name: 'Sun', value: 6 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Simulate fetching user data
    useEffect(() => {
        // Simulate achievements data
        setAchievements([
            { id: 1, title: t('early_adopter'), description: t('early_adopter_desc'), icon: <FaMedal className="text-yellow-500" />, date: '2023-01-15' },
            { id: 2, title: t('first_post'), description: t('first_post_desc'), icon: <FaMessage className="text-blue-500" />, date: '2023-02-10' },
            { id: 3, title: t('verified_user'), description: t('verified_user_desc'), icon: <MdOutlineVerified className="text-green-500" />, date: '2023-03-22' },
        ]);

        // Simulate recent activity data
        setRecentActivity([
            { id: 1, type: 'post', message: t('created_post'), date: '2023-05-15T10:30:00', icon: <FaMessage className="text-blue-500" /> },
            { id: 2, type: 'product', message: t('viewed_product'), date: '2023-05-14T15:45:00', icon: <FaShoppingCart className="text-green-500" /> },
            { id: 3, type: 'comment', message: t('commented_post'), date: '2023-05-13T09:20:00', icon: <FaRegComment className="text-purple-500" /> },
            { id: 4, type: 'like', message: t('liked_post'), date: '2023-05-12T14:10:00', icon: <FaRegThumbsUp className="text-red-500" /> },
        ]);

        // Simulate weather data
        setWeatherData({
            location: 'New Delhi, India',
            temperature: 28,
            condition: 'Sunny',
            humidity: 65,
            windSpeed: 12,
        });

        // Simulate stats
        if (authUser) {
            // In a real app, you would fetch this data from your API
            setStats({
                posts: Math.floor(Math.random() * 10),
                cartItems: Math.floor(Math.random() * 5),
                productsViewed: Math.floor(Math.random() * 50) + 10,
                commentsReceived: Math.floor(Math.random() * 20),
            });
        }
    }, [authUser, t]);

    // Format date for better display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString || Date.now()).toLocaleDateString(undefined, options);
    };

    // Format relative time
    const formatRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return t('just_now');
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} ${minutes === 1 ? t('minute_ago') : t('minutes_ago')}`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} ${hours === 1 ? t('hour_ago') : t('hours_ago')}`;
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ${days === 1 ? t('day_ago') : t('days_ago')}`;
        } else {
            return formatDate(dateString);
        }
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-full bg-gray-300 h-32 w-32 mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-64 mb-8"></div>
                    <div className="h-40 bg-gray-300 rounded w-full max-w-md"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="h-40 bg-gradient-to-r from-green-600 to-blue-600 relative profile-header-bg">
                        <button
                            onClick={() => navigate(`/profile/edit/${authUser?._id}`)}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                            title={t('edit_profile_background')}
                        >
                            <BiEdit className="h-5 w-5" />
                        </button>

                        {/* Background Gradient Selector - Shows when edit button is hovered */}
                        <div className="absolute top-4 right-16 bg-white/20 backdrop-blur-sm p-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => document.querySelector('.profile-header-bg').style.background = 'linear-gradient(to right, #047857, #1d4ed8)'}
                                    className="w-6 h-6 rounded-full bg-gradient-to-r from-green-600 to-blue-600 border-2 border-white/70"
                                    title={t('default_gradient')}
                                />
                                <button
                                    onClick={() => document.querySelector('.profile-header-bg').style.background = 'linear-gradient(to right, #7e22ce, #2563eb)'}
                                    className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-700 to-blue-600 border-2 border-white/70"
                                    title={t('purple_blue_gradient')}
                                />
                                <button
                                    onClick={() => document.querySelector('.profile-header-bg').style.background = 'linear-gradient(to right, #ea580c, #facc15)'}
                                    className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-600 to-yellow-400 border-2 border-white/70"
                                    title={t('sunset_gradient')}
                                />
                                <button
                                    onClick={() => document.querySelector('.profile-header-bg').style.background = 'linear-gradient(to right, #0f766e, #0284c7)'}
                                    className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-600 to-sky-600 border-2 border-white/70"
                                    title={t('ocean_gradient')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row px-6 py-4 relative">
                        <div className="absolute -top-16 left-6 md:left-6">
                            <div className="relative group">
                                <img
                                    src={authUser?.avatar || "https://cdn-icons-png.flaticon.com/128/1154/1154966.png"}
                                    alt="Profile"
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
                                />
                                <button
                                    className="bg-white text-green-600 p-1.5 rounded-full absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                    onClick={() => navigate(`/profile/edit/${authUser?._id}`)}
                                >
                                    <BiEdit className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-16 md:mt-0 md:ml-36">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                {authUser?.name?.charAt(0).toUpperCase() + authUser?.name?.slice(1)}
                            </h1>
                            <p className="text-gray-500 flex items-center mt-1">
                                <FaBriefcase className="mr-2 text-green-600" />
                                <span className="capitalize">{authUser?.role || 'User'}</span>
                            </p>
                            <p className="text-gray-500 flex items-center mt-1">
                                <FaCalendarDays className="mr-2 text-green-600" />
                                <span>{t('member_since')}: {formatDate(authUser?.createdAt)}</span>
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-t border-gray-200 px-6">
                        <div className="flex overflow-x-auto space-x-2 py-2">
                            <button
                                onClick={() => handleTabChange('overview')}
                                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                                    activeTab === 'overview'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <MdDashboard className="inline mr-1" /> {t('overview')}
                            </button>
                            <button
                                onClick={() => handleTabChange('personal')}
                                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                                    activeTab === 'personal'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <GrContactInfo className="inline mr-1" /> {t('personal_information')}
                            </button>
                            <button
                                onClick={() => handleTabChange('activity')}
                                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                                    activeTab === 'activity'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <MdTrendingUp className="inline mr-1" /> {t('activity')}
                            </button>
                            <button
                                onClick={() => handleTabChange('achievements')}
                                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                                    activeTab === 'achievements'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <FaAward className="inline mr-1" /> {t('achievements')}
                            </button>
                            <button
                                onClick={() => handleTabChange('stats')}
                                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                                    activeTab === 'stats'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <IoStatsChart className="inline mr-1" /> {t('statistics')}
                            </button>
                            <button
                                onClick={() => handleTabChange('settings')}
                                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                                    activeTab === 'settings'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <IoSettingsSharp className="inline mr-1" /> {t('account_settings')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Sidebar - Always visible */}
                    <div className="md:col-span-1">
                        {/* Contact Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('contact_information')}</h2>
                            <div className="space-y-3">
                                <p className="flex items-center text-gray-600">
                                    <FaEnvelope className="mr-3 text-green-600" />
                                    <span>{authUser?.email}</span>
                                </p>
                                <p className="flex items-center text-gray-600">
                                    <FaPhone className="mr-3 text-green-600" />
                                    <span>{authUser?.phone || '+91 98765 43210'}</span>
                                </p>
                                <p className="flex items-center text-gray-600">
                                    <FaMapMarkerAlt className="mr-3 text-green-600" />
                                    <span>{authUser?.location || 'India'}</span>
                                </p>
                            </div>
                        </div>

                        {/* Weather Widget */}
                        {weatherData && (
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-1">{t('local_weather')}</h2>
                                        <p className="text-sm text-blue-100">{weatherData.location}</p>
                                    </div>
                                    <div className="text-3xl font-bold">
                                        {weatherData.temperature}°C
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                                        <p className="text-blue-100">{t('condition')}</p>
                                        <p className="font-medium">{weatherData.condition}</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                                        <p className="text-blue-100">{t('humidity')}</p>
                                        <p className="font-medium">{weatherData.humidity}%</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm col-span-2">
                                        <p className="text-blue-100">{t('wind_speed')}</p>
                                        <p className="font-medium">{weatherData.windSpeed} km/h</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/weather')}
                                    className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition text-sm flex items-center justify-center"
                                >
                                    <FaEarthAsia className="mr-2" /> {t('view_detailed_forecast')}
                                </button>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('quick_actions')}</h2>
                            <div className="space-y-2">
                                <button
                                    onClick={() => navigate(`/profile/edit/${authUser?._id}`)}
                                    className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition flex items-center text-sm"
                                >
                                    <BiSolidMessageSquareEdit className="mr-2 text-green-600" /> {t('edit_profile')}
                                </button>
                                <button
                                    onClick={() => navigate(`/profile/cart/${authUser?._id}`)}
                                    className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition flex items-center text-sm"
                                >
                                    <FaShoppingCart className="mr-2 text-green-600" /> {t('your_cart')}
                                </button>
                                <button
                                    onClick={() => navigate(`/profile/posts/${authUser?._id}`)}
                                    className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition flex items-center text-sm"
                                >
                                    <FaMessage className="mr-2 text-green-600" /> {t('your_posts')}
                                </button>
                                {authUser?.role === 'seller' && (
                                    <button
                                        onClick={() => navigate("/profile/products/add")}
                                        className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition flex items-center text-sm"
                                    >
                                        <HiViewGrid className="mr-2 text-green-600" /> {t('add_new_product')}
                                    </button>
                                )}
                                <button
                                    onClick={() => navigate('/chat')}
                                    className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition flex items-center text-sm"
                                >
                                    <FaUserFriends className="mr-2 text-green-600" /> {t('chat_with_experts')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area - Changes based on active tab */}
                    <div className="md:col-span-2">
                        {activeTab === 'overview' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('account_overview')}</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-blue-700 font-medium">{t('your_posts')}</p>
                                                <p className="text-2xl font-bold text-gray-800">{stats.posts}</p>
                                            </div>
                                            <FaMessage className="text-blue-500 text-3xl" />
                                        </div>
                                    </div>

                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-green-700 font-medium">{t('cart_items')}</p>
                                                <p className="text-2xl font-bold text-gray-800">{stats.cartItems}</p>
                                            </div>
                                            <FaShoppingCart className="text-green-500 text-3xl" />
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-purple-700 font-medium">{t('products_viewed')}</p>
                                                <p className="text-2xl font-bold text-gray-800">{stats.productsViewed}</p>
                                            </div>
                                            <FaClipboardCheck className="text-purple-500 text-3xl" />
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-yellow-700 font-medium">{t('comments')}</p>
                                                <p className="text-2xl font-bold text-gray-800">{stats.commentsReceived}</p>
                                            </div>
                                            <FaRegComment className="text-yellow-500 text-3xl" />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6 mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{t('recent_activity')}</h3>
                                        <button
                                            onClick={() => handleTabChange('activity')}
                                            className="text-sm text-green-600 hover:text-green-800"
                                        >
                                            {t('view_all')}
                                        </button>
                                    </div>

                                    {recentActivity.length > 0 ? (
                                        <div className="space-y-3">
                                            {recentActivity.slice(0, 3).map(activity => (
                                                <div key={activity.id} className="bg-gray-50 rounded-lg p-3 flex items-start">
                                                    <div className="bg-white p-2 rounded-full mr-3">
                                                        {activity.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-800">{activity.message}</p>
                                                        <p className="text-xs text-gray-500">{formatRelativeTime(activity.date)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                                            {t('no_recent_activity')}
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{t('achievements')}</h3>
                                        <button
                                            onClick={() => handleTabChange('achievements')}
                                            className="text-sm text-green-600 hover:text-green-800"
                                        >
                                            {t('view_all')}
                                        </button>
                                    </div>

                                    {achievements.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {achievements.map(achievement => (
                                                <div key={achievement.id} className="bg-gray-50 rounded-full px-3 py-1 flex items-center">
                                                    <span className="mr-1">{achievement.icon}</span>
                                                    <span className="text-sm font-medium">{achievement.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                                            {t('no_achievements_yet')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('activity_history')}</h2>

                                {recentActivity.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentActivity.map(activity => (
                                            <div key={activity.id} className="bg-gray-50 rounded-lg p-4 flex items-start">
                                                <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                                                    {activity.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-800 font-medium">{activity.message}</p>
                                                    <p className="text-sm text-gray-500">{formatRelativeTime(activity.date)}</p>
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(activity.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                                        <MdNotificationsActive className="mx-auto text-gray-400 text-4xl mb-2" />
                                        <h3 className="text-lg font-medium text-gray-700 mb-1">{t('no_activity_yet')}</h3>
                                        <p className="text-gray-500">{t('activity_will_appear_here')}</p>
                                    </div>
                                )}

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('weekly_activity')}</h3>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('your_achievements')}</h2>

                                {achievements.length > 0 ? (
                                    <div className="space-y-6">
                                        {achievements.map(achievement => (
                                            <div key={achievement.id} className="bg-gray-50 rounded-lg p-4 flex items-center">
                                                <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                                                    <div className="text-2xl">{achievement.icon}</div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                                                    <p className="text-sm text-gray-600">{achievement.description}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{t('earned_on')} {formatDate(achievement.date)}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
                                            <div className="flex items-center">
                                                <div className="bg-gray-200 p-3 rounded-full mr-4">
                                                    <FaAward className="text-2xl text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-400">{t('next_achievement')}</h3>
                                                    <p className="text-sm text-gray-500">{t('keep_using_platform')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                                        <FaAward className="mx-auto text-gray-400 text-4xl mb-2" />
                                        <h3 className="text-lg font-medium text-gray-700 mb-1">{t('no_achievements_yet')}</h3>
                                        <p className="text-gray-500">{t('achievements_will_appear_here')}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'stats' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('statistics_and_analytics')}</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">{t('crop_distribution')}</h3>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={cropData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {cropData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">{t('activity_summary')}</h3>
                                        <div className="space-y-4">
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">{t('posts')}</span>
                                                    <span className="text-sm text-gray-600">{stats.posts}/10</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(stats.posts/10)*100}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">{t('products_viewed')}</span>
                                                    <span className="text-sm text-gray-600">{stats.productsViewed}/50</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(stats.productsViewed/50)*100}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">{t('comments')}</span>
                                                    <span className="text-sm text-gray-600">{stats.commentsReceived}/20</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(stats.commentsReceived/20)*100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">{t('usage_tips')}</h3>
                                    <div className="bg-blue-50 rounded-lg p-4 text-blue-800">
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li>{t('usage_tip_1')}</li>
                                            <li>{t('usage_tip_2')}</li>
                                            <li>{t('usage_tip_3')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'personal' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('personal_information')}</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">{t('name')}</p>
                                            <p className="font-medium text-gray-800">{authUser?.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{t('email')}</p>
                                            <p className="font-medium text-gray-800">{authUser?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{t('role')}</p>
                                            <p className="font-medium text-gray-800 capitalize">{authUser?.role}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{t('member_since')}</p>
                                            <p className="font-medium text-gray-800">{formatDate(authUser?.createdAt)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => navigate(`/profile/edit/${authUser?._id}`)}
                                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center text-sm"
                                        >
                                            <BiEdit className="mr-2" /> {t('edit_information')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('account_settings')}</h2>

                                <div className="space-y-4">
                                    {authUser?.role === 'seller' && (
                                        <button
                                            onClick={() => navigate("/profile/products/add")}
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                                        >
                                            <HiViewGrid className="mr-2" /> {t('add_new_product')}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => navigate('/settings')}
                                        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
                                    >
                                        <IoSettingsSharp className="mr-2" /> {t('app_settings')}
                                    </button>

                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('user');
                                            window.location.href = '/';
                                        }}
                                        className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center"
                                    >
                                        <IoLogOut className="mr-2" /> {t('logout')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;