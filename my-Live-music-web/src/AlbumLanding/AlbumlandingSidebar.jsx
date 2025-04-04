import React, { useState } from "react";
import { FaBars, FaFire, FaHeart, FaUser, FaMusic } from "react-icons/fa";
import { PiRadioBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const AlbumlandingSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      to: "/popular-album",
      icon: <FaFire size={18} />,
      text: "Popular Albums",
    },
    { to: "/for-you", icon: <FaHeart size={18} />, text: "Only for You" },
    { to: "/artists", icon: <FaUser size={18} />, text: "Popular Artists" },
    { to: "/trending", icon: <FaMusic size={18} />, text: "Trending Songs" },
    { to: "/radio", icon: <PiRadioBold size={18} />, text: "Radio Stations" },
  ];

  return (
    <aside
      className={`h-[calc(100vh-20px)] ${
        isCollapsed ? "basis-[4%]" : "basis-[16%]"
      } bg-[#0B0E38] text-white shadow-lg transition-all duration-300`}
    >
      <div className="flex justify-center p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-gray-900 text-white font-bold rounded-lg flex items-center justify-center transition-all w-full py-2"
        >
          {isCollapsed ? <FaBars size={20} /> : <span>Explore</span>}
        </button>
      </div>

      <nav className="mt-4 space-y-3 px-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-lg transition duration-200 hover:bg-rose-600 ${
                isActive ? "bg-rose-700" : ""
              }`
            }
          >
            {item.icon}
            {!isCollapsed && (
              <span className="text-sm font-semibold">{item.text}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AlbumlandingSidebar;
