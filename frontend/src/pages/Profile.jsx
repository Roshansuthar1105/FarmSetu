import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MyNavbar from "../components/MyNavbar";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import toast from "react-hot-toast";

const Profile = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const [productaddContainer, setProductaddContainer] = useState(false);
    const [cart, setCart] = useState([]);
    const categories = [
        'Seeds',
        'Fertilizers',
        'Irrigation',
        'Tools',
        'Machinery',
        'Pesticides',
        'Greenhouses',
        'Feed',
        'Tractors',
        'Sprayers',
        'Harvesters',
        'Plows',
        'Cultivators',
        'Planters',
        'Combines',
        'Hoes',
        'Rakes',
        'Shovels',
        'Wheelbarrows',
        'Sprinklers',
        'Drip Irrigation',
        'Pumps',
        'Soil Testers',
        'Weather Stations',
        'Pond Liners',
        'Beehives',
        'Composters',
        'Solar Panels',
    ]
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category:'',
        seller: authUser._id,
    });

    useEffect(() => {
        fetchCartItems();
        fetchProducts();
    }, []);
    const fetchCartItems = async () => {
        try {
            const response = await fetch(`https://hotel-oryv.onrender.com/api/profile/cart/${authUser._id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCart(data);
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
            // setProducts(filteredProducts);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        if (!product.price.includes("₹")) {
            product.price = "₹" + product.price;
        }
        if(product.category.trim()==''){
            toast.error("Enter a valid category");
            return;}
        // https://hotel-oryv.onrender.com
        const response = await fetch('https://hotel-oryv.onrender.com/api/products/addproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            toast.error("Network response was not ok");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("response", data)
        toast.success('Product added successfully!');
        setProductaddContainer(false);
        setProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            category:'',
            seller: authUser._id,
        });
    }

    return (
        <div className="min-h-screen bg-gray-800 pt-20">
            <MyNavbar />
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
                                        {/* <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                                            Edit Profile
                                        </button> */}
                                        <button onClick={() => navigate(`/profile/cart/${authUser._id}`)} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                                            Your cart
                                        </button>
                                        <button onClick={() => navigate(`/profile/posts/${authUser._id}`)} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                                            Your Posts
                                        </button>
                                        {authUser?.role === 'seller' && (
                                            <button
                                                onClick={() => setProductaddContainer(true)}
                                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                            >
                                                Add New Product
                                            </button>
                                        )}
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
                                {productaddContainer && (
                                    <div className="w-full h-full fixed z-50 bg-[#00000099] backdrop-blur-md left-0 top-0 flex items-center justify-center" >
                                        <div className="bg-gray-800 p-6 rounded-lg min-h-[400px] min-w-[800px] relative ">
                                            <button onClick={() => setProductaddContainer(false)} className="absolute top-0 right-0 m-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
                                                X
                                            </button>
                                            <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Add New Product</h2>
                                            <form onSubmit={(e) => handleSubmitProduct(e)} >
                                                <div className="space-y-4">
                                                    <div>
                                                        <label htmlFor="productName" className="block text-sm font-medium text-gray-100">Product Name</label>
                                                        <input
                                                            type="text"
                                                            id="productName"
                                                            value={product.name}
                                                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                                            className="mt-1 block w-full text-gray-800 rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-300">Product Description</label>
                                                        <textarea
                                                            id="productDescription"
                                                            rows={3}
                                                            value={product.description}
                                                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                                            className="mt-1 block w-full text-gray-800 rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        required
                                                        ></textarea>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-300">Product Price</label>
                                                        <input
                                                            type="number"
                                                            id="productPrice"
                                                            value={product.price}
                                                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                                            className="mt-1 block w-full text-gray-800 rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="productCategory" className="block text-sm font-medium text-gray-300">Product Category</label>
                                                        <select
                                                            id="productCategory"
                                                            value={product.category}
                                                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                                            className="mt-1 block w-full text-gray-800 rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        >
                                                            <option value="">Select Category</option>
                                                            {categories.map((name) => (
                                                                <option key={name} value={name}>{name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="productImageUrl" className="block text-sm font-medium text-gray-300">Product Image URL</label>
                                                        <input
                                                            type="text"
                                                            id="productImageUrl"
                                                            value={product.image}
                                                            onChange={(e) => setProduct({ ...product, image: e.target.value })}
                                                            className="mt-1 block w-full text-gray-800 rounded-sm px-2 py-1 border-gray-300 border-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        // required
                                                        />
                                                    </div>
                                                    {/* onClick={(e) => handleSubmitProduct(e)} */}
                                                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                                                        Add Product
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;