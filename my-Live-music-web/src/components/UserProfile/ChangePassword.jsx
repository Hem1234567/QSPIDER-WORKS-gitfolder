import React from "react";

const ChangePassword = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-20px)] bg-gray-900 text-white w-[90%]">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg border-b-2 border-white">
        <h2 className="text-center text-2xl font-bold text-purple-500 mb-4">
          Change Password
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
