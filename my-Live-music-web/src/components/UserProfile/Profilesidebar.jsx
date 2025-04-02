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
    <div className="basis-[17%] bg-[#0b0e38] h-[calc(100vh-20px)] flex flex-col text-white shadow-lg">
      {/* Scrollable Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg font-bold transition-all ${
              isActive ? "bg-gray-600" : "hover:bg-gray-500"
            }`
          }
        >
          <FaUser className="text-lg" />
          <span>My Account</span>
        </NavLink>

        <ul className="mt-4 space-y-2">
          <li>
            <NavLink
              to="/user/profile/add-profile"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-500"
                }`
              }
            >
              <FaUserPlus />
              <span>Add Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/profile/change-password"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-500"
                }`
              }
            >
              <FaLock />
              <span>Change Password</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/profile/upload-profile-photo"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-500"
                }`
              }
            >
              <FaImage />
              <span>Upload Profile Photo</span>
            </NavLink>
          </li>

          {/* Conditionally Render Settings if the route exists */}
          <li>
            <NavLink
              to="/user/profile/settings"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-500"
                }`
              }
            >
              <FaCog />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Fixed Delete Account Button */}
      <div className="p-4">
        <NavLink
          to="/user/profile/delete"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all"
        >
          <FaTrash />
          <span>Delete Account</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Profilesidebar;
