import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure toast is imported
import cities from "../../data/cities.json";
import countries from "../../data/countries.json";
import languages from "../../data/language.json";
import states from "../../data/states.json";
import { AuthUserContext } from "../../Context/AuthContextApi";



// Import Firebase methods
import { doc, setDoc } from "firebase/firestore";
import { __DB} from "../../../src/backend/Firebaseconfig.js"
const AddProfile = () => {
  let { authUser } = useContext(AuthUserContext); // Access authUser from context
  let navigate = useNavigate(); // Use navigate hook to redirect

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset city when country changes
    if (name === "country") {
      setFormData({ ...formData, country: value, city: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Adding profile...");
    try {
      const { displayName, photoURL, email, uid } = authUser;

      // Prepare the data for Firestore (no nested payload)
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        age: formData.age,
        gender: formData.gender,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        language: formData.language,
        photoURL,
        email,
        uid,
        displayName
      };

      // Firebase Firestore: Set document for user profile
      const userProfileDoc = doc(__DB, "user_details", uid);

      // Store the document in Firestore
      await setDoc(userProfileDoc, payload);

      // Redirect to the profile page after success
      toast.success("Account added successfully!");
      navigate("/user/profile"); // Navigate to the profile page
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.log("Error while uploading data:", error);
    }

    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-20px)] bg-gray-900 text-white w-[90%]">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-2/3 max-w-lg border-b-2 border-white">
        <h2 className="text-center text-xl font-bold text-purple-500 mb-4">
          Update Profile
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
          </div>

          <div className="flex space-x-4">
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="gender" className="text-white">
              Gender:
            </label>
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="text-white">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                {gender}
              </label>
            ))}
          </div>

          <textarea
            name="address"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600"
          ></textarea>

          <div className="flex space-x-4">
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <select
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            >
              <option value="" disabled>
                Select City
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              name="language"
              id="language"
              value={formData.language}
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-800 text-white rounded-md border border-gray-600"
            >
              <option value="" disabled>
                Select Language
              </option>
              {languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md"
          >
            Add Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;
