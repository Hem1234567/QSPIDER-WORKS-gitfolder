import React from "react";
import { useState } from "react";



const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg border-b-2 border-amber-50">
        <h2 className="text-2xl font-semibold text-center text-purple-400 mb-6">
          Login with Email
        </h2>
        <form>
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mt-1 text-white rounded bg-gray-800 border border-gray-400 focus:outline-none"
          />

          <label className="block mt-4 text-gray-300">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-2 text-white rounded bg-gray-800 border border-gray-400 focus:outline-none"
            />
            <i
              className={`fa-solid fa-eye absolute right-3 top-3 text-gray-400 cursor-pointer ${
                passwordVisible ? "hidden" : "block"
              }`}
              onClick={() => setPasswordVisible(true)}
            ></i>
            <i
              className={`fa-solid fa-eye-slash absolute right-3 top-3 text-gray-400 cursor-pointer ${
                passwordVisible ? "block" : "hidden"
              }`}
              onClick={() => setPasswordVisible(false)}
            ></i>
          </div>

          <div className="flex items-center justify-between mt-4 text-gray-300">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <a href="#" className="text-sm">
              Don't have an account?
            </a>
          </div>

          <div className="flex justify-between mt-2 text-sm text-purple-400">
            <a href="#">Forgotten Password</a>
            <a href="#">Reset Password</a>
          </div>

          <button className="w-full py-2 mt-4 text-white bg-purple-600 rounded hover:bg-purple-700">
            Login
          </button>

          <div className="mt-4 text-center text-gray-300">
            <a href="#" className="text-sm flex items-center justify-center">
              Login with phone number{" "}
              <i className="fa-solid fa-right-from-bracket ml-2"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
  );

};

export default Login;
