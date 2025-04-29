import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaArrowLeft, FaPaperPlane, FaSearch, FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useAuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
function ChatWithCommunity() {
    const {BACKEND_URL}= useAuthContext();
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState('');
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const [showUserList, setShowUserList] = useState(false); // For mobile view toggle - default to chat view
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    const chatContainerRef = useRef(null);
    const messageInputRef = useRef(null);

    if(localStorage.length === 0){
        window.location.replace('/login');
    }

    const currentUserId = JSON.parse(localStorage.getItem('user'))._id;
    const [selectedUser, setSelectedUser] = useState(currentUserId);
    const [displayUser, setDisplayUser] = useState({});
    const [filteredUser, setFilteredUser] = useState([]);
    const fetchUsers = async () => {
        try {
            fetch(`${BACKEND_URL}/api/users/all`, {
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
    const findUser =(id) =>{
        const url = `${BACKEND_URL}/api/user/${id}`;
        const user = fetch(url).then(resp=>resp.json()).then(user=>setDisplayUser(user[0]));
    }
    useEffect(()=>{
        findUser(selectedUser);
    },[selectedUser])
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

    // Initialize data and handle URL parameters
    useEffect(() => {
        fetchUsers();
        const url = new URL(window.location.href);
        const seller = url.searchParams.get('seller');
        const productName = url.searchParams.get('productname');

        if (seller) {
            setSelectedUser(seller);
            setShowUserList(false); // Always hide user list when seller is specified in URL
        }
        if (productName) {
            setMessage(`I have query about the product "${productName}"`);
        }
        const removeSellerFromUrl = () => {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('seller');
            newUrl.searchParams.delete('productname');
            window.history.pushState({}, '', newUrl.href);
        };
        removeSellerFromUrl();
    }, [])
    useEffect(() => {
        fetchCurrentChats();
    }, [selectedUser])
    const findUsername = () => {
        const user = users.find(user => user._id === selectedUser);
        if (user) {
            setSelectedUserName(user.name.charAt(0).toUpperCase() + user.name.slice(1));
        }
    };
    useEffect(() => {
        findUsername();
    }, [selectedUser, users]);
    useEffect(() => {
        const interval = setInterval(fetchCurrentChats, 10000);
        return () => clearInterval(interval);
    }, [selectedUser]);
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
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const fetchCurrentChats = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/chats/${selectedUser}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentUserId: currentUserId })
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
                const response = await fetch(`${BACKEND_URL}/api/chats`, {
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
                toast.success(t('message_sent_success'));
            } catch (error) {
                console.error(t('sending_message_error'), error);
            }
        }
    };
    if(!selectedUser || !currentUserId){
        return(<>
        no user found
        </>)
    }
    return (

        <div className='mx-auto w-full min-w-full min-h-screen text-white bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 pt-16' >
            {/* Page Header */}
            <div className="fixed top-16 left-0 right-0 z-10 bg-gray-800 border-b border-gray-700 shadow-md">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* No back button needed in the header anymore */}

                    <h1 className="text-xl md:text-2xl font-bold text-center text-gray-200 flex-1">
                        {isMobileView
                            ? (showUserList
                                ? t('chat_title') + ' ' + t('role_community') // Show title when user list is open
                                : selectedUserName) // Show selected user name in chat view
                            : t('chat_title') + ' ' + (selectedUserName ? selectedUserName : t('role_community'))
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

            <div className='py-12'>
                <div className="flex flex-1 mt-3 mx-2 sm:mx-4 lg:mx-16 overflow-hidden" >
                    {/* User List - Hidden on mobile when in chat view */}
                    <div
                        className={`${isMobileView ? (showUserList ? 'flex' : 'hidden') : 'flex'}
                                   flex-col w-full md:w-1/3 lg:w-1/4 bg-gray-700 text-gray-300 shadow-lg
                                   rounded-lg border border-gray-600 transition-all duration-300
                                   md:mr-4 overflow-hidden`}
                        style={{
                            maxHeight: 'calc(100vh - 12rem)',
                            scrollbarColor: '#22c55e #1f2937',
                            scrollbarWidth: 'thin',
                        }}
                    >
                        {/* Search Bar */}
                        <div className="sticky top-0 left-0 bg-gray-700 p-3 border-b border-gray-600 z-10">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={t('search_placeholder')}
                                    value={searchQuery}
                                    onChange={(e) => {
                                        const query = e.target.value.toLowerCase();
                                        setSearchQuery(query);
                                        const filtered = users.filter(user =>
                                            user.name.toLowerCase().includes(query)
                                        );
                                        setFilteredUser(filtered);
                                    }}
                                    className="bg-gray-600 text-gray-300 border border-gray-500 rounded-full
                                              pl-10 pr-4 py-2 w-full transition-shadow duration-300
                                              focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setFilteredUser(users);
                                        }}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        <FaTimes className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* User List */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredUser.length > 0 ? (
                                <ul className="divide-y divide-gray-600">
                                    {filteredUser.map((user) => (
                                        <li
                                            key={user._id}
                                            onClick={() => {handleUserClick(user._id)}}
                                            className={`flex items-center p-3 cursor-pointer hover:bg-gray-600
                                                      transition-colors duration-200 ${
                                                          selectedUser === user._id ? 'bg-gray-600' : ''
                                                      }`}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={user.avatar ? user.avatar : 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-full mr-3 border-2 border-green-400"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold truncate">
                                                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                                                </p>
                                                <p className={`text-sm truncate ${user.role === 'farmer' ? 'text-green-400' : user.role === 'seller' ? 'text-blue-400' : 'text-orange-300'}`}>
                                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
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
                            className="flex-1 overflow-y-auto"
                            style={{
                                maxHeight: 'calc(100vh - 16rem)',
                                minHeight: isMobileView ? '70vh' : '400px', // Minimum height for mobile and desktop
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#22c55e #1f2937'
                            }}
                            ref={chatContainerRef}
                        >
                            {/* User info header - Only visible on desktop or when in chat view on mobile */}
                            {displayUser && displayUser.name && (
                                <div className='flex flex-row w-full border-b border-gray-700 sticky top-0 left-0 items-center px-4 py-2 bg-gray-800 z-10' >
                                    {/* No back button needed here anymore */}

                                    {/* User avatar - Only visible on desktop */}
                                    {!isMobileView && (
                                        <div className="relative mr-3">
                                            <img
                                                src={displayUser.avatar ? displayUser.avatar : 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'}
                                                alt={displayUser.name}
                                                className="w-10 h-10 rounded-full border-2 border-green-400"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-200">
                                            {displayUser.name && displayUser.name.charAt(0).toUpperCase() + displayUser.name.slice(1)}
                                        </p>
                                        {displayUser.role && (
                                            <p className={`text-sm ${displayUser.role === 'farmer' ? 'text-green-400' : displayUser.role === 'seller' ? 'text-blue-400' : 'text-orange-300'}`}>
                                                {displayUser.role.charAt(0).toUpperCase() + displayUser.role.slice(1)}
                                            </p>
                                        )}
                                    </div>

                                    {/* No close button needed here anymore */}
                                </div>
                            )}

                            {/* Chat messages */}
                            <div className="space-y-4 p-4">
                                {Array.isArray(chats) && chats.length > 0 ? (
                                    chats.map((chat, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${chat.receiver === selectedUser ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {chat.receiver !== selectedUser && (
                                                <img
                                                    src={displayUser.avatar ? displayUser.avatar : 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'}
                                                    alt={displayUser.name}
                                                    className="w-8 h-8 rounded-full mr-2 self-end hidden sm:block"
                                                />
                                            )}
                                            <div
                                                className={`p-3 rounded-lg max-w-[80%] break-words shadow-md
                                                          ${chat.receiver === selectedUser
                                                              ? 'bg-green-600 text-white'
                                                              : 'bg-gray-700 text-white'}`}
                                            >
                                                {chat.message}
                                                <p className="text-xs mt-1 opacity-70">
                                                    {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] p-4">
                                        <p className="text-center text-gray-400 text-lg">{t('no_chats_available')} {selectedUserName}</p>
                                        <p className="text-center text-gray-500 mt-2">Send a message to start the conversation</p>
                                    </div>
                                )}
                            </div>
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
                                    <FaPaperPlane className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChatWithCommunity;
{/* <ul class="space-y-2 pt-[75px] relative animate-pulse">
<li class="flex items-center p-2 rounded-lg cursor-pointer bg-gray-500 absolute top-0 left-0 w-full">
  <div class="w-12 h-12 rounded-full mr-3 border-2 border-green-400 bg-gray-200"></div>
  <div>
    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    <div class="mt-1 h-3 bg-gray-200 rounded w-1/3"></div>
  </div>
</li>
<li class="flex items-center p-2 rounded-lg cursor-pointer bg-gray-200">
  <div class="w-12 h-12 rounded-full mr-3 border-2 border-green-400 bg-gray-200"></div>
  <div>
    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    <div class="mt-1 h-3 bg-gray-200 rounded w-1/3"></div>
  </div>
</li>
<li class="flex items-center p-2 rounded-lg cursor-pointer bg-gray-200">
  <div class="w-12 h-12 rounded-full mr-3 border-2 border-green-400 bg-gray-200"></div>
  <div>
    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    <div class="mt-1 h-3 bg-gray-200 rounded w-1/3"></div>
  </div>
</li>
</ul> */}