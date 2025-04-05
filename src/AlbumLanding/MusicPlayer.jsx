import React, { useContext } from "react";
import { GlobalAudioPlayer } from "../Context/AudioPlayerContext";

const MusicPlayer = () => {
  const {
    songs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(GlobalAudioPlayer);

  const handlePlayPause = () => {
    if (currentSongIndex === null && songs.length > 0) {
      setCurrentSongIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (songs.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  const handlePrevious = () => {
    if (songs.length === 0) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="flex items-center gap-4">
          {currentSongIndex !== null && songs[currentSongIndex] && (
            <>
              <img
                src={songs[currentSongIndex].thumbnail}
                alt={songs[currentSongIndex].title}
                className="w-12 h-12 rounded"
              />
              <div>
                <h3 className="font-medium">{songs[currentSongIndex].title}</h3>
                <p className="text-sm text-gray-400">
                  {songs[currentSongIndex].singers}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
