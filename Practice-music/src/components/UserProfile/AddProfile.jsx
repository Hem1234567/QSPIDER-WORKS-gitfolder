import React from "react";

const AddProfile = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-20px)] bg-gray-900 text-white w-[90%]">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-2/3 max-w-lg border-b-2 border-white">
        <h2 className="text-center text-xl font-bold text-purple-500 mb-4">
          Update Profile
        </h2>

        <form className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="FirstName"
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
            <input
              type="text"
              placeholder="LastName"
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
          </div>

          <div className="flex space-x-4">
            <input
              type="date"
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
            <input
              type="number"
              placeholder="Age"
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-white">Gender:</label>
            <label className="text-white">
              <input type="radio" name="gender" className="mr-1" /> Male
            </label>
            <label className="text-white">
              <input type="radio" name="gender" className="mr-1" /> Female
            </label>
            <label className="text-white">
              <input type="radio" name="gender" className="mr-1" /> Other
            </label>
          </div>

          <textarea
            placeholder="Address"
            className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600"
          ></textarea>

          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Country"
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
            <input
              type="text"
              placeholder="State"
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="City"
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
            <input
              type="text"
              placeholder="Language"
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
          </div>

          <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md">
            Add Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;
