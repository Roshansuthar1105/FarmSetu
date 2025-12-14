import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { FaSearch, FaEye, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminUserList = () => {
    const { BACKEND_URL, authUser } = useAuthContext();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); // Initialize as empty array
    const [filteredUsers, setFilteredUsers] = useState([]); // Initialize as empty array
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // 1. Check if token exists BEFORE fetching
                const token = authUser?.token;
                if (!token) return; // Stop if no token

                const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`, // Use the variable
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await res.json();
                if(res.ok && Array.isArray(data)){
                    setUsers(data);
                    setFilteredUsers(data);
                } else {
                    console.error("Fetch error:", data);
                }
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };

        // 2. Only run fetch if authUser is actually present
        if (authUser && authUser.token) {
            fetchUsers();
        }
    }, [BACKEND_URL, authUser]); // Dependency array ensures it runs when authUser loads

    useEffect(() => {
        // Ensure users is an array before filtering
        if (!Array.isArray(users)) return;

        let result = [...users];

        // 1. Filter by Search (Name, Email, City)
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(u => 
                (u.name && u.name.toLowerCase().includes(lowerSearch)) || 
                (u.email && u.email.toLowerCase().includes(lowerSearch)) ||
                (u.address?.city && u.address.city.toLowerCase().includes(lowerSearch))
            );
        }

        // 2. Filter by Role
        if (roleFilter !== 'all') {
            result = result.filter(u => u.role === roleFilter);
        }

        setFilteredUsers(result);
    }, [search, roleFilter, users]);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">User Management</h1>
                    <p className="text-gray-400 mt-1">View and manage all registered farmers, sellers, and cooperatives.</p>
                </div>
                <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-600/50">
                    Total Users: <span className="font-bold text-white ml-2">{filteredUsers.length}</span>
                </div>
            </div>

            {/* Error Message Display */}
            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg text-center">
                    {error}
                </div>
            )}

            {/* Toolbar */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search by Name, Email or City..." 
                        className="w-full bg-gray-900 border border-gray-600 text-white pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <FaFilter className="text-gray-400" />
                    <select 
                        className="bg-gray-900 border border-gray-600 text-white p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="farmer">Farmers</option>
                        <option value="seller">Sellers</option>
                        <option value="cooperative">Cooperatives</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-900 text-xs uppercase font-semibold text-gray-400">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Status / Stats</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {loading ? (
                                <tr><td colSpan="5" className="p-8 text-center">Loading users...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No users found.</td></tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-700/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <img 
                                                    src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                                    alt="avatar" 
                                                    className="w-10 h-10 rounded-full border border-gray-600 mr-3" 
                                                />
                                                <div>
                                                    <div className="font-bold text-white">{user.name}</div>
                                                    <div className="text-xs text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                                user.role === 'farmer' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                                                user.role === 'seller' ? 'bg-blue-900/50 text-blue-400 border border-blue-800' :
                                                'bg-purple-900/50 text-purple-400 border border-purple-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm">
                                            {user.address?.city ? `${user.address.city}, ${user.address.state}` : <span className="text-gray-600 italic">Not set</span>}
                                        </td>
                                        <td className="p-4 text-sm">
                                            {user.role === 'farmer' && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400">Farms:</span> 
                                                    <span className="text-white font-bold">{user.farms?.length || 0}</span>
                                                </div>
                                            )}
                                            {user.role === 'seller' && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400">Products:</span> 
                                                    <span className="text-white font-bold">-</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button 
                                                onClick={() => navigate(`/admin/user/${user._id}`)}
                                                className="bg-gray-700 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors tooltip"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUserList;