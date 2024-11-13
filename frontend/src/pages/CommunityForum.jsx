import React, { useState, useRef, useEffect } from 'react';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import postsData from '../data/posts.json'; // Import the posts JSON file
import { Card, CardBody } from '@nextui-org/react';
import { useAuthContext } from '../context/AuthContext';

const CommunityForum = () => {
  const { authUser } = useAuthContext();
  const [posts, setPosts] = useState(postsData); // Use the imported JSON data
  const [newPost, setNewPost] = useState({ name:authUser.name,email:authUser.email , message: '', title: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  // useEffect(()=>{
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/community/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);
  // },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    const postId = posts.length + 1;
    const date = new Date().toISOString().split('T')[0];
    // const post = { ...newPost, id: postId, date };
    const url = "http://localhost:5000/api/community/";
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setNewPost(prevState => ({...prevState, title: '', message: ''}));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    // const postId = posts.length + 1;
    // const date = new Date().toISOString().split('T')[0];
    // const post = { ...newPost, id: postId, date };
    // setPosts([...posts, post]);
    // console.log("your post",post);
    // setNewPost({ title: '', message: '', author: '' });
    setIsModalOpen(false); // Close the modal after submission
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <MyNavbar />
      <div className="max-w-4xl mx-auto p-4 pt-24">
        <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold mb-6 text-green-300">Community Forum</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-gray-100 px-4 py-2 rounded-lg mb-6 hover:bg-green-500 transition duration-300"
          >
          Write Post
        </button>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {posts.map((post) => (
            <div key={`${post.message}+1`} className="w-full max-w-sm mx-auto">
              <Card  className="w-full bg-gray-900 border border-gray-700">
                <CardBody>
                  <h2 className="text-xl font-bold mb-2 text-green-400">{post.title}</h2>
                  <p className="text-gray-300 mb-2">{post.message}</p>
                  <div className="text-sm text-gray-500">
                    <span>By {post.name}</span> | <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
            <div
              ref={modalRef}
              className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-md mx-auto"
            >
              <h2 className="text-2xl font-bold mb-4 text-green-300">Share Your Experience</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  placeholder="Post Title"
                  className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-gray-100"
                  required
                />
                <textarea
                  name="message"
                  value={newPost.message}
                  onChange={handleInputChange}
                  placeholder="Write your experience..."
                  className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-gray-100"
                  rows="6"
                  required
                />
                {/* <input
                  type="text"
                  name="author"
                  value={newPost.author}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-gray-100"
                  required
                /> */}
                <button
                  type="submit"
                  className="bg-green-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-green-500 transition duration-300"
                >
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 text-gray-100 px-4 py-2 rounded-lg ml-4 hover:bg-red-500 transition duration-300"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CommunityForum;
