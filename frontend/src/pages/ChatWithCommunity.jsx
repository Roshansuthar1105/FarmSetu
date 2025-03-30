import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
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
    const chatContainerRef = useRef(null);
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
    useEffect(() => {
        fetchUsers();
        const url = new URL(window.location.href);
        const seller = url.searchParams.get('seller');
        const productName = url.searchParams.get('productname');
        
        if (seller) {
            setSelectedUser(seller);
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
    const handleUserClick = (user) => {
        setSelectedUser(user);
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

        <div className='mx-auto w-full min-w-full min-h-screen text-white bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950' >
            <div className='py-20'>
                <h1 className="text-3xl font-bold text-center text-gray-200 my-4">{t('chat_title')} {selectedUserName ? selectedUserName : t('role_community')} </h1>
                <div className="flex flex-1 mt-3 mx-4 overflow-hidden sm:mx-4 lg:mx-16 flex-wrap" >
                    <div className={`w-full md:w-1/4 min-w-[250px] bg-gray-700  relative text-gray-300 shadow-lg rounded-lg border border-gray-600 transition-transform duration-300 ease-in-out hover:shadow-xl overflow-x-auto `}
                        style={{
                            maxHeight: 'calc(100vh - 12rem)',
                            scrollbarColor: '#22c55e #1f2937',
                            scrollbarWidth: 'thin',
                        }}>
                        <div className="flex items-center py-4 z-10 justify-center w-full px-2 sticky top-0 left-0 bg-gray-700">
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
                                className="bg-gray-600 text-gray-300 border border-gray-500 rounded-full px-4 py-2 w-full transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                       <ul className="space-y-2 pt-[75px] relative">
                            {filteredUser.map((user) => (
                                <li
                                    key={user._id}
                                    onClick={() => {handleUserClick(user._id)}}
                                    className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200 ${selectedUser === user._id ? 'bg-gray-500 absolute top-0 left-0 w-full ' : ''
                                        }`}
                                >
                                    <img src={user.avatar ? user.avatar : 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'} alt={user.avatar} className="w-12 h-12 rounded-full mr-3 border-2 border-green-400" />
                                    <div>
                                        <p className="font-semibold">
                                            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                                            {/* {user.name} */}
                                        </p>
                                        <p className={`text-sm ${user.role === 'farmer' ? 'text-green-400' : user.role === 'seller' ? 'text-blue-400' : 'text-orange-300'}`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            {/* {user.role} */}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`flex-1 flex flex-col md:ml-4 md:my-0 my-2 `}>
                        <div
                            className="flex-1 bg-gray-800 shadow-lg rounded-lg border border-gray-700 overflow-y-auto"
                            style={{
                                maxHeight: 'calc(100vh - 16rem)',
                                scrollbarWidth: 'none'
                            }}
                            ref={chatContainerRef}
                        >
                                <div className='flex flex-row w-full border-b-1 sticky top-0 left-0 items-center px-4 gap-4' >
                                <button  >
                                    <FaArrowLeft />
                                </button>
                                <li
                                    className={`flex items-center p-2 transition-colors duration-200 w-full`}
                                >
                                    <img src={displayUser.avatar ? displayUser.avatar : 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'} alt={displayUser.avatar} className="w-12 h-12 rounded-full mr-3 border-2 border-green-400" />
                                    <div>
                                        <p className="font-semibold">
                                            {/* {displayUser.name.charAt(0).toUpperCase() + displayUser.name.slice(1)} */}
                                            {displayUser.name}
                                        </p>
                                        <p className={`text-sm ${displayUser.role === 'farmer' ? 'text-green-400' : displayUser.role === 'seller' ? 'text-blue-400' : 'text-orange-300'}`}>
                                            {/* {displayUser.role.charAt(0).toUpperCase() + displayUser.role.slice(1)} */}
                                            {displayUser.role}
                                        </p>
                                    </div>
                                </li>
                                </div>
                            <div className="space-y-4 p-4">
                                {Array.isArray(chats) && chats.length > 0 ? (
                                    chats.map((chat, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${chat.receiver === selectedUser ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`p-3 rounded-lg ${chat.receiver === selectedUser ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'}`}
                                            >
                                                {chat.message}
                                                <p className="text-xs text-gray-300">{new Date(chat.timestamp).toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='text-center text-white text-lg font-semibold'>{t('no_chats_available')} {selectedUserName}</div>
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
                                    placeholder={t('type_message')}
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