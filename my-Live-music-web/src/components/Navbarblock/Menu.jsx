import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../Context/AuthContextApi";
import { signOut } from "firebase/auth";
import { __AUTH } from "../../backend/Firebaseconfig";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { backendUserContext } from "../../Context/FetchUserContext";

const Menu = () => {
  const { authUser } = useContext(AuthUserContext);
  const { userData } = useContext(backendUserContext);
  const navigate = useNavigate();

  // Extract role (default to empty if not found)
  const role = userData?.role || "";

  const handleLogout = async () => {
    try {
      await signOut(__AUTH);
      toast.success("Logout successfully");
      window.localStorage.removeItem("UserToken");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center justify-center px-3 py-2 rounded-md font-semibold 
    hover:bg-blue-800 cursor-pointer transition-all duration-200 
    ${isActive ? "bg-blue-800 text-white" : "text-white"}`;

  return (
    <div className="menu flex justify-end mr-[100px] items-center basis-[25%]">
      <ul className="flex gap-7 text-[16px] items-center">
        <li>
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>
        </li>

        {/* Show Admin Panel Link for Authenticated Admin Users */}
        {authUser && role === "admin" && (
          <li>
            <NavLink to="/admin/dashboard" className={linkStyle}>
              Admin Panel
            </NavLink>
          </li>
        )}

        {authUser ? (
          <>
            {/* User Profile & Avatar */}
            <li>
              <NavLink
                to="/user/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-md font-semibold text-white border border-transparent hover:bg-blue-800 transition-all"
              >
                <span>{authUser.displayName || "User"}</span>
                <img
                  src={
                    authUser.photoURL ||
                    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1677509740.jpg"
                  }
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              </NavLink>
            </li>

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md font-semibold hover:bg-red-600 cursor-pointer text-white border border-transparent flex items-center"
              >
                <span>Logout</span>
                <FiLogOut className="ml-2 text-lg" />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/auth/login" className={linkStyle}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/register" className={linkStyle}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
