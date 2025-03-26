import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { __AUTH } from "../backend/Firebaseconfig.js";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = userData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        __AUTH,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        
        await sendEmailVerification(user);
        toast.error("Email not verified! Please check your inbox.");
      }
    } catch (error) {
      toast.error(error.code.slice(5));
    }
    setIsLoading(false);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <article className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg border-b-2 border-amber-50">
        <header>
          <h2 className="text-2xl font-semibold text-center text-purple-400 mb-6">
            Login with Email
          </h2>
        </header>
        <form onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 text-white rounded bg-gray-800 border border-gray-400 focus:outline-none"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="relative">
            <label className="block mt-4 font-semibold text-gray-300">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 text-gray-300 rounded bg-gray-800 border border-gray-500 focus:outline-none"
              value={password}
              onChange={handleInputChange}
              required
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="text-gray-200 absolute top-9 right-3 cursor-pointer"
            >
              {passwordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>
          <div className="flex items-center justify-between mt-4 text-gray-300">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-purple-500" />{" "}
              Remember Me
            </label>
            <NavLink
              to="/auth/register"
              className="hover:underline hover:text-purple-400 text-xs text-gray-200"
            >
              Don't have an account?
            </NavLink>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <NavLink
              to="/forgot-password"
              className="hover:underline hover:text-purple-400 text-gray-200"
            >
              Forgotten Password
            </NavLink>
            <NavLink
              to="/reset-password"
              className="hover:underline hover:text-purple-400 text-gray-200"
            >
              Reset Password
            </NavLink>
          </div>
          <div>
            <button
              type="submit"
              className={`w-full py-2 mt-4 text-white bg-purple-600 rounded hover:bg-purple-700 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="mt-4 text-center text-gray-300">
            <NavLink
              to="/auth/phone-login"
              className="text-sm flex items-center justify-center hover:underline"
            >
              Login with phone number
            </NavLink>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Login;
