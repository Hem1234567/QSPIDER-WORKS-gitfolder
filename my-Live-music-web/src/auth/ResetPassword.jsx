import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { __AUTH } from "../backend/Firebaseconfig.js";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleReset = async (e) => {
    e.preventDefault(); 

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(__AUTH, email);
      toast.success(`Password reset link sent to ${email}`);
      setEmail(""); 
      setTimeout(() => navigate("/auth/login"), 2000); 
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 border-b-2 border-white">
        <h2 className="text-3xl font-bold text-purple-500 mb-6 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleReset}>
          {" "}
          {}
          <label
            htmlFor="email"
            className="block text-white font-semibold mb-2"
          >
            Enter your email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-400 rounded-md bg-gray-700 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex justify-between items-center mt-4 text-gray-300">
            <NavLink
              to="/auth/login"
              className="text-white font-semibold hover:underline"
            >
              Already have a password?
            </NavLink>
            <NavLink
              to="/auth/login"
              className="text-white font-semibold hover:underline hover:text-purple-500"
            >
              Login
            </NavLink>
          </div>
          <button
            type="submit"
            className={`w-full mt-4 p-2 text-white font-bold rounded-md ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-green-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Sending reset link..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
