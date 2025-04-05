import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { __DB } from "../backend/Firebaseconfig";
import { toast } from "react-hot-toast";
import { FaMusic, FaSpinner } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const PopularAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const albumCollectionRef = collection(__DB, "music-albums");
        const querySnapshot = await getDocs(albumCollectionRef);

        if (querySnapshot.empty) {
          setAlbums([]);
          return;
        }

        const albumsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Ensure consistent field names
          albumTitle:
            doc.data().title || doc.data().albumTitle || "Untitled Album",
          albumDesc: doc.data().description || doc.data().albumDesc,
          albumThumbnail: doc.data().thumbnail || doc.data().albumThumbnail,
        }));

        setAlbums(albumsData);
      } catch (err) {
        console.error("Error fetching albums:", err);
        setError("Failed to load albums");
        toast.error("Failed to load albums. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleAlbumClick = (album) => {
    // Pass the full album data via state
    navigate(`/album-details/${encodeURIComponent(album.albumTitle)}`, {
      state: album,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#1E293B] min-h-screen">
      <div className="bg-[#1E293B] text-white px-4 py-2 flex items-center space-x-2 rounded-md mb-6">
        <FaMusic className="text-2xl text-purple-400" />
        <h1 className="text-xl font-bold">Popular Albums Collection</h1>
      </div>

      {albums.length === 0 ? (
        <div className="text-center text-gray-400 py-8 bg-[#1E293B] rounded-lg">
          <p className="text-lg mb-4">No albums found</p>
          <NavLink
            to="/create-album"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Create Your First Album
          </NavLink>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-[#14173F] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleAlbumClick(album)}
            >
              <div className="relative pb-[100%]">
                <img
                  src={
                    album.albumThumbnail ||
                    album.thumbnail ||
                    "https://via.placeholder.com/300"
                  }
                  alt={album.albumTitle}
                  className="absolute h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-white font-semibold truncate">
                  {album.albumTitle}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {album.songsCount || album.songs?.length || 0} tracks
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularAlbum;
