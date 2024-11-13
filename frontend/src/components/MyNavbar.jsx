import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import farm from '../assets/farm.svg';
import setu from '../assets/setu.svg';

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "rgba(255, 255, 255, 1)",
  });

  const { authUser } = useAuthContext();

  const links1 = [
    { name: "Market Insights", to: "/market-insights" },
    { name: "Crop Recommendations", to: "/crop-recommendations" },
    { name: "Weather Updates", to: "/weather" },
    { name: "Help & Support", to: "/help" },
    { name: "Activity", to: "/activity" },
    { name: "Logout", to: "/logout" },
  ];

  const links2 = [
    { name: "Marketplace", to: "/farmermarketplace" },
    { name: "Chat with Experts", to: "/chat" },
    { name: "Chat with Community", to: "/localchat" },
    { name: "Real Time Market", to: "/realtimemarket" },
    { name: "News", to: "/news" },
    { name: "Weather", to: "/weather" },
    { name: "Resources", to: "/resources" },
    { name: "Community", to: "/community" },
  ];

  return (
   <>
    <div className="relative">      
      <nav 
        className="fixed top-0 left-0 right-0 z-50 shadow-md px-4 py-2 border-b-[5px] border-[#053c2f]"
        style={navbarStyle}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2">
            <img src={farm} alt="Farmsetu Logo" height={60} width={100} />
            <img src={setu} alt="Farmsetu Logo" height={60} width={100} style={{marginLeft: "-10px",height: "45px"}} />
          </Link>

          {/* Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>

          {/* Navigation Links */}
          <ul className={`${isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white shadow-md' : 'hidden'} lg:flex lg:flex-row lg:static lg:shadow-none gap-4 xl:gap-4  p-4 lg:p-0`}>
            {links2.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  
                  className={`${index===0 ? '':'border-l-2 pl-2 border-green-400'} block text-base xl:text-sm ${link.isActive ? "text-secondary" : "text-foreground"} hover:text-green-700 hover:scale-105 transition-all duration-300`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {authUser ? (
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <p className="text-base text-[#053c2f] xl:text-lg font-semibold">
                  {authUser.name.charAt(0).toUpperCase() + authUser.name.slice(1)}
                </p>
                <div className="relative">
                  <button 
                    
                    className="flex items-center"
                  >
                    <img
                      className="h-10 w-10 rounded-full border-2 border-secondary"
                      src={authUser.avatar || "https://cdn-icons-png.flaticon.com/128/1154/1154966.png"}
                      alt={authUser.name}
                    />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-1 cursor-default" onClick={()=>{setIsMenuOpen(false); }}>
                      <div className="px-4 py-3">
                        <p className="text-sm">Signed in as</p>
                        <p className="text-sm font-medium text-[#053c2f]">{authUser.email}</p>
                      </div>
                      <Link
                        to={'/profile'}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem('user');
                          window.location.href = '/';
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-red-100"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 sm:space-x-4">
                <Link to="/login">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
   </>
  );
}
