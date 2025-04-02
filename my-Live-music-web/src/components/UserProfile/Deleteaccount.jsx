import React from "react";
import { useState } from "react";

const Deleteaccount = () => {
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    if (inputValue === "DELETE") {
      alert("Account deleted successfully!");
    } else {
      alert("Please type 'DELETE' to confirm.");
    }
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh-20px)] bg-gray-900 text-white w-[90%]">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-500 mb-4">
          Deleting Account
        </h2>
        <p className="text-white mb-2">
          Deleting your account will remove all of your information from our
          database.
        </p>
        <p className="text-white mb-4">This cannot be recovered.</p>
        <p className="text-white mb-2">
          To confirm this, type{" "}
          <span className="font-bold text-gray-300">"DELETE"</span>
        </p>
        <input
          type="text"
          placeholder="Type DELETE"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />
        <button
          className="w-full p-3 bg-gray-600 text-white font-bold rounded-md hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

export default Deleteaccount;
