import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { __AUTH } from "../backend/Firebaseconfig.js";
import { FaGoogle } from "react-icons/fa";
import Spinner from "../Helper/Spinner.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
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
        toast.error(
          "Email not verified! Verification email sent. Please check your inbox."
        );
      }
    } catch (error) {
      toast.error(error.code.replace("auth/", ""));
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(__AUTH, provider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName || "User"}!`);
      navigate("/");
    } catch (error) {
      toast.error("Google Sign-In failed. Try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900 relative">
      {/* Full-Screen Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}

      {/* Login Form */}
      <article className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg border-b-2 border-amber-50 relative z-10">
        <header>
          <h2 className="text-2xl font-semibold text-center text-purple-400 mb-6">
            Login with Email
          </h2>
        </header>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
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

          {/* Password Input with Toggle */}
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
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>

          {/* Remember Me & Register Link */}
          <div className="flex items-center justify-between mt-4 text-gray-300">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                className="mr-2 accent-purple-500"
              />{" "}
              Remember Me
            </label>
            <NavLink
              to="/auth/register"
              className="hover:underline hover:text-purple-400 text-xs text-gray-200"
            >
              Don't have an account?
            </NavLink>
          </div>

          {/* Reset Password */}
          <div className="flex justify-between mt-2 text-sm">
            <NavLink
              to="/auth/forgot-password"
              className="hover:underline hover:text-purple-400 text-gray-200"
            >
              Forgotten Password?
            </NavLink>
            <NavLink
              to="/auth/reset-password"
              className="hover:underline hover:text-purple-400 text-gray-200"
            >
              Reset Password
            </NavLink>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-2 mt-4 text-white bg-purple-700 rounded hover:bg-purple-600 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              Login
            </button>
          </div>

          {/* Google Sign-In Button */}
          <div className="mt-4 flex justify-center items-center text-gray-300">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
            >
              <div className="bg-white p-2 rounded-full">
                <FaGoogle className="text-gray-800" />
              </div>
              <span className="ml-4">Sign In with Google</span>
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Login;
