import React from "react";
import { FaBackward, FaForward, FaPlay, FaPause, FaInfoCircle, FaListUl } from "react-icons/fa";

const TopBar = ({ isPlaying, onPlayPause, onSkip, onVolumeChange, currentVolume }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex items-center justify-between px-6 py-3 shadow-lg z-50">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={() => onSkip("backward")} className="text-xl">
          <FaBackward />
        </button>
        <button onClick={onPlayPause} className="text-xl">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={() => onSkip("forward")} className="text-xl">
          <FaForward />
        </button>
      </div>

      {/* Podcast Artwork */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <FaInfoCircle className="text-white" />
        </div>
        <p className="hidden sm:block text-sm font-semibold">Podcast Name</p>
      </div>

      {/* Playback Progress */}
      <div className="hidden sm:flex flex-1 mx-4">
        <input
          type="range"
          className="w-full"
          min="0"
          max="100"
          defaultValue="50"
          onChange={() => {}}
        />
      </div>

      {/* Volume and Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <input
            type="range"
            className="w-20"
            min="0"
            max="100"
            value={currentVolume}
            onChange={onVolumeChange}
          />
        </div>
        <button className="text-xl">
          <FaInfoCircle />
        </button>
        <button className="text-xl">
          <FaListUl />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
