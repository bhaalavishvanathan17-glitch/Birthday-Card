import React, { useState, useRef } from "react";
import { Mic, Play, Pause } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function VoiceMessage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFile, setHasFile] = useState(true);
  const audioRef = useRef(null);

  const voiceData = birthdayConfig.voiceMessage || {
    file: "/audio/voice-message.mp3",
    title: "A Voice Note From My Heart 🎙️",
    subtext: "Listen to a personal recording..."
  };

  const togglePlay = () => {
    if (!audioRef.current || !hasFile) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasFile(false));
    }
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="voice-message">
      <audio
        ref={audioRef}
        src={voiceData.file}
        onError={() => setHasFile(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl relative">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-lg">
          <Mic className="w-7 h-7" />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-pink-100 mb-2">
          {voiceData.title}
        </h2>
        <p className="text-pink-200/70 text-xs md:text-sm mb-6">
          {voiceData.subtext}
        </p>

        {hasFile ? (
          <div className="bg-burgundy-dark/70 rounded-2xl p-5 border border-white/10 flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <div className="flex-1 flex items-center space-x-1 h-8">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all ${
                    isPlaying ? "bg-rose-400 animate-pulse" : "bg-pink-300/40"
                  }`}
                  style={{
                    height: `${(i % 5 + 2) * 5}px`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-pink-200/70 text-xs italic">
            (Optional audio recording file `/public/audio/voice-message.mp3` not found. Silent note mode active.)
          </div>
        )}
      </div>
    </section>
  );
}
