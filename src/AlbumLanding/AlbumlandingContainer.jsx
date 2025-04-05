import React, { useContext } from "react";
import AlbumlandingSidebar from "./AlbumlandingSidebar";
import AlbumlandingContent from "./AlbumlandingContent";
import { GlobalAudioPlayer } from "../Context/AudioPlayerContext";
import CustomAudioPlayer from "react-pro-audio-player";
import { Outlet } from "react-router-dom";

const AlbumlandingContainer = () => {
  const {
    songs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
    songUrlKey,
    songNameKey,
    songThumbnailKey,
    songSingerKey,
  } = useContext(GlobalAudioPlayer);

  return (
    <section className="w-screen h-[calc(100vh-20px)] flex flex-col">
      <div className="flex flex-1">
        <AlbumlandingSidebar />
        <AlbumlandingContent >
          <Outlet/>
        </AlbumlandingContent>
      </div>

      {/* Audio Player (Shows Only When a Song is Selected) */}
      {currentSongIndex !== null && (
        <div className="w-full fixed bottom-0">
          <CustomAudioPlayer
            songs={songs}
            isPlaying={isPlaying}
            currentSongIndex={currentSongIndex}
            onPlayPauseChange={setIsPlaying}
            onSongChange={setCurrentSongIndex}
            songUrlKey={songUrlKey}
            songNameKey={songNameKey}
            songThumbnailKey={songThumbnailKey}
            songSingerKey={songSingerKey}
          />
        </div>
      )}
    </section>
  );
};

export default AlbumlandingContainer;
