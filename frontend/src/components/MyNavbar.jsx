import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import farm from '../assets/farm.svg';
import setu from '../assets/setu.svg';
import { IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { HiViewGrid } from "react-icons/hi";
export default function MyNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isprofileOpen, setIsProfileOpen] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "rgba(255, 255, 255, 1)",
  });

  const { authUser } = useAuthContext();

  const links2 = [
    { name: "Marketplace", to: "/farmermarketplace" },
    { name: "Chat with Experts", to: "/chat" },
    { name: "Chat with Community", to: "/localchat" },
    { name: "Real Time Market", to: "/realtimemarket" },
    { name: "News", to: "/news" },
    { name: "Weather", to: "/weather" },
    { name: "Resources", to: "/resources" },
    { name: "Community", to: "/community" },
    { name: "Government Schemes", to: "/GovernmentSchemes" },
    { name: "Insurence Schemes", to: "/InsuranceSchema" },
  ];
  const handleEditProfile = async ()=>{
    navigate(`/profile/edit/${authUser._id}`)
  }
  const handleViewCart = async ()=>{
    navigate(`/profile/cart/${authUser._id}`)
  }
  const handleViewPosts = async ()=>{
    navigate(`/profile/posts/${authUser._id}`)
  }
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
          

          {/* Navigation Links */}
          <ul 
          // className={`${!isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white shadow-md' : 'hidden'} lg:flex lg:flex-row lg:static lg:shadow-none gap-4 xl:gap-4  p-4 lg:p-0`}>
          className={`${!isMenuOpen ? 'hidden':'flex flex-col absolute top-full left-0 right-0 bg-white shadow-md'} gap-2 `}
          onClick={()=>setIsMenuOpen(!isMenuOpen)}
          >
            {links2.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  
                  className={`ml-4 my-1 block text-base xl:text-sm ${link.isActive ? "text-secondary" : "text-foreground"} hover:text-green-700  transition-all duration-300`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Section */}
          <div className="flex flex-row-reverse gap-3" >

          <button 
            onClick={() => {setIsMenuOpen(!isMenuOpen)}}
            className=" border-green-700 rounded-full p-1 hover:scale-110"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>
          <div className="lg:flex items-center space-x-4">
            {authUser ? (
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsProfileOpen(!isprofileOpen)}>
                <p className="text-base text-[#053c2f] xl:text-lg font-semibold">
                  {authUser.name.charAt(0).toUpperCase() + authUser.name.slice(1)}
                </p>
                <div className="relative">
                  <button 
                    
                    className="flex items-center"
                  >
                    <img
                      className="h-10 w-10 rounded-full border-2 border-green-700"
                      src={authUser.avatar || "https://cdn-icons-png.flaticon.com/128/1154/1154966.png"}
                      alt={authUser.name}
                    />
                  </button>
                  {isprofileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-1 cursor-default" onClick={()=>{setIsMenuOpen(!isMenuOpen); }}>
                      <div className="px-4 py-3">
                        <p className="text-sm flex flex-row gap-2 align-text-top "><MdEmail className="text-green-700 size-4" /> <span>Signed in as</span> </p>
                        <p className="text-sm font-medium text-[#053c2f]">{authUser.email}</p>
                      </div>
                      <Link
                        to={'/profile'}
                        className="flex flex-row gap-3 w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      > <IoPerson className="text-green-700 size-5" /><span>Profile</span>
                      </Link>
                      <button
                        onClick={() => { handleViewCart() }}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      ><FaShoppingCart className="text-green-700 size-5" /> <span  >View Cart</span>
                      </button>
                      <button
                        onClick={handleViewPosts}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      ><FaMessage className="text-green-700 size-5" /> <span  >View Posts</span>
                      </button>
                      <button
                        onClick={() => { handleEditProfile() }}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      ><BiSolidMessageSquareEdit className="text-green-700 size-5" /><span  >Edit profile</span>
                      </button>
                      {authUser.role==='seller' && <button
                        onClick={() => { navigate(`/profile/products/${authUser._id}`) }}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      ><HiViewGrid className="text-green-700 size-5" /><span  >View Products</span>
                      </button>}
                      <button
                        onClick={() => {
                          localStorage.removeItem('user');
                          window.location.href = '/';
                        }}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-red-100"
                      ><IoLogOut className="text-green-700 size-5" />
                        <span  >Log Out</span>
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

        </div>
      </nav>
    </div>
   </>
  );
}
