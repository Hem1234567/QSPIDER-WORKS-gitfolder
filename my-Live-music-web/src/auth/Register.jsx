import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { __AUTH } from "../backend/Firebaseconfig.js";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "", 
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { username, email, password, confirmPassword, photoURL } = userData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      
      const registeredUser = await createUserWithEmailAndPassword(
        __AUTH,
        email,
        password
      );

      
      await updateProfile(registeredUser.user, {
        displayName: username,
        photoURL: photoURL || "https://via.placeholder.com/150", 
      });

      console.log("User Updated:", registeredUser.user);
      toast.success("Registered successfully!");

      
      setUserData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        photoURL: "",
      });

      navigate("/auth/login");
    } catch (error) {
      toast.error(error.code.slice(5));
    }
    setIsLoading(false);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <article className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg border-b-2 border-amber-50">
        <header>
          <h1 className="text-3xl font-semibold text-center text-purple-400 mb-2">
            Register
          </h1>
        </header>
        <form onSubmit={handleSubmit}>
          
          <div>
            <label className="block font-semibold text-gray-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-2 mt-1 text-gray-300 rounded bg-gray-800 border border-gray-500 focus:outline-none"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>

          
          <div>
            <label className="block mt-4 font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 text-gray-300 rounded bg-gray-800 border border-gray-500 focus:outline-none"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>

          
          <div>
            <label className="block mt-4 font-semibold text-gray-300">
              Profile Picture URL
            </label>
            <input
              type="text"
              placeholder="Enter your profile picture URL"
              className="w-full p-2 mt-1 text-gray-300 rounded bg-gray-800 border border-gray-500 focus:outline-none"
              name="photoURL"
              value={photoURL}
              onChange={handleInputChange}
            />
          </div>

          
          <div className="relative">
            <label className="block mt-4 font-semibold text-gray-300">
              Password
            </label>
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-2 text-gray-300 rounded bg-gray-800 border border-gray-500 focus:outline-none"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <span
              onClick={() => setShowPassword1(!showPassword1)}
              className="text-gray-200 absolute top-9 right-3 cursor-pointer"
            >
              {showPassword1 ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>

          
          <div className="relative">
            <label className="block mt-4 font-semibold text-gray-300">
              Confirm Password
            </label>
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full p-2 mt-1 text-gray-300 rounded bg-gray-800 border border-gray-500 focus:outline-none"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />
            <span
              onClick={() => setShowPassword2(!showPassword2)}
              className="text-gray-200 absolute top-10 right-3 cursor-pointer"
            >
              {showPassword2 ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>

          
          <div className="flex justify-between items-center mt-3 text-gray-300 text-sm">
            <span className="font-semibold">Already have an account?</span>
            <NavLink
              to="/auth/login"
              className="hover:bg-transparent hover:underline"
            >
              Login
            </NavLink>
          </div>

          
          <div>
            <button
              type="submit"
              className={`w-full py-2 mt-4 text-white bg-purple-700 rounded hover:bg-purple-600 cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Register;
