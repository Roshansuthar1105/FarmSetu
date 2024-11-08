import React, { useEffect, useRef, useState } from 'react'
import MyNavbar from '../components/MyNavbar'
import { FaPaperPlane } from 'react-icons/fa';
import Footer from '../components/Footer'
function ChatWithCommunity() {
    const [users , setUsers] =useState([]);
    const [chats ,setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [searchQuery ,setSearchQuery]=useState("");
    const chatContainerRef = useRef(null);
    const currentUserId = JSON.parse(localStorage.getItem('user'))._id;
    const [selectedUser ,setSelectedUser]=useState(`${currentUserId}`);
    const [filteredUser,setFilteredUser]=useState([]);
    const fetchUsers = async ()=>{
        const API = "http://localhost:5000";
        try {
            fetch(`${API}/api/users/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setFilteredUser(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchUsers();
    },[])
    useEffect(()=>{
        fetchCurrentChats();
    },[selectedUser])
    useEffect(() => {
        const interval = setInterval(fetchCurrentChats, 10000);
        return () => clearInterval(interval);
    }, [selectedUser]);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedUser, chats]);
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const fetchCurrentChats = async ()=>{
    const API = "http://localhost:5000";
    try {
        const response = await fetch(`${API}/api/chats/${selectedUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({currentUserId:currentUserId})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChats(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    }
    // Assuming you have a Chat model imported
    const handleSendMessage = async () => {
        if (selectedUser && message.trim()) {
            const chatMessage = {
                sender: currentUserId, // Replace with the ID of the current user
                receiver: selectedUser,
                message: message
            };
    
            try {
                const response = await fetch('http://localhost:5000/api/chats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(chatMessage),
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const savedMessage = await response.json();
                setChats(prevChats => [...prevChats, savedMessage]);
                setMessage('');
            } catch (error) {
                console.error('Error saving chat message:', error);
            }
        }
    };
  return (

    <div className='bg-gray-800 mx-auto w-full min-w-full text-white' >
        <MyNavbar/>
        <div className='pt-20'>
        <h1 className="text-3xl font-bold text-center text-gray-200 my-4">Chat With Community</h1>
        <div className="flex flex-1 mt-3 mb-16 mx-8 overflow-hidden sm:mx-16 lg:mx-32">
                <div className="w-full md:w-1/4 bg-gray-700  relative text-gray-300 shadow-lg rounded-lg border border-gray-600 transition-transform duration-300 ease-in-out hover:shadow-xl overflow-x-auto" 
                    style={{ 
                        maxHeight: 'calc(100vh - 9rem)',
                        scrollbarColor: '#22c55e #1f2937',
                        scrollbarWidth: 'thin',
                    }}>
                    <div className="flex items-center py-4 justify-center w-full px-2 sticky top-0 left-0 bg-gray-700">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => {
                              const query = e.target.value.toLowerCase();
                              setSearchQuery(query);
                              const filtered = users.filter(user => 
                                user.name.toLowerCase().includes(query)
                              );
                              setFilteredUser(filtered);
                            }}
                            className="bg-gray-600 text-gray-300 border border-gray-500 rounded-full px-4 py-2 w-full transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <ul className="space-y-2">
                        {filteredUser.map((user) => (
                            <li
                                key={user._id}
                                onClick={() => handleUserClick(user._id)}
                                className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200 ${
                                    selectedUser === user._id ? 'bg-gray-500' : ''
                                }`}
                            >
                                <img src={user.avatar ? user.avatar : 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'} alt={user.name} className="w-12 h-12 rounded-full mr-3 border-2 border-green-400" />
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className={`text-sm ${user.role === 'farmer' ? 'text-green-400' :user.role==='seller'?'text-blue-400':'text-orange-300'}`}>
                                        {user.role}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 flex flex-col ml-4">
                    <div
                        className="flex-1 bg-gray-800 p-4 shadow-lg rounded-lg border border-gray-700 overflow-y-auto"
                        style={{ 
                            maxHeight: 'calc(100vh - 9rem)',
                            scrollbarWidth: 'none'
                        }}
                        ref={chatContainerRef}
                    >
                        <div className="space-y-4">
                            {Array.isArray(chats) && chats.length > 0 ? (
                                chats.map((chat, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${chat.receiver === selectedUser ? 'justify-end': 'justify-start'}`}
                                    >
                                        <div
                                            className={`p-3 rounded-lg ${chat.receiver === selectedUser ?'bg-green-600 text-white': 'bg-gray-700 text-white' }`}
                                        >
                                            {chat.message}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-center text-white'>No chats Available </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-gray-700 p-2 shadow-lg rounded-lg border border-gray-600 mt-2">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-gray-600 text-gray-300 border border-gray-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Type a message..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="ml-4 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 ease-in-out"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ChatWithCommunity