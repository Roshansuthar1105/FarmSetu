import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MyNavbar from "../components/MyNavbar";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Product from "../components/Product";

const Profile = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const [cart , setCart ] =useState([]);
    const [products ,setProducts]=useState([]);
    useEffect(()=>{
        console.log(authUser,"hello user");
        fetchCartItems();
        fetchProducts();
    },[]);
    const fetchCartItems = async () => {
        try {
            const response = await fetch(`https://hotel-oryv.onrender.com/api/profile/cart/${authUser._id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCart(data);
            console.log(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://hotel-oryv.onrender.com/api/products/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const allCartItems = cart.map(item => item);
            const filteredProducts = data.filter(product => allCartItems.includes(product._id));
            setProducts(filteredProducts);
            console.log("cart",cart)
            console.log(filteredProducts);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-800 pt-20">
            <MyNavbar/>
            <div className="container mx-auto px-4 my-10">
                <div className="bg-gray-700 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <img 
                            src={authUser?.avatar || "https://cdn-icons-png.flaticon.com/128/1154/1154966.png"}
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
                                        <p><span className="font-medium">Role:</span> {authUser?.role}</p>
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
                                        <button onClick={() => navigate(`/profile/cart/${authUser._id}`)} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                                            Your cart
                                        </button>
                                        <button onClick={() => navigate(`/profile/posts/${authUser._id}`)} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                                            Your Posts
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
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4 text-gray-200">Cart Products</h2>
                                <div className="space-y-3">
                                    {products?.map((product, index) => (
                                        <>
                                        <p key={index}><span className="font-medium">Product {index + 1}:</span> {product._id}</p>
                                        <Product product={product} />
                                        </>
                                    ))}
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