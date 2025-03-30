import React, { useState, useEffect, useRef } from "react";
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
import { useTranslation } from "react-i18next";
export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isprofileOpen, setIsProfileOpen] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "rgba(255, 255, 255, 1)",
  });
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    return () => {
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, [isMenuOpen]);
  const { authUser } = useAuthContext();
  const { t } = useTranslation();
  const links2 = [
    { name: t('home'), to: "/" },
    { name: t('marketPlace'), to: "/farmermarketplace" },
    { name: t('chat_with_experts'), to: "/chat" },
    { name: t('chat_with_community'), to: "/localchat" },
    { name: t('real_time_market'), to: "/realtimemarket" },
    { name: t('news'), to: "/news" },
    { name: t('weather'), to: "/weather" },
    { name: t('resources'), to: "/resources" },
    { name: t('community'), to: "/community" },
    { name: t('government_schemes'), to: "/GovernmentSchemes" },
    { name: t('insurance_schemes'), to: "/InsuranceSchema" },
    { name: t('crop_recommendation'), to: "/crops" },
  ];
  const handleEditProfile = async () => {
    navigate(`/profile/edit/${authUser._id}`)
  }
  const handleViewCart = async () => {
    navigate(`/profile/cart/${authUser._id}`)
  }
  const handleViewPosts = async () => {
    navigate(`/profile/posts/${authUser._id}`)
  }
  return (<div className="nav-menu">
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-md px-4 py-2 border-b-[5px] border-[#053c2f] bg-blue-900"
      style={navbarStyle}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center" >
        <Link to="/" className="flex items-center justify-center gap-2">
          <img src={farm} alt="Farmsetu Logo" className="w-16 h-8 sm:w-20 sm:h-12 " />
          <img src={setu} alt="Farmsetu Logo" className="w-16 h-8 sm:w-20 sm:h-12  ml-[-10px]" />
        </Link>
        <div className="flex items-center gap-3" >
          {/* Profile button */}
          <div className="lg:flex items-center space-x-4">
            {authUser ? (
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => {setIsProfileOpen(!isprofileOpen);setIsMenuOpen(false);}}>
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
                    <div  className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-1 cursor-default z-50" onClick={() => { setIsMenuOpen(false); }}>
                      <div className="px-4 py-3">
                        <p className="text-sm flex flex-row gap-2 align-text-top "><MdEmail className="text-green-700 size-4" /> <span>{t('signed_in_as')}</span> </p>
                        <p className="text-sm font-medium text-[#053c2f]">{authUser.email}</p>
                      </div>
                      <Link
                        to={'/profile'}
                        className="flex flex-row gap-3 w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      > <IoPerson className="text-green-700 size-5" /><span>{t('profile')}</span>
                      </Link>
                      <button
                        onClick={() => { handleViewCart() }}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      ><FaShoppingCart className="text-green-700 size-5" /> <span  >{t('view_cart')}</span>
                      </button>
                      <button
                        onClick={handleViewPosts}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      ><FaMessage className="text-green-700 size-5" /> <span  >{t('view_posts')}</span>
                      </button>
                      <button
                        onClick={() => { handleEditProfile() }}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      ><BiSolidMessageSquareEdit className="text-green-700 size-5" /><span  >{t('edit_profile')}</span>
                      </button>
                      {authUser.role === 'seller' && <button
                        onClick={() => { navigate(`/profile/products/${authUser._id}`) }}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                      ><HiViewGrid className="text-green-700 size-5" /><span  >{t('view_products')}</span>
                      </button>}
                      <button
                        onClick={() => {
                          localStorage.removeItem('user');
                          window.location.href = '/';
                        }}
                        className="flex flex-row gap-3 align-middle w-full text-left px-4 py-2 text-sm hover:bg-red-100"
                      ><IoLogOut className="text-green-700 size-5" />
                        <span  >{t('log_out')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 sm:space-x-4 sm:py-0 py-2 ">
                <Link to="/login">
                  <button className="px-1 sm:px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">
                    {t('login')}
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-1 sm:px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base">
                    {t('sign_up')}
                  </button>
                </Link>
              </div>
            )}</div>
          {/*  menu button  */}
          <button
            onClick={() => { setIsMenuOpen(!isMenuOpen) }}
            className=" border-green-700 rounded-full p-1 hover:scale-110"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>
    </nav>
    {/* menu  */}
    <div className={`fixed top-16 right-0 z-50 border-l-3 border-green-800 backdrop-blur-md shadow-md px-4 pl-10 py-2 md:w-96 w-screen ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 overflow-y-auto h-full scrollbar-hide `} style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
      <div className="flex flex-col gap-2" onClick={()=>setIsProfileOpen(false)} >
        {links2.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-lg hover:text-green-300 px-2 py-2 rounded"
          >
            {link.name}
          </Link>
        ))}
        <button
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/';
          }}
          className="text-white text-lg hover:bg-red-600 px-2 py-2 rounded flex items-baseline bg-red-500 justify-center gap-2"
        >
          {/* <IoLogOut className="text-white" /> */}
          <span  >{t('log_out')}</span>
        </button>
      </div>
      <XMarkIcon onClick={() => setIsMenuOpen(false)} className="size-8 cursor-pointer  absolute top-4 right-5 bg-green-500 rounded-full p-2" />
    </div>
  </div>
  )
}