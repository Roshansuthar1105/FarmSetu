import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Card, CardBody, Navbar, useNavbar } from '@nextui-org/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';


function UserPosts() {
    const { t } = useTranslation();
    const { authUser ,BACKEND_URL} = useAuthContext();
    const [posts, setPosts] = React.useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/community/posts`);
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
        try {
            const response = await fetch(`${BACKEND_URL}/api/community/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(t('delete_post_error'));
            }
            const data = await response.json();
            setPosts(posts.filter(post => post._id !== postId));
            alert(t('post_deleted_success'));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 min-h-screen">

            <div className="max-w-6xl mx-auto p-4 pt-24 min-h-[80dvh]">
                <div className="flex flex-col md:flex-row justify-between mb-8 items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t('your_posts')}</h1>
                        <p className="text-gray-600 max-w-2xl">
                            {t('your_posts_description') || 'Manage your posts and contributions to the farming community.'}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/community')}
                        className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        {t('view_community_posts')}
                    </button>
                </div>

                {posts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-800">{t('no_posts_available')}</h2>
                        <p className="text-gray-600 mb-6">{t('no_posts_message')}</p>
                        <button
                            onClick={() => navigate('/community')}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {t('create_first_post')}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {posts.map((post) => (
                            <div key={`${post.message}+1`} className="w-full">
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col relative group">
                                    <div className="p-6 flex-grow">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">
                                                {post.name ? post.name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{post.name}</p>
                                                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()} • {new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h2>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{post.message}</p>
                                    </div>

                                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                        <div className="flex space-x-3">
                                            <button className="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                {t('edit')}
                                            </button>
                                            <button
                                                onClick={() => deletePost(post._id)}
                                                className="text-gray-500 hover:text-red-600 flex items-center text-sm"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                {t('delete')}
                                            </button>
                                        </div>
                                        <button className="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {t('view')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserPosts