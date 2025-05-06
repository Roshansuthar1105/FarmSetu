import React, { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon, BellIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import farm from '../assets/farm.svg';
import setu from '../assets/setu.svg';
import { IoPerson } from "react-icons/io5";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoLogOut, IoSettingsSharp } from "react-icons/io5";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdEmail, MdLanguage } from "react-icons/md";
import { HiViewGrid } from "react-icons/hi";
import { useTranslation } from "react-i18next";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from support", read: false, time: "10 min ago" },
    { id: 2, message: "Your order has been shipped", read: true, time: "1 hour ago" },
    { id: 3, message: "Price drop on items in your cart", read: false, time: "3 hours ago" }
  ]);

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const languageRef = useRef(null);

  const { authUser } = useAuthContext();
  const { t, i18n } = useTranslation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body overflow when menu is open
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

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You would typically add a class to the body or html element here
    document.documentElement.classList.toggle('dark-mode');
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };
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
  return (
    <div className="nav-menu">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-white shadow-lg"
            : "py-3 bg-gradient-to-r from-green-900 to-blue-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center">
            <div className="bg-white px-1.5 py-1 rounded-lg flex items-center gap-2 sm:gap-3  ">
              <img src={farm} alt="Farm" className="h-6 w-auto sm:h-7" />
              <img src={setu} alt="Setu" className="h-6 w-auto sm:h-7 mr-[-50px]" />
            </div>
          </Link>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {links2.slice(0, 5).map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`px-2 py-1.5 rounded-md text-xs md:text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-white bg-green-700"
                    : `${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-200 hover:bg-green-800/40"}`
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* More dropdown for additional links */}
            <div className="relative group">
              <button className={`px-2 py-1.5 rounded-md text-xs md:text-sm font-medium flex items-center ${
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-200 hover:bg-green-800/40"
              }`}>
                {t('more')}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {links2.slice(5).map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className={`block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 ${
                      isActive(link.to) ? "bg-gray-100" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side icons and buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            {/* Search button */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsProfileOpen(false);
                  setIsNotificationsOpen(false);
                  setIsLanguageMenuOpen(false);
                }}
                className={`p-1.5 rounded-full ${
                  scrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-200 hover:bg-green-800/40"
                }`}
                aria-label="Search"
              >
                <FaSearch className="h-4 w-4" />
              </button>

              {/* Search dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 sm:w-72 bg-white rounded-lg shadow-lg p-3 z-50">
                  <form onSubmit={handleSearch}>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('search_placeholder')}
                        className="w-full px-3 py-1.5 text-sm focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-green-600 text-white p-1.5 hover:bg-green-700"
                      >
                        <FaSearch className="h-3 w-3" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Language selector - hidden on small screens */}
            <div ref={languageRef} className="relative hidden sm:block">
              <button
                onClick={() => {
                  setIsLanguageMenuOpen(!isLanguageMenuOpen);
                  setIsProfileOpen(false);
                  setIsSearchOpen(false);
                  setIsNotificationsOpen(false);
                }}
                className={`p-1.5 rounded-full ${
                  scrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-200 hover:bg-green-800/40"
                }`}
                aria-label="Change language"
              >
                <MdLanguage className="h-4 w-4" />
              </button>

              {/* Language dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    <span className="mr-2">🇺🇸</span> English
                  </button>
                  <button
                    onClick={() => changeLanguage('hi')}
                    className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    <span className="mr-2">🇮🇳</span> हिन्दी
                  </button>
                  <button
                    onClick={() => changeLanguage('gu')}
                    className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    <span className="mr-2">🇮🇳</span> ગુજરાતી
                  </button>
                </div>
              )}
            </div>

            {/* Notifications - hidden on small screens */}
            {authUser && (
              <div ref={notificationsRef} className="relative hidden sm:block">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileOpen(false);
                    setIsSearchOpen(false);
                    setIsLanguageMenuOpen(false);
                  }}
                  className={`p-1.5 rounded-full ${
                    scrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-200 hover:bg-green-800/40"
                  }`}
                  aria-label="Notifications"
                >
                  <div className="relative">
                    <BellIcon className="h-4 w-4" />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-1.5 h-1.5"></span>
                    )}
                  </div>
                </button>

                {/* Notifications dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 top-full mt-1 w-64 sm:w-72 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="flex justify-between items-center px-3 py-2 border-b">
                      <h3 className="font-medium text-xs">{t('notifications')}</h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-green-600 hover:text-green-800"
                      >
                        {t('mark_all_as_read')}
                      </button>
                    </div>

                    <div className="max-h-48 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`px-3 py-2 border-b hover:bg-gray-50 ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <p className="text-xs text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-xs text-gray-500">{t('no_notifications')}</p>
                      )}
                    </div>

                    <Link
                      to="/notifications"
                      className="block text-center text-xs text-green-600 hover:text-green-800 px-3 py-2 border-t"
                    >
                      {t('view_all_notifications')}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Dark mode toggle - hidden on small screens */}
            <button
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-full hidden sm:block ${
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-200 hover:bg-green-800/40"
              }`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </button>

            {/* Profile dropdown */}
            <div ref={profileRef} className="relative">
              {authUser ? (
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsMenuOpen(false);
                      setIsSearchOpen(false);
                      setIsNotificationsOpen(false);
                      setIsLanguageMenuOpen(false);
                    }}
                    className="flex items-center focus:outline-none"
                  >
                    <span className={`hidden md:block text-xs font-medium mr-1.5 ${
                      scrolled ? "text-gray-700" : "text-white"
                    }`}>
                      {authUser.name.charAt(0).toUpperCase() + authUser.name.slice(1)}
                    </span>
                    <div className="relative">
                      <img
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-green-500 object-cover"
                        src={authUser.avatar || "https://cdn-icons-png.flaticon.com/128/1154/1154966.png"}
                        alt={authUser.name}
                      />
                      {isProfileOpen && (
                        <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                      )}
                    </div>
                  </button>

                  {/* Profile dropdown menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 sm:w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200">
                      <div className="px-3 py-2 border-b border-gray-200">
                        <p className="text-xs text-gray-500">{t('signed_in_as')}</p>
                        <p className="text-xs font-medium text-gray-900 truncate">{authUser.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <IoPerson className="mr-2 h-4 w-4 text-green-600" />
                          {t('profile')}
                        </Link>

                        <button
                          onClick={() => {
                            handleViewCart();
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <FaShoppingCart className="mr-2 h-4 w-4 text-green-600" />
                          {t('view_cart')}
                        </button>

                        <button
                          onClick={() => {
                            handleViewPosts();
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <FaMessage className="mr-2 h-4 w-4 text-green-600" />
                          {t('view_posts')}
                        </button>

                        <button
                          onClick={() => {
                            handleEditProfile();
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <BiSolidMessageSquareEdit className="mr-2 h-4 w-4 text-green-600" />
                          {t('edit_profile')}
                        </button>
                      </div>

                      {authUser.role === 'seller' && (
                        <div className="py-1 border-t border-gray-200">
                          <button
                            onClick={() => {
                              navigate(`/profile/products/${authUser._id}`);
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                          >
                            <HiViewGrid className="mr-2 h-4 w-4 text-green-600" />
                            {t('view_products')}
                          </button>
                        </div>
                      )}

                      <div className="py-1 border-t border-gray-200">
                        <button
                          onClick={() => {
                            navigate('/settings');
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <IoSettingsSharp className="mr-2 h-4 w-4 text-green-600" />
                          {t('settings')}
                        </button>
                      </div>

                      <div className="py-1 border-t border-gray-200">
                        <button
                          onClick={() => {
                            localStorage.removeItem('user');
                            window.location.href = '/';
                          }}
                          className="flex items-center w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                        >
                          <IoLogOut className="mr-2 h-4 w-4 text-red-600" />
                          {t('log_out')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-1.5">
                  <Link to="/login">
                    <button className={`px-2 py-1 text-xs font-medium rounded ${
                      scrolled
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-white text-green-800 hover:bg-green-50"
                    }`}>
                      {t('login')}
                    </button>
                  </Link>
                  <Link to="/signup" className="hidden sm:block">
                    <button className={`px-2 py-1 text-xs font-medium rounded ${
                      scrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}>
                      {t('sign_up')}
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              ref={menuRef}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsProfileOpen(false);
                setIsSearchOpen(false);
                setIsNotificationsOpen(false);
                setIsLanguageMenuOpen(false);
              }}
              className={`lg:hidden p-1.5 rounded-full ${
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-200 hover:bg-green-800/40"
              }`}
              aria-label="Open menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed top-14 right-0 w-64 sm:w-72 h-full bg-white shadow-xl transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile search */}
          <div className="p-3 border-b">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full px-3 py-1.5 text-xs border rounded-l focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-2 py-1.5 rounded-r hover:bg-green-700"
              >
                <FaSearch className="h-3 w-3" />
              </button>
            </form>
          </div>

          {/* Mobile navigation links */}
          <div className="py-1">
            {links2.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 ${
                  isActive(link.to) ? "bg-gray-100 border-l-2 border-green-600 pl-2.5" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile settings */}
          <div className="border-t py-1">
            <button
              onClick={toggleDarkMode}
              className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
            >
              {darkMode ? (
                <>
                  <SunIcon className="h-4 w-4 mr-2 text-yellow-500" />
                  {t('light_mode')}
                </>
              ) : (
                <>
                  <MoonIcon className="h-4 w-4 mr-2 text-blue-700" />
                  {t('dark_mode')}
                </>
              )}
            </button>

            <div className="px-3 py-2 flex items-center text-xs text-gray-700">
              <MdLanguage className="h-4 w-4 mr-2 text-green-600" />
              {t('language')}
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                className="ml-auto bg-gray-100 border rounded text-xs px-1.5 py-0.5"
                value={i18n.language}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="gu">ગુજરાતી</option>
              </select>
            </div>
          </div>

          {/* Mobile user info */}
          {authUser && (
            <div className="border-t py-1">
              <div className="px-3 py-2 flex items-center">
                <img
                  className="h-6 w-6 rounded-full border border-green-500 object-cover"
                  src={authUser.avatar || "https://cdn-icons-png.flaticon.com/128/1154/1154966.png"}
                  alt={authUser.name}
                />
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-900">{authUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{authUser.email}</p>
                </div>
              </div>

              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
              >
                <IoPerson className="h-4 w-4 mr-2 text-green-600" />
                {t('profile')}
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
                className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50"
              >
                <IoLogOut className="h-4 w-4 mr-2" />
                {t('log_out')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}