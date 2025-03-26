import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { __AUTH } from "../backend/Firebaseconfig.js";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { username, email, password, confirmPassword } = userData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        __AUTH,
        email,
        password
      );
      console.log(registeredUser);
      toast.success("Registered successfully");
    } catch (error) {
      toast.error(error.code.slice(5));
    }
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
            <label
              htmlFor="username"
              className="block font-semibold text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-2 mt-1 text-gray-300 rounded bg-gray-700 border border-gray-500 focus:outline-none"
              id="username"
              value={username}
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mt-4 font-semibold text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 text-gray-300 rounded bg-gray-700 border border-gray-500 focus:outline-none"
              id="email"
              value={email}
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mt-4 font-semibold text-gray-300"
            >
              Password
            </label>
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-2 text-gray-300 rounded bg-gray-700 border border-gray-500 focus:outline-none"
              id="password"
              value={password}
              name="password"
              onChange={handleInputChange}
            />
            <span
              onClick={() => setShowPassword1(!showPassword1)}
              className="text-gray-200 absolute top-9 right-3 cursor-pointer"
            >
              {showPassword1 ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mt-4 font-semibold text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full p-2 mt-1 text-gray-300 rounded bg-gray-700 border border-gray-500 focus:outline-none"
              id="confirmPassword"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleInputChange}
            />
            <span
              onClick={() => setShowPassword2(!showPassword2)}
              className="text-gray-200 absolute top-10 right-3 cursor-pointer"
            >
              {showPassword2 ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>
          <div className="flex justify-between mt-4 text-gray-300 text-sm">
            <span className="font-semibold">Already have an account?</span>
            <a href="#" className="text-gray-300 hover:underline font-semibold">
              Login
            </a>
          </div>
          <div>
            <button className="w-full py-2 mt-4 text-white bg-purple-700 rounded hover:bg-purple-600 cursor-pointer">
              Register
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Register;
