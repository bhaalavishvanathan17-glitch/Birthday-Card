import React from "react";
import { motion } from "framer-motion";
import { Music, Play, Pause, Disc } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function OurSong({ isPlaying, setIsPlaying, hasMusic, audioRef }) {
  const songData = birthdayConfig.ourSongSection;

  const togglePlay = () => {
    if (!audioRef.current || !hasMusic) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked", err));
      setIsPlaying(true);
    }
  };

  return (
    <section 
      id="our-song" 
      className="py-24 bg-gradient-to-b from-cream to-[#fff5f5] relative overflow-hidden select-none px-6"
    >
      {/* Decorative ambient glowing sphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-100/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full mb-3"
          >
            <Music className="w-3 h-3" /> Dedicated Melody
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-5xl font-bold text-rose-900"
          >
            {songData.title}
          </motion.h2>
          <p className="font-cormorant italic text-lg md:text-xl text-rose-800/80 mt-2">
            {songData.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 w-full mt-4">
          {/* Vinyl Visual Representation */}
          <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
            <div className="relative group">
              {/* Outer Glow */}
              <motion.div
                className="absolute inset-0 bg-rose-400 rounded-full blur-md opacity-25"
                animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Rotating Disc */}
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full bg-neutral-900 border-8 border-neutral-800 shadow-xl flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={togglePlay}
              >
                {/* Vinyl Grooves */}
                <div className="absolute inset-4 rounded-full border border-neutral-700/30" />
                <div className="absolute inset-8 rounded-full border border-neutral-700/30" />
                <div className="absolute inset-16 rounded-full border border-neutral-700/30" />
                <div className="absolute inset-24 rounded-full border border-neutral-700/30" />
                
                {/* Center Label */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center relative shadow-md">
                  <div className="w-6 h-6 rounded-full bg-white shadow-inner flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  </div>
                  <Disc className="absolute top-2 w-4 h-4 text-white/50" />
                </div>
              </motion.div>
            </div>

            {/* Play/Pause Button overlay */}
            {hasMusic ? (
              <button
                onClick={togglePlay}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-poppins text-xs font-semibold shadow-md flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-white" /> Pause Melodies
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white translate-x-[0.5px]" /> Listen Together
                  </>
                )}
              </button>
            ) : (
              <span className="text-xs text-rose-700/60 font-inter font-medium tracking-wide">
                (Add your song to public/music/our-song.mp3 to enable audio player ✨)
              </span>
            )}
          </div>

          {/* Lyrics / Story Panel */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-6">
            <div className="glass p-6 rounded-3xl border border-rose-100/50 shadow-inner w-full">
              <p className="font-inter text-sm text-rose-950/80 leading-relaxed mb-6 font-medium">
                {songData.description}
              </p>

              {/* Lyrics List */}
              <div className="flex flex-col gap-4">
                <span className="font-poppins text-[10px] font-bold text-rose-600 uppercase tracking-widest text-center">Lyrics Highlight</span>
                {songData.lyrics.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    className="font-cormorant italic text-lg md:text-xl font-semibold text-rose-900 leading-relaxed text-center"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
