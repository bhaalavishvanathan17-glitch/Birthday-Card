import React from "react";
import { motion } from "framer-motion";
import { Music, Play, Pause } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function OurSong({ isPlaying, setIsPlaying, hasMusic, audioRef }) {
  const songData = birthdayConfig.ourSongSection || {};

  const togglePlay = () => {
    if (!audioRef || !audioRef.current || !hasMusic) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Play blocked:", err));
    }
  };

  return (
    <section id="our-song" className="py-24 bg-burgundy-dark text-cream relative overflow-hidden select-none px-6">
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-rose-300 font-mono text-xs uppercase tracking-widest bg-rose-500/20 border border-rose-400/30 px-4 py-1.5 rounded-full mb-3 shadow-md"
          >
            <span>Our Anthem</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold text-pink-100"
          >
            {songData.title || "Our Song 🎵"}
          </motion.h2>
          <p className="font-sans text-sm text-pink-200/70 mt-2">
            {songData.subtitle}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-xl animate-spin" style={{ animationDuration: "10s", animationPlayState: isPlaying ? "running" : "paused" }}>
            <Music className="w-10 h-10" />
          </div>

          <p className="font-serif italic text-base md:text-lg text-pink-100 max-w-lg leading-relaxed">
            "{songData.explanation}"
          </p>

          {songData.memory && (
            <p className="font-mono text-xs text-rose-300 bg-rose-500/20 px-4 py-2 rounded-full border border-rose-400/30">
              💡 {songData.memory}
            </p>
          )}

          {hasMusic && (
            <button
              onClick={togglePlay}
              className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-serif font-bold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              <span>{isPlaying ? "Pause Music" : "Play Our Song"}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
