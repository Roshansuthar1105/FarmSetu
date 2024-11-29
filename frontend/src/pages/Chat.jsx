import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import chatsData from '../data/chats.json';
import usersData from '../data/users.json';

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState("Reema Kumari");
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState({});
    const [users, setUsers] = useState([]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        setChats(chatsData);
        setUsers(usersData);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedUser, chats]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSendMessage = () => {
        if (selectedUser && message.trim()) {
            setChats((prevChats) => ({
                ...prevChats,
                [selectedUser]: [
                    ...(prevChats[selectedUser] || []),
                    { text: message, type: 'outgoing' },
                ],
            }));
            
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950">
            
            <h1 className="text-3xl font-bold text-center text-gray-200 mt-20">Our Experts</h1>
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
                              const filtered = usersData.filter(user => 
                                user.name.toLowerCase().includes(query)
                              );
                              setUsers(filtered);
                            }}
                            className="bg-gray-600 text-gray-300 border border-gray-500 rounded-full px-4 py-2 w-full transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li
                                key={user.name}
                                onClick={() => handleUserClick(user.name)}
                                className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200 ${
                                    selectedUser === user.name ? 'bg-gray-500' : ''
                                }`}
                            >
                                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-3 border-2 border-green-400" />
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className={`text-sm ${user.status === 'online' ? 'text-green-400' : 'text-gray-400'}`}>
                                        {user.status}
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
                            {chats[selectedUser]?.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`flex ${chat.type === 'incoming' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`p-3 rounded-lg ${chat.type === 'incoming' ? 'bg-gray-600 text-white' : 'bg-green-600 text-white'}`}
                                    >
                                        {chat.text}
                                    </div>
                                </div>
                            ))}
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
    );
};

export default Chat;
