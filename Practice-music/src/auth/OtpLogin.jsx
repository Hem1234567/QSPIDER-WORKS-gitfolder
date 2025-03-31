import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { __AUTH } from "../backend/Firebaseconfig.js"; // Import Firebase authentication instance
import toast from "react-hot-toast";

const OtpLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        __AUTH,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => handleSendOtp(),
        }
      );
    }
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10 || isNaN(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    setupRecaptcha();

    try {
      const formattedPhone = `+91${phone}`; // Modify for your country code
      const confirmation = await signInWithPhoneNumber(
        __AUTH,
        formattedPhone,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    try {
      await confirmationResult.confirm(otp);
      toast.success("Phone number verified!");
    } catch (error) {
      toast.error("Invalid OTP, please try again");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 border-b-2 border-white">
        <h2 className="text-3xl font-bold text-purple-500 mb-6 text-center">
          {isOtpSent ? "Verify OTP" : "Login with OTP"}
        </h2>

        {!isOtpSent ? (
          <>
            <label className="block text-white font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              maxLength="10"
              placeholder="Enter your 10-digit phone number"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none"
              value={phone}
              onChange={handlePhoneChange}
            />
            <button
              className={`w-full mt-4 p-2 text-white font-bold rounded-md ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-purple-700 hover:bg-purple-600"
              }`}
              onClick={handleSendOtp}
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <label className="block text-white font-semibold mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className={`w-full mt-4 p-2 text-white font-bold rounded-md ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-600"
              }`}
              onClick={handleVerifyOtp}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        <div className="flex justify-between items-center mt-4 text-gray-300">
          <p className="font-semibold">Forgotten Password?</p>
          <a
            href="#"
            className="text-white font-semibold hover:underline hover:text-purple-500"
          >
            Reset Password
          </a>
        </div>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default OtpLogin;
