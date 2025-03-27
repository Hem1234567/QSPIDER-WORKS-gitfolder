import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../Context/AuthContextApi";
import { signOut } from "firebase/auth";
import { __AUTH } from "../../backend/Firebaseconfig";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

const Menu = () => {
  const { authUser } = useContext(AuthUserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(__AUTH);
      toast.success("Logout successfully")
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
      <ul className="flex gap-7 text-[16px]">
        <li>
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>
        </li>
        {authUser ? (
          <>
            <li>
              <NavLink to="/user/profile" className={linkStyle}>
                Profile
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md font-semibold hover:bg-red-600 cursor-pointer text-white border border-transparent flex"
                style={{ height: "40px" }}
              >
                <span>Logout</span>
                <span className="mt-1 ml-1">
                  <FiLogOut />
                </span>
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
