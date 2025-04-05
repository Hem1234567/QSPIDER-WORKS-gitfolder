import React, { useState, useContext } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { AuthUserContext } from "../../context/AuthContextApi";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { authUser } = useContext(AuthUserContext);
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { password, confirmPassword } = userPassword;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(authUser, password);
      toast.success("Password updated successfully");
      navigate("/user/profile");
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-20px)] bg-gray-900 text-white w-[90%]">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg border-b-2 border-white">
        <h2 className="text-center text-2xl font-bold text-purple-500 mb-4">
          Change Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block text-white font-semibold mb-1">
              New Password
            </label>
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              placeholder="Enter your new password"
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={handleInputChange}
            />
            <span
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showPassword1 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          <div className="relative">
            <label className="block text-white font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <span
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showPassword2 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md"
          >
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
