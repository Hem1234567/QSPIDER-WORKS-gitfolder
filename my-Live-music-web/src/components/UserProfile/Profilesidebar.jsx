import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaUserPlus,
  FaLock,
  FaImage,
  FaCog,
  FaTrash,
} from "react-icons/fa";

const Profilesidebar = () => {
  return (
    <div className="basis-[16%] bg-[#0b0e38] h-[calc(100vh-20px)] p-4 flex flex-col justify-between text-white">
      <div>
        
        <NavLink
          to="/account"
          className="flex items-center space-x-3 hover:bg-gray-500  p-3 rounded-lg cursor-pointer font-bold"
        >
          <FaUser className="text-lg" />
          <span>My Account</span>
        </NavLink>

        
        <ul className="mt-4 space-y-4">
          <li>
            <NavLink
              to="/add-profile"
              className="flex items-center space-x-3 hover:bg-gray-500 p-3 rounded-lg cursor-pointer"
            >
              <FaUserPlus />
              <span>Add Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/change-password"
              className="flex items-center space-x-3 hover:bg-gray-500 p-3 rounded-lg cursor-pointer"
            >
              <FaLock />
              <span>Change Password</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upload-photo"
              className="flex items-center space-x-3 hover:bg-gray-500 p-3 rounded-lg cursor-pointer"
            >
              <FaImage />
              <span>Upload Profile Photo</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className="flex items-center space-x-3 hover:bg-gray-500 p-3 rounded-lg cursor-pointer"
            >
              <FaCog />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>

      
      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold flex items-center justify-center space-x-2">
        <FaTrash />
        <span>Delete Account</span>
      </button>
    </div>
  );
};

export default Profilesidebar;
