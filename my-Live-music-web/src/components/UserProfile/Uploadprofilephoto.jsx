import React, { useState } from "react";
import toast from "react-hot-toast";

const UploadProfilePhoto = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Create a preview URL for the selected image
    }
  };

  // Handle photo upload (dummy function, you can replace it with your actual upload logic)
  const handleUpload = () => {
    if (file) {
      // Logic to upload the photo (e.g., call API, upload to cloud storage, etc.)
      console.log("Uploading", file);

      // After upload logic, trigger success toast
      toast.success("Photo uploaded successfully!");

      // Reset the file and preview after upload
      setFile(null);
      setPreview(null);
    } else {
      toast.error("Please select a photo first.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-20px)] bg-gray-900 text-white w-[90%]">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center flex justify-center items-center flex-col">
        {/* Show image preview or text if no image is selected */}
        <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center mb-4">
          {preview ? (
            <img
              className="w-24 h-24 rounded-full"
              src={preview}
              alt="Preview"
            />
          ) : (
            <span className="text-white">No Image Uploaded</span>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4 text-purple-400">
          Upload Profile Photo
        </h2>

        {/* File Input */}
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-500 file:text-white
                    hover:file:bg-purple-600 ml-20"
        />

        <div className="mt-4 flex justify-between gap-10">
          <button
            className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
            onClick={() => {
              setFile(null);
              setPreview(null);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-purple-500 px-4 py-2 rounded-lg text-white hover:bg-purple-600"
            onClick={handleUpload}
          >
            Upload Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProfilePhoto;
