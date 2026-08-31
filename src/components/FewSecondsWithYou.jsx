import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function FewSecondsWithYou() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = birthdayConfig.gallery || [];

  const handleStart = () => {
    soundFx.playUnwrap();
    setIsPlaying(true);
    setCurrentSlide(0);

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < slides.length) {
        setCurrentSlide(idx);
      } else {
        clearInterval(interval);
        setTimeout(() => setIsPlaying(false), 2000);
      }
    }, 1500);
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="few-seconds">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative">
        <h2 className="font-serif text-2xl font-bold text-pink-100 mb-2">
          A Few Seconds With You ⏱️❤️
        </h2>
        <p className="text-pink-200/70 text-xs mb-6">
          Press to watch a rapid cinematic flash of our favorite memory moments!
        </p>

        <button
          onClick={handleStart}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-sans text-xs font-bold shadow-md cursor-pointer flex items-center justify-center space-x-2 mx-auto shine-btn"
        >
          <Play className="w-4 h-4" />
          <span>Play Memory Sequence</span>
        </button>
      </div>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-6 text-cream select-none"
          >
            {slides[currentSlide] && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center"
              >
                <img
                  src={slides[currentSlide].url}
                  alt="Memory"
                  className="w-full h-80 object-cover rounded-3xl border border-white/20 shadow-2xl mb-4"
                />
                <p className="font-serif text-xl font-bold text-pink-100">
                  "{slides[currentSlide].caption}"
                </p>
              </motion.div>
            )}

            <p className="fixed bottom-10 font-serif italic text-sm text-pink-200/80">
              "Even a few seconds with you are worth remembering forever."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
