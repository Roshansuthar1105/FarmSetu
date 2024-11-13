import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Card, CardBody, Navbar, useNavbar } from '@nextui-org/react';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import { FaTrashAlt } from 'react-icons/fa';


function UserPosts() {
    const { authUser } = useAuthContext();
    const [posts, setPosts] = React.useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPosts = async () => {
            console.log("email", authUser.email);
            try {
                const response = await fetch(`/api/community/posts`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
                const userPosts = data.filter(post => post.email === authUser.email);
                setPosts(userPosts);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchPosts();
    }, []);
    const deletePost = async (postId) => {
        console.log("post" ,postId)
        try {
            const response = await fetch(`https://hotel-oryv.onrender.com/api/community/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPosts(posts.filter(post => post._id !== postId));
            console.log('Post deleted successfully:', data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen">
            <MyNavbar />
            <div className="max-w-4xl mx-auto p-4 pt-24 min-h-[80dvh] ">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold mb-6 text-green-300">Your Posts</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {posts.length===0 && 
                    <div className="w-full max-w-sm mx-auto">
                        <Card className="w-full bg-gray-900 border border-gray-700">
                            <CardBody>
                                <h2 className="text-xl font-bold mb-2 text-green-400">No Posts Available</h2>
                                <p className="text-gray-300 mb-2">You haven't missed anything yet. We'll let you know as soon as there's something new!</p>
                            </CardBody>
                        </Card>
                    <button
                        onClick={() => navigate('/community')}
                        className="mt-3 bg-green-600 text-white py-2 px-2 mx-auto rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        View Community Posts
                    </button>
                    </div>
                    }
                    {posts.map((post) => (
                        <div key={`${post.message}+1`} className="w-full max-w-sm mx-auto">
                            <Card className="w-full bg-gray-900 border border-gray-700 pb-12 min-h-64">
                                <CardBody>
                                    <h2 className="text-xl font-bold mb-2 text-green-400">{post.title}</h2>
                                    <p className="text-gray-300 mb-2">{post.message}</p>
                                    <div className="text-sm text-gray-500">
                                        <span>By {post.name}</span> | <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </CardBody>
                                <button
                                    onClick={() => deletePost(post._id)}
                                    className="bg-red-600 text-white p-2 w-fit absolute bottom-2 right-2 rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                <FaTrashAlt />
                                </button>
                            </Card>
                        </div>
                    ))}
                </div>
        </div>
            <Footer />
        </div>

    )
}

export default UserPosts