import React, { useState } from "react";
import { FaHome, FaThLarge, FaChartBar, FaCog, FaMicrophone, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", icon: <FaHome />, href: "/home" },
    { label: "Browse", icon: <FaThLarge />, href: "/PodcastPage" },
    { label: "Top Charts", icon: <FaChartBar />, href: "/TopCharts" },
    { label: "Settings", icon: <FaCog />, href: "/signup" },
    { label: "Profile", icon: <FaUser/>, href: "/MyProfile" }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800 text-white"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-gray-900 text-white
        transition-transform duration-300 ease-in-out z-40
        w-64 lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Section */}
        <div className="p-6 flex items-center space-x-3 border-b border-gray-700">
          <FaMicrophone className="w-8 h-8 text-white" />
          <span className="text-lg font-bold text-white">Podcast</span>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
        </div>

        {/* Menu Items */}
        <ul className="p-4 space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-lg">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;