import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaBriefcase, FaEnvelope, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaCalendarDays, FaMessage } from "react-icons/fa6";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { HiViewGrid } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { GrContactInfo } from "react-icons/gr";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
const Profile = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const { t } = useTranslation(); // Initialize useTranslation hook
    return (
        <div className="min-h-screen bg-gray-800 pt-20">
            
            <div className="container mx-auto px-4 my-10">
                <div className="bg-gray-700 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <img
                            src={authUser?.avatar || "https://cdn-icons-png.flaticon.com/128/1154/1154966.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-green-600"
                        />
                        <h1 className="mt-4 text-3xl font-bold text-gray-200">
                            {authUser?.name?.charAt(0).toUpperCase() + authUser?.name?.slice(1)}
                        </h1>
                        <p className="text-gray-300">{authUser?.email}</p>

                        <div className="mt-8 w-full text-gray-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <GrContactInfo className="mr-2 text-3xl text-green-600" />
                                        <h2 className="text-2xl font-semibold text-gray-200">{t('personal_information')}</h2>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="flex items-center"><FaUser className="mr-2 text-green-600 " /><span className="font-medium">{t('name')} : {authUser?.name}</span></p>
                                        <p className="flex items-center"><FaBriefcase className="mr-2 text-green-600 " /><span className="font-medium">{t('role')} : {authUser?.role}</span></p>
                                        <p className="flex items-center"><FaEnvelope className="mr-2 text-green-600 " /><span className="font-medium">{t('email')} : {authUser?.email}</span></p>
                                        <p className="flex items-center"><FaCalendarDays className="mr-2 text-green-600 " /><span className="font-medium">{t('member_since')} : {new Date(authUser?.createdAt || Date.now()).toLocaleDateString()}</span></p>
                                    </div>
                                </div>

                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-200">{t('account_settings')}</h2>
                                    <div className="space-y-4">
                                        <button onClick={() => navigate(`/profile/cart/${authUser._id}`)} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center">
                                            <FaShoppingCart className="mr-2" /> {t('your_cart')}
                                        </button>
                                        <button onClick={() => navigate(`/profile/posts/${authUser._id}`)} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center">
                                            <FaMessage className="mr-2" /> {t('your_posts')}
                                        </button>
                                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
                                        onClick={()=>navigate(`/profile/edit/${authUser._id}`)}
                                        >
                                            <BiSolidMessageSquareEdit className="mr-2" /> {t('edit_profile')}
                                        </button>
                                        {authUser?.role === 'seller' && (
                                            <button
                                                onClick={() => navigate("/profile/products/add")}
                                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
                                            >
                                                <HiViewGrid className="mr-2" /> {t('add_new_product')}
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('user');
                                                window.location.href = '/';
                                            }}
                                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                                        >
                                            <IoLogOut className="mr-2" /> {t('logout')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Profile;