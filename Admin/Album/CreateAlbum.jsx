import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { __DB } from "../../backend/Firebaseconfig.js";

const CreateAlbum = () => {
  // State for Album Details
  const [album, setAlbum] = useState({
    title: "",
    language: "",
    type: "",
    description: "",
    releaseDate: "",
    releaseYear: "",
    starcast: "",
    director: "",
    thumbnail: null,
  });

  // State for Songs
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

  // Handle song file uploads
  const handleSongFileChange = (index, e) => {
    const { name, files } = e.target;
    const updatedSongs = [...songs];
    updatedSongs[index][name] = files[0];
    setSongs(updatedSongs);
  };

  // Add new song form
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

  // Remove song form
  const removeSong = (index) => {
    if (songs.length > 1) {
      const updatedSongs = songs.filter((_, i) => i !== index);
      setSongs(updatedSongs);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!album.title || !album.thumbnail) {
        throw new Error("Album title and thumbnail are required");
      }

      if (songs.some((song) => !song.title || !song.songFile)) {
        throw new Error("All songs must have a title and audio file");
      }

      // Upload album thumbnail
      let albumThumbnailUrl = "";
      if (album.thumbnail) {
        const formData = new FormData();
        formData.append("file", album.thumbnail);
        formData.append("upload_preset", "Music_web");
        formData.append("cloud_name", "dzf0ggbrg");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzf0ggbrg/image/upload",
          { method: "POST", body: formData }
        );

        if (!response.ok) throw new Error("Album thumbnail upload failed");
        const data = await response.json();
        albumThumbnailUrl = data.secure_url;
      }

      // Upload songs
      const uploadedSongs = await Promise.all(
        songs.map(async (song) => {
          let songThumbnailUrl = "";
          let songFileUrl = "";
          let duration = "0:00";
          let size = "0MB";

          // Upload song thumbnail if exists
          if (song.thumbnail) {
            const formData = new FormData();
            formData.append("file", song.thumbnail);
            formData.append("upload_preset", "Music_web");
            formData.append("cloud_name", "dzf0ggbrg");

            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dzf0ggbrg/image/upload",
              { method: "POST", body: formData }
            );

            if (!response.ok) throw new Error("Song thumbnail upload failed");
            const data = await response.json();
            songThumbnailUrl = data.secure_url;
          }

          // Upload song file (required)
          const songFormData = new FormData();
          songFormData.append("file", song.songFile);
          songFormData.append("upload_preset", "Music_web");
          songFormData.append("cloud_name", "dzf0ggbrg");
          songFormData.append("resource_type", "video"); // For audio files

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dzf0ggbrg/upload",
            { method: "POST", body: songFormData }
          );

          if (!response.ok) throw new Error("Song file upload failed");
          const data = await response.json();
          songFileUrl = data.secure_url;

          // Calculate duration and size
          if (data.duration) {
            const seconds = Math.floor(data.duration);
            duration = `${Math.floor(seconds / 60)}:${(seconds % 60)
              .toString()
              .padStart(2, "0")}`;
          }
          if (data.bytes) {
            size = `${(data.bytes / (1024 * 1024)).toFixed(2)} MB`;
          }

          return {
            title: song.title,
            singers: song.singers,
            lyricist: song.lyricist,
            musicDirector: song.musicDirector,
            thumbnail: songThumbnailUrl,
            file: songFileUrl,
            duration,
            size,
          };
        })
      );

      // Prepare Firestore document
      const albumDoc = {
        ...album,
        thumbnail: albumThumbnailUrl,
        songs: uploadedSongs,
        songsCount: songs.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Remove file objects before sending to Firestore
      delete albumDoc.thumbnailFile;
      uploadedSongs.forEach((song) => {
        delete song.thumbnailFile;
        delete song.songFile;
      });

      // Add to Firestore
      const albumCollection = collection(__DB, "music-albums");
      await addDoc(albumCollection, albumDoc);

      toast.success("Album created successfully!");
      // Reset form after success
      setAlbum({
        title: "",
        language: "",
        type: "",
        description: "",
        releaseDate: "",
        releaseYear: "",
        starcast: "",
        director: "",
        thumbnail: null,
      });
      setSongs([
        {
          title: "",
          singers: "",
          lyricist: "",
          musicDirector: "",
          thumbnail: null,
          songFile: null,
        },
      ]);
    } catch (error) {
      console.error("Error creating album:", error);
      toast.error(error.message || "Failed to create album");
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
