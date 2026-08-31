import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function PolaroidStack() {
  const photos = birthdayConfig.gallery || [
    { url: "/images/gallery1.svg", caption: "Our first date ❤️", date: "Aug 2024" },
    { url: "/images/gallery2.svg", caption: "Beach walk sunset 🌅", date: "Sep 2024" },
    { url: "/images/gallery3.svg", caption: "Coffee morning ☕", date: "Oct 2024" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextPhoto = () => {
    soundFx.playPop();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="polaroids">
      <div className="mb-8">
        <div className="inline-flex items-center space-x-1.5 bg-rose-500/20 px-3.5 py-1 rounded-full text-xs font-mono text-pink-200 border border-rose-400/30 mb-2">
          <span>Scrapbook Stack 📸</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-pink-100">
          Our Favorite Memories
        </h2>
        <p className="text-pink-200/70 text-xs mt-1">
          Tap the polaroid photo to flip through the stack!
        </p>
      </div>

      <div className="relative w-full h-[360px] md:h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: (currentIndex % 2 === 0 ? 3 : -3), opacity: 1 }}
            exit={{ scale: 0.8, x: 100, rotate: 15, opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleNextPhoto}
            className="w-[260px] md:w-[300px] bg-white p-4 pb-6 rounded-xl shadow-2xl border border-gray-200 text-gray-800 cursor-pointer transform hover:scale-105 transition-transform relative select-none"
          >
            {/* Washi tape sticker top decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/80 backdrop-blur-sm opacity-90 border border-pink-300/40 rotate-1 shadow-sm" />

            {/* Hand-drawn heart SVG decoration */}
            <div className="absolute top-2 right-2 text-rose-500">
              <svg className="w-5 h-5 fill-rose-500 opacity-80" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Photo frame — natural aspect ratio, no cropping */}
            <div className="w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-inner mb-4">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="w-full h-auto block"
              />
            </div>

            {/* Handwritten Caption */}
            <div className="flex flex-col items-center">
              <span className="font-handwriting text-xl font-bold text-rose-950">
                "{currentPhoto.caption}"
              </span>
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                {currentPhoto.date || "Memory"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handleNextPhoto}
        className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-pink-200 text-xs font-mono inline-flex items-center space-x-1.5 border border-white/20 hover:bg-white/20 cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Next Polaroid ({currentIndex + 1}/{photos.length})</span>
      </button>
    </section>
  );
}
