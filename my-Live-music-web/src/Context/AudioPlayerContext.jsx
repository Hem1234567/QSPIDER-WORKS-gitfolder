import React, { createContext, useState, useMemo } from "react";

export const GlobalAudioPlayer = createContext();

const AudioPlayerContext = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [volume, setVolume] = useState(0.8);

  const value = useMemo(
    () => ({
      songs,
      setSongs,
      isPlaying,
      setIsPlaying,
      currentSongIndex,
      setCurrentSongIndex,
      volume,
      setVolume,
      songUrlKey: "fileUrl",
      songNameKey: "title",
      songThumbnailKey: "thumbnail",
      songSingerKey: "singers",
    }),
    [songs, isPlaying, currentSongIndex, volume]
  );

  return (
    <GlobalAudioPlayer.Provider value={value}>
      {children}
    </GlobalAudioPlayer.Provider>
  );
};

export default AudioPlayerContext;
