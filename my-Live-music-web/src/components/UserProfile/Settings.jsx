import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../context/AuthContextApi";

const Settings = () => {
  const { authUser } = useContext(AuthUserContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (inputValue !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm.");
      return;
    }

    if (!authUser) {
      toast.error("No authenticated user found!");
      return;
    }

    try {
      setIsLoading(true);

      // Re-authentication is required before deleting an account
      const credential = EmailAuthProvider.credential(
        authUser.email,
        prompt("Enter your password for security:")
      );
      await reauthenticateWithCredential(authUser, credential);

      // Now delete the user account
      await deleteUser(authUser);

      toast.success("Account deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please re-login before deleting your account.");
      } else {
        toast.error(error.message);
      }
    }

    setIsLoading(false);
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
          className={`w-full p-3 rounded-md font-bold transition-all ${
            inputValue === "DELETE"
              ? "bg-red-600 hover:bg-red-800"
              : "bg-gray-700 cursor-not-allowed opacity-50"
          }`}
          onClick={handleDelete}
          disabled={inputValue !== "DELETE" || isLoading}
        >
          {isLoading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
