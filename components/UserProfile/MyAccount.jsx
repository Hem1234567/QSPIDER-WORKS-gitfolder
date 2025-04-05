import React, { useContext } from "react";
import { FaUserXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { backendUserContext } from "../../Context/FetchUserContext";
import { AuthUserContext } from "../../context/AuthContextApi";

const MyAccount = () => {
  let { authUser } = useContext(AuthUserContext);
  let { userData } = useContext(backendUserContext);

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

  return (
    <section className="w-[100%] h-[calc(100vh-20px)] flex justify-center items-center bg-gray-900">
      <article className="w-[70%] bg-gray-700 p-6 rounded-xl">
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

        <main className="w-full mt-6">
          <h1 className="text-center text-2xl font-bold uppercase p-3 text-white">
            Personal Details
          </h1>
          {!userData || Object.keys(userData).length === 0 ? (
            <div className="flex flex-col items-center">
              <FaUserXmark className="text-red-500 text-9xl mt-4" />
              <h3 className="text-2xl font-bold text-white">
                User details not found
              </h3>
              <NavLink
                to="/user/profile/add-profile"
                className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold inline-block"
              >
                Add details
              </NavLink>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Name", userData.displayName],
                ["Role", userData.role],
                ["Gender", userData.gender],
                ["DOB", userData.DOB],
                ["Age", userData.age],
                ["Language", userData.language],
                ["Country", userData.country],
                ["State", userData.state],
                ["City", userData.city],
              ].map(([label, value], index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-800 p-4 rounded"
                >
                  <span className="text-sm font-semibold text-white">
                    {label}
                  </span>
                  <input
                    className="bg-gray-900 text-gray-300 px-2 py-1 rounded mt-1"
                    value={value || "Not specified"}
                    disabled
                  />
                </div>
              ))}
              <div className="col-span-3 flex flex-col bg-gray-800 p-4 rounded">
                <span className="text-sm font-semibold text-white">
                  Address
                </span>
                <textarea
                  className="bg-gray-900 text-gray-300 px-2 py-1 rounded mt-1"
                  value={userData.address || "Not specified"}
                  disabled
                />
              </div>
            </div>
          )}
        </main>
      </article>
    </section>
  );
};

export default MyAccount;
