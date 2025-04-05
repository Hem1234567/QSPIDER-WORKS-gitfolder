import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaDownload, FaPlay } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { GlobalAudioPlayer } from "../Context/AudioPlayerContext";

const AlbumDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    songs: contextSongs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(GlobalAudioPlayer);

  // Extract and transform album data with proper fallbacks
  const album = {
    title:
      location.state?.title || location.state?.albumTitle || "Untitled Album",
    description:
      location.state?.description ||
      location.state?.albumDesc ||
      "No description available",
    language:
      location.state?.language || location.state?.albumLang || "Unknown",
    releaseDate:
      location.state?.releaseDate ||
      location.state?.albumReleaseDate ||
      "Unknown",
    releaseYear: location.state?.releaseYear || "Unknown",
    type: location.state?.type || location.state?.albumType || "Unknown",
    starcast:
      location.state?.starcast || location.state?.albumStarcast || "Unknown",
    director:
      location.state?.director || location.state?.albumDirector || "Unknown",
    thumbnail:
      location.state?.thumbnail ||
      location.state?.albumThumbnail ||
      "https://via.placeholder.com/300",
    songs:
      location.state?.songs?.map((song, index) => ({
        id: song.id || index,
        title: song.title || "Untitled Track",
        singers: song.singers || "Various Artists",
        musicDirector: song.musicDirector || "Unknown",
        duration: song.duration || "0:00",
        size: song.size || "0 MB",
        thumbnail:
          song.thumbnail ||
          location.state?.thumbnail ||
          "https://via.placeholder.com/150",
        fileUrl: song.file || song.fileUrl || null,
      })) || [],
    songsCount:
      location.state?.songsCount || location.state?.albumSongsCount || 0,
  };

  // Function to handle song download
  const handleDownload = (fileUrl, songTitle) => {
    if (!fileUrl) {
      toast.error("Download link not available for this song");
      return;
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download =
      `${songTitle.replace(/[^a-z0-9]/gi, "_")}.mp3` || "song.mp3";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Downloading ${songTitle}`);
  };

  // Function to handle song playback
  const handlePlaySong = (index) => {
    // Update the global player with this album's songs
    setSongs(album.songs);
    // Set the current song index
    setCurrentSongIndex(index);
    // Start playing
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-[calc(80vh-20px)] bg-[#1E293B] text-white p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <FaArrowLeft /> Back to Albums
      </button>

      {/* Album Header */}
      <div className="flex flex-col md:flex-row gap-6 bg-[#1E293B] p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
        <div className="w-full md:w-64 h-64 relative">
          <img
            src={album.thumbnail}
            alt={album.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300";
            }}
          />
          <span className="absolute top-2 right-2 bg-rose-600 text-xs font-bold px-2 py-1 rounded">
            {album.type}
          </span>
        </div>

        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold mb-4">{album.title}</h1>
          <p className="text-gray-300">{album.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <DetailItem label="Language" value={album.language} />
            <DetailItem label="Release Date" value={album.releaseDate} />
            <DetailItem label="Release Year" value={album.releaseYear} />
            <DetailItem label="Album Type" value={album.type} />
            <DetailItem label="Starcast" value={album.starcast} />
            <DetailItem label="Director" value={album.director} />
            <DetailItem label="Number of Tracks" value={album.songsCount} />
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="bg-[#1E293B] rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Songs List</h2>

        {album.songs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#14173F]">
                <tr className="text-left border-b-2 border-gray-600">
                  <TableHeader>#</TableHeader>
                  <TableHeader>Play</TableHeader>
                  <TableHeader>Thumbnail</TableHeader>
                  <TableHeader>Track Name</TableHeader>
                  <TableHeader>Singers</TableHeader>
                  <TableHeader>Music Director</TableHeader>
                  <TableHeader>Duration</TableHeader>
                  <TableHeader>Size</TableHeader>
                  <TableHeader>Download</TableHeader>
                </tr>
              </thead>
              <tbody>
                {album.songs.map((song, index) => (
                  <tr
                    key={song.id}
                    className="border-b border-gray-700 hover:bg-[#2a3a52] transition-colors"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handlePlaySong(index)}
                        className={`p-2 rounded-full ${
                          currentSongIndex === index && isPlaying
                            ? "text-green-500"
                            : "text-gray-400 hover:text-white"
                        }`}
                        title="Play this song"
                      >
                        <FaPlay />
                      </button>
                    </TableCell>
                    <TableCell>
                      <img
                        src={song.thumbnail}
                        alt={song.title}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{song.title}</TableCell>
                    <TableCell>{song.singers}</TableCell>
                    <TableCell>{song.musicDirector}</TableCell>
                    <TableCell>{song.duration}</TableCell>
                    <TableCell>{song.size}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleDownload(song.fileUrl, song.title)}
                        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center w-full"
                        title={`Download ${song.title}`}
                        disabled={!song.fileUrl}
                      >
                        <FaDownload
                          className={!song.fileUrl ? "opacity-50" : ""}
                        />
                      </button>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No songs available for this album
          </div>
        )}
      </div>
    </div>
  );
};

// Helper components
const DetailItem = ({ label, value }) => (
  <div>
    <span className="text-gray-400 font-semibold">{label}:</span>{" "}
    <span className="text-white">{value}</span>
  </div>
);

const TableHeader = ({ children }) => (
  <th className="p-3 text-left font-semibold">{children}</th>
);

const TableCell = ({ children, className = "" }) => (
  <td className={`p-3 ${className}`}>{children}</td>
);

export default AlbumDetails;
