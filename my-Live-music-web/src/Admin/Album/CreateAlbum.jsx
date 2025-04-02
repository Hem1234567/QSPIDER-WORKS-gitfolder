import React, { useState } from "react";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { __DB } from "../../backend/Firebaseconfig.js"; // Import your Firebase configuration

const CreateAlbum = () => {
  const navigate = useNavigate();

  // Album state
  const [album, setAlbum] = useState({
    title: "",
    language: "",
    type: "",
    description: "",
    releaseDate: "",
    releaseYear: "",
    songsCount: "",
    starcast: "",
    director: "",
    thumbnail: null,
  });

  // Song state
  const [songs, setSongs] = useState([
    {
      title: "",
      singers: "",
      lyricist: "",
      musicDirector: "",
      thumbnail: null,
      songFile: null,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // Handle album input changes
  const handleAlbumChange = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  // Handle album file upload
  const handleAlbumFileChange = (e) => {
    setAlbum({ ...album, thumbnail: e.target.files[0] });
  };

  // Handle song input changes
  const handleSongChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSongs = [...songs];
    updatedSongs[index][name] = value;
    setSongs(updatedSongs);
  };

  // Handle song file upload
  const handleSongFileChange = (index, e) => {
    const { name, files } = e.target;
    const updatedSongs = [...songs];
    updatedSongs[index][name] = files[0];
    setSongs(updatedSongs);
  };

  // Add a new song field
  const addSong = () => {
    setSongs([
      ...songs,
      {
        title: "",
        singers: "",
        lyricist: "",
        musicDirector: "",
        thumbnail: null,
        songFile: null,
      },
    ]);
  };

  // Remove a song field
  const removeSong = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    setSongs(updatedSongs);
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file, resourceType = "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Music_web");
    formData.append("cloud_name", "dzf0ggbrg");
    formData.append("resource_type", resourceType);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dzf0ggbrg/${
          resourceType === "image" ? "image" : "video"
        }/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to upload ${resourceType}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error(`Error uploading ${resourceType}:`, error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!album.title || !album.thumbnail || songs.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validate each song has title and file
    for (const song of songs) {
      if (!song.title || !song.songFile) {
        toast.error("Please fill all required song fields");
        return;
      }
    }

    setIsLoading(true);

    try {
      // 1. Upload album thumbnail
      let uploadedAlbumThumbnailUrl = "";
      if (album.thumbnail) {
        uploadedAlbumThumbnailUrl = await uploadToCloudinary(album.thumbnail);
        console.log("Album Thumbnail URL:", uploadedAlbumThumbnailUrl);
      }

      // 2. Upload songs and their thumbnails
      const uploadedSongs = await Promise.all(
        songs.map(async (song) => {
          // Upload song thumbnail if exists
          let songThumbnailUrl = "";
          if (song.thumbnail) {
            songThumbnailUrl = await uploadToCloudinary(song.thumbnail);
          }

          // Upload song file
          let songFileUrl = "";
          if (song.songFile) {
            songFileUrl = await uploadToCloudinary(song.songFile, "video");
          }

          return {
            title: song.title,
            singers: song.singers,
            lyricist: song.lyricist,
            musicDirector: song.musicDirector,
            thumbnailUrl: songThumbnailUrl,
            songFileUrl: songFileUrl,
            duration: 0, // You might want to calculate this
            plays: 0, // Initial play count
            createdAt: new Date().toISOString(),
          };
        })
      );

      // 3. Prepare album data for Firestore
      const albumData = {
        title: album.title,
        language: album.language,
        type: album.type,
        description: album.description,
        releaseDate: album.releaseDate,
        releaseYear: album.releaseYear,
        songsCount: songs.length,
        starcast: album.starcast,
        director: album.director,
        thumbnailUrl: uploadedAlbumThumbnailUrl,
        songs: uploadedSongs,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0, // Initial likes count
        views: 0, // Initial views count
      };

      // 4. Save to Firestore using your imported __DB
      const docRef = await addDoc(collection(__DB, "albums"), albumData);
      console.log("Album created with ID: ", docRef.id);

      toast.success("Album added successfully!");
      navigate("/albums"); // Redirect to albums page
    } catch (error) {
      console.error("Error creating album:", error);
      toast.error("Error creating album: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-8 min-h-screen flex justify-center items-center w-[90%]">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-center text-xl font-semibold mb-4">Add Album</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title*"
            className="p-2 bg-gray-700 rounded"
            value={album.title}
            onChange={handleAlbumChange}
            required
          />

          <input
            type="text"
            name="language"
            placeholder="Language"
            className="p-2 bg-gray-700 rounded"
            value={album.language}
            onChange={handleAlbumChange}
          />

          <input
            type="text"
            name="type"
            placeholder="Album Type"
            className="p-2 bg-gray-700 rounded"
            value={album.type}
            onChange={handleAlbumChange}
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 bg-gray-700 rounded mb-4"
          value={album.description}
          onChange={handleAlbumChange}
        />

        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            name="releaseDate"
            className="p-2 bg-gray-700 rounded"
            value={album.releaseDate}
            onChange={handleAlbumChange}
          />

          <input
            type="text"
            name="releaseYear"
            placeholder="Release Year"
            className="p-2 bg-gray-700 rounded"
            value={album.releaseYear}
            onChange={handleAlbumChange}
          />

          <input
            type="text"
            name="songsCount"
            placeholder="Number of Songs"
            className="p-2 bg-gray-700 rounded"
            value={songs.length}
            onChange={handleAlbumChange}
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="starcast"
            placeholder="Starcast"
            className="p-2 bg-gray-700 rounded"
            value={album.starcast}
            onChange={handleAlbumChange}
          />

          <input
            type="text"
            name="director"
            placeholder="Director"
            className="p-2 bg-gray-700 rounded"
            value={album.director}
            onChange={handleAlbumChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Album Thumbnail*</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleAlbumFileChange}
            required
          />
        </div>

        <h3 className="text-center text-lg font-semibold mb-4">Add Songs</h3>

        {songs.map((song, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
            <h4 className="text-lg mb-2">Song {index + 1}</h4>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="title"
                placeholder="Song Name*"
                className="p-2 bg-gray-800 rounded"
                value={song.title}
                onChange={(e) => handleSongChange(index, e)}
                required
              />

              <input
                type="text"
                name="singers"
                placeholder="Singer(s)"
                className="p-2 bg-gray-800 rounded"
                value={song.singers}
                onChange={(e) => handleSongChange(index, e)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="lyricist"
                placeholder="Lyricist"
                className="p-2 bg-gray-800 rounded"
                value={song.lyricist}
                onChange={(e) => handleSongChange(index, e)}
              />

              <input
                type="text"
                name="musicDirector"
                placeholder="Music Director"
                className="p-2 bg-gray-800 rounded"
                value={song.musicDirector}
                onChange={(e) => handleSongChange(index, e)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Song Thumbnail</label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={(e) => handleSongFileChange(index, e)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Song File* (MP3, WAV, etc.)</label>
              <input
                type="file"
                name="songFile"
                accept="audio/*"
                onChange={(e) => handleSongFileChange(index, e)}
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addSong}
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <IoIosAddCircle /> Add Song
              </button>

              {songs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSong(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <IoIosRemoveCircle /> Remove
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Add Album"}
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;
