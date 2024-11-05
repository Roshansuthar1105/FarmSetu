import Footer from "../components/Footer";
import MyNavbar from "../components/MyNavbar";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="min-h-screen bg-gray-800 pt-20">
            <MyNavbar/>
            <div className="container mx-auto px-4 my-10">
                <div className="bg-gray-700 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <img 
                            src={authUser?.avatarUrl || "https://cdn-icons-png.flaticon.com/128/9187/9187466.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-500"
                        />
                        <h1 className="mt-4 text-3xl font-bold text-gray-200">
                            {authUser?.name?.charAt(0).toUpperCase() + authUser?.name?.slice(1)}
                        </h1>
                        <p className="text-gray-300">{authUser?.email}</p>
                        
                        <div className="mt-8 w-full text-gray-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-200">Personal Information</h2>
                                    <div className="space-y-3">
                                        <p><span className="font-medium">Name:</span> {authUser?.name}</p>
                                        <p><span className="font-medium">Email:</span> {authUser?.email}</p>
                                        <p><span className="font-medium">Member Since:</span> {new Date(authUser?.createdAt || Date.now()).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-200">Account Settings</h2>
                                    <div className="space-y-4">
                                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                                            Edit Profile
                                        </button>
                                        <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                                            Change Password
                                        </button>
                                        <button 
                                            onClick={() => {
                                                localStorage.removeItem('user');
                                                window.location.href = '/';
                                            }}
                                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;