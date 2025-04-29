import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import chatsData from '../data/chats.json';
import usersData from '../data/users.json';
import { useTranslation } from 'react-i18next';

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState("Reema Kumari");
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState({});
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserList, setShowUserList] = useState(false); // For mobile view toggle - default to chat view
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    const chatContainerRef = useRef(null);
    const messageInputRef = useRef(null);
    const {t} = useTranslation();

    // Initialize data
    useEffect(() => {
        setChats(chatsData);
        setUsers(usersData);
    }, []);

    // Handle window resize for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobileView(mobile);
            if (!mobile) {
                setShowUserList(true); // Always show user list in desktop view
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedUser, chats]);

    // Focus on message input when switching to chat view on mobile
    useEffect(() => {
        if (isMobileView && !showUserList && messageInputRef.current) {
            messageInputRef.current.focus();
        }
    }, [isMobileView, showUserList]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowUserList(false); // Always hide user list after selecting a user
    };

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
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 pt-16">
            {/* Page Header */}
            <div className="fixed top-16 left-0 right-0 z-10 bg-gray-800 border-b border-gray-700 shadow-md">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* No back button needed in the header anymore */}

                    <h1 className="text-xl md:text-2xl font-bold text-center text-gray-200 flex-1">
                        {isMobileView
                            ? (showUserList
                                ? t('our_experts') // Show title when user list is open
                                : selectedUser) // Show selected user name in chat view
                            : t('our_experts')
                        }
                    </h1>

                    {/* Toggle button - Menu or X based on state */}
                    {isMobileView && (
                        <button
                            onClick={() => setShowUserList(!showUserList)}
                            className={`p-2 text-gray-300 focus:outline-none transition-colors duration-200 ${
                                showUserList
                                    ? "hover:text-red-400" // X button hover color
                                    : "hover:text-green-400" // Menu button hover color
                            }`}
                            aria-label={showUserList ? "Close user list" : "Show user list"}
                        >
                            {showUserList
                                ? <FaTimes className="w-5 h-5" /> // X icon when user list is shown
                                : <HiOutlineMenuAlt2 className="w-5 h-5" /> // Menu icon when in chat view
                            }
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden px-2 sm:px-4 md:px-8 lg:px-16 pb-4 pt-12">
                {/* User List - Hidden on mobile when in chat view */}
                <div
                    className={`${isMobileView ? (showUserList ? 'flex' : 'hidden') : 'flex'}
                               flex-col w-full md:w-1/3 lg:w-1/4 bg-gray-700 text-gray-300 shadow-lg
                               rounded-lg border border-gray-600 transition-all duration-300
                               md:mr-4 overflow-hidden`}
                >
                    {/* Search Bar */}
                    <div className="sticky top-0 left-0 bg-gray-700 p-3 border-b border-gray-600 z-10">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchQuery}
                                onChange={(e) => {
                                    const query = e.target.value.toLowerCase();
                                    setSearchQuery(query);
                                    const filtered = usersData.filter(user =>
                                        user.name.toLowerCase().includes(query)
                                    );
                                    setUsers(filtered);
                                }}
                                className="bg-gray-600 text-gray-300 border border-gray-500 rounded-full
                                          pl-10 pr-4 py-2 w-full transition-shadow duration-300
                                          focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setUsers(usersData);
                                    }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* User List */}
                    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#22c55e #1f2937' }}>
                        {users.length > 0 ? (
                            <ul className="divide-y divide-gray-600">
                                {users.map((user) => (
                                    <li
                                        key={user.name}
                                        onClick={() => handleUserClick(user.name)}
                                        className={`flex items-center p-3 cursor-pointer hover:bg-gray-600
                                                  transition-colors duration-200 ${
                                                      selectedUser === user.name ? 'bg-gray-600' : ''
                                                  }`}
                                    >
                                        <div className="relative">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-12 h-12 rounded-full mr-3 border-2 border-green-400"
                                            />
                                            <span className={`absolute bottom-0 right-2 w-3 h-3 rounded-full
                                                           ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}
                                                           border-2 border-gray-700`}>
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold truncate">{user.name}</p>
                                            <p className={`text-sm truncate ${user.status === 'online' ? 'text-green-400' : 'text-gray-400'}`}>
                                                {user.status === 'online' ? t('online') : t('offline')}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full p-4 text-gray-400">
                                <p className="text-center">{t('no_results_found')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area - Hidden on mobile when showing user list */}
                <div
                    className={`${isMobileView ? (showUserList ? 'hidden' : 'flex') : 'flex'}
                               flex-col flex-1 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden`}
                >
                    {/* Chat Messages */}
                    <div
                        className="flex-1 p-4 overflow-y-auto"
                        ref={chatContainerRef}
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#22c55e #1f2937',
                            minHeight: isMobileView ? '70vh' : '400px' // Minimum height for mobile and desktop
                        }}
                    >
                        {chats[selectedUser]?.length > 0 ? (
                            <div className="space-y-4">
                                {chats[selectedUser].map((chat, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${chat.type === 'incoming' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        {chat.type === 'incoming' && (
                                            <img
                                                src={users.find(u => u.name === selectedUser)?.avatar}
                                                alt={selectedUser}
                                                className="w-8 h-8 rounded-full mr-2 self-end"
                                            />
                                        )}
                                        <div
                                            className={`p-3 rounded-lg max-w-[80%] break-words shadow-md
                                                      ${chat.type === 'incoming'
                                                          ? 'bg-gray-700 text-white'
                                                          : 'bg-green-600 text-white'}`}
                                        >
                                            {chat.text}
                                            <div className={`text-xs mt-1 ${chat.type === 'incoming' ? 'text-gray-400' : 'text-green-200'}`}>
                                                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full min-h-[50vh]">
                                <p className="text-center text-gray-400 text-lg">{t('no_messages_yet')}</p>
                                <p className="text-center text-gray-500 mt-2">Send a message to start the conversation</p>
                            </div>
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="bg-gray-700 p-3 border-t border-gray-600">
                        <div className="flex items-center">
                            <input
                                ref={messageInputRef}
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-gray-600 text-gray-300 border border-gray-500 rounded-full
                                          px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t('type_message')}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!message.trim()}
                                className={`ml-3 p-3 bg-green-600 text-white rounded-full
                                          transition-colors duration-300
                                          ${!message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                            >
                                <IoMdSend className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
