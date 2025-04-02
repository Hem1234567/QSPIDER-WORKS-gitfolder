import React, { useContext, useState } from "react";
import { FaUserXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { AuthUserContext } from "../../Context/AuthContextApi";
import { backendUserContext } from "../../Context/FetchUserContext";

const MyAccount = () => {
  // Destructure authUser from context
  let { authUser } = useContext(AuthUserContext);
  let {userData} = useContext(backendUserContext);
  console.log(userData);

  

  // Check if authUser is null or undefined
  if (!authUser) {
    return (
      <section className="w-[90%] h-[calc(100vh-20px)] flex justify-center items-center bg-gray-900">
        <article className="w-[50%] bg-gray-700 flex justify-center items-center p-4 flex-col rounded-xl">
          <h3 className="text-2xl font-bold text-white">User not logged in</h3>
          <NavLink
            to="/auth/login"
            className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold inline-block"
          >
            Login
          </NavLink>
        </article>
      </section>
    );
  }

  // Render if authUser exists
  return (
    <section className="w-[90%] h-[calc(100vh-20px)] flex justify-center items-center bg-gray-900">
      <article className="w-[50%] bg-gray-700 flex justify-center items-center p-4 flex-col rounded-xl">
        <header className="flex flex-col justify-center items-center bg-gray-900 w-full py-4">
          <img
            className="w-24 h-24 rounded-full"
            src={
              authUser.photoURL ||
              "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1677509740.jpg"
            }
            alt="User Avatar"
          />
          <h2 className="text-lg font-semibold mt-2 text-center text-white">
            {authUser.displayName || "User"}
          </h2>
          <p className="text-sm text-gray-400 text-center">
            {authUser.email || "No email provided"}
          </p>
        </header>

        <main className="w-full flex flex-col justify-center items-center">
          <h1 className="text-center text-2xl font-bold uppercase p-3 text-white">
            Personal Details
          </h1>

          {/* Conditionally render the message if user details are missing */}
          {(!authUser.name || !authUser.email) && (
            <h3 className="text-2xl font-bold text-white">
              User details not found
            </h3>
          )}

          <div className="text-9xl flex justify-center items-center mt-4">
            <FaUserXmark className="text-red-500" />
          </div>

          <NavLink
            to="/user/profile/add-profile"
            className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold inline-block"
          >
            Add details
          </NavLink>
        </main>
      </article>
    </section>
  );
};

export default MyAccount;
