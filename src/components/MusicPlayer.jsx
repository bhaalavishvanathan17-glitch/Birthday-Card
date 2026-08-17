import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer({ audioRef, isPlaying, setIsPlaying, hasMusic }) {
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("0:00");
  const [durationStr, setDurationStr] = useState("0:00");
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  // If there's no music file or it failed to load, don't show the player
  if (!hasMusic) return null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTimeStr(formatTime(audio.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      setDurationStr(formatTime(audio.duration));
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    // If metadata was already loaded
    if (audio.duration) {
      setDurationStr(formatTime(audio.duration));
    }

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked: ", err));
      setIsPlaying(true);
    }
  };

  const handleProgressChange = (e) => {
    const newPercent = parseFloat(e.target.value);
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (newPercent / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newPercent);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end justify-end select-none">
      <AnimatePresence>
        {showFullPlayer ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass p-4 rounded-2xl w-72 shadow-lg flex flex-col gap-3 mr-2"
          >
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center text-rose-500 animate-spin" style={{ animationDuration: '8s', animationPlayState: isPlaying ? 'running' : 'paused' }}>
                <Music className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-poppins text-xs font-semibold text-rose-950 truncate">Our Special Song</h4>
                <p className="font-inter text-[10px] text-rose-700/70 truncate">Celebrating My Love</p>
              </div>
              <button 
                onClick={() => setShowFullPlayer(false)}
                className="text-[10px] uppercase font-poppins text-rose-800 font-bold px-2 py-1 rounded-md hover:bg-rose-100/50 cursor-pointer"
              >
                Hide
              </button>
            </div>

            {/* Timeline slider */}
            <div className="flex flex-col gap-1">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none"
                aria-label="Song progress"
              />
              <div className="flex justify-between font-inter text-[10px] text-rose-700">
                <span>{currentTimeStr}</span>
                <span>{durationStr}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-1">
              {/* Volume */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="text-rose-700 hover:text-rose-800 cursor-pointer focus:outline-none"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none"
                  aria-label="Volume slider"
                />
              </div>

              {/* Play Button */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md cursor-pointer hover:scale-105 transition-all focus:ring-2 focus:ring-rose-300 focus:outline-none"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-[1px]" />}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Mini Floating Icon Trigger */
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setShowFullPlayer(true)}
            aria-label="Open music player"
            className="w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg flex items-center justify-center cursor-pointer border border-rose-300/30 hover:scale-105 active:scale-95 transition-all focus:ring-4 focus:ring-rose-300 focus:outline-none"
          >
            {isPlaying ? (
              <span className="flex items-center gap-[2px]">
                <span className="w-[3px] h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-[3px] h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                <span className="w-[3px] h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
              </span>
            ) : (
              <Music className="w-5 h-5 animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
