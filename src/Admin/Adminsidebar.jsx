import React from "react";
import { NavLink } from "react-router-dom";
import { RiFolderMusicFill } from "react-icons/ri";

const Adminsidebar = () => {
  return (
    <aside className="basis-[17%] min-h-[calc(100vh-70px)] border-[#0b0e38] bg-[#0b0e38]">
      <nav className="w-full">
        <ul className="w-full p-6">
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-4 py-2 flex items-center gap-2 hover:bg-blue-800 rounded-md cursor-pointer ${
                  isActive ? "bg-blue-800 text-white" : "text-gray-300"
                }`
              }
            >
              <span className="text-lg">
                <RiFolderMusicFill />
              </span>
              <span className="font-semibold">Create Album</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Adminsidebar;
