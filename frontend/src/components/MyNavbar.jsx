import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Title from '../assets/Title.svg';
import farm from '../assets/farm.svg';
import setu from '../assets/setu.svg';
import { toast } from "react-hot-toast";
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
    { name: "Farmer Marketplace", to: "/farmermarketplace" },
    { name: "Chat with Experts", to: "/chat" },
    { name: "Real Time Market", to: "/realtimemarket" },
    { name: "News", to: "/news" },
    { name: "Weather", to: "/weather" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const opacity = Math.max(0.6, 1 - scrollTop / 200);
      setNavbarStyle({
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = () => {
    toast.success("Profile clicked");
  }
  return (
    
    <div className="relative">      
      <Navbar
        className="fixed top-0 left-0 right-0 z-50 shadow-md"
        css={navbarStyle}
      >
       <NavbarBrand className="flex flex-row gap-2">
          {/* Replace text with SVG logo */}
          <Link to="/">
            <img src={farm} alt="Farmsetu Logo" style={{display: 'inline-block',height: '100px', width: '100px'}}  />
            <img src={setu} alt="Farmsetu Logo" style={{display: 'inline-block',height: '60px', width: '60px'}} />
          </Link>
        </NavbarBrand>
        

        {/* Desktop Menu */}
        
        <NavbarContent className="hidden lg:flex gap-6 xl:gap-8" justify="center">
          {links2.map((link, index) => (
            <NavbarItem key={index} isActive={link.isActive}>
              <Link
                to={link.to}
                aria-current={link.isActive ? "page" : undefined}
                className={`text-base xl:text-lg ${link.isActive ? "text-secondary" : "text-foreground"} hover:text-blue-600`}
              >
                {link.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Mobile Menu Button */}
        <NavbarContent className="lg:hidden" justify="end">
          <Button auto light onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </Button>
        </NavbarContent>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 right-0 bg-white shadow-md p-4 w-56 rounded-lg z-50">
            <NavbarContent as="div" className="flex flex-col space-y-4">
              {links1.map((link, index) => (
                <NavbarItem key={index} isActive={link.isActive}>
                  <Link
                    to={link.to}
                    aria-current={link.isActive ? "page" : undefined}
                    className={`text-base ${link.isActive ? "text-secondary" : "text-foreground"} hover:text-blue-600`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </NavbarItem>
              ))}
            </NavbarContent>
          </div>
        )}

        {/* User Avatar and Dropdown Menu */}
        <NavbarContent as="div" justify="end" className="hidden lg:flex items-center space-x-4">
          {authUser ? (
            <div className="flex items-center space-x-2">
              <p className="text-base text-[#053c2f] xl:text-lg font-semibold">{authUser.name.charAt(0).toUpperCase() + authUser.name.slice(1)}</p>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={authUser.name}
                    size="md"
                    src={authUser.avatarUrl || "https://cdn-icons-png.flaticon.com/128/9187/9187466.png"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat" >
                  <DropdownItem key="profile" className="h-14 gap-2 text-base xl:text-lg">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold text-[#053c2f]">{authUser.email}</p>
                  </DropdownItem>
                  {/* <DropdownItem key="settings" className="text-base xl:text-lg">
                    My Settings
                  </DropdownItem>
                  <DropdownItem key="team_settings" className="text-base xl:text-lg">
                    Team Settings
                  </DropdownItem>
                  <DropdownItem key="analytics" className="text-base xl:text-lg">
                    Analytics
                  </DropdownItem>
                  <DropdownItem key="system" className="text-base xl:text-lg">
                    System
                  </DropdownItem>
                  <DropdownItem key="configurations" className="text-base xl:text-lg">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback" className="text-base xl:text-lg">
                    Help & Feedback
                  </DropdownItem> */}
                  <DropdownItem key="logout" color="" className="text-base xl:text-lg">
                    <div onClick={() => {
                      localStorage.removeItem('user');
                      window.location.href = '/';
                    }}>
                      Log Out
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="flex space-x-2 sm:space-x-4">
              <Link to="/login">
                <Button auto className="bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button auto className="bg-green-600 text-white hover:bg-green-700 text-sm sm:text-base">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
