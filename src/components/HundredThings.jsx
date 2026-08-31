import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function HundredThings() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = birthdayConfig.hundredThings || [
    "Your infectious laugh", "The way your eyes crinkle when you smile", "Your gentle voice",
    "How kind you are to animals", "Your passion for your dreams", "The way you hold my hand"
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section className="py-14 sm:py-16 px-4 max-w-xl mx-auto text-center select-none" id="hundred-things">
      <div className="mb-6 sm:mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pink-100 mb-2">
          100 Things I Love About You ❤️
        </h2>
        <p className="text-pink-200/70 text-xs sm:text-sm px-2">
          A small list of the endless things that make you so special.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Progress Counter */}
        <div className="inline-flex items-center space-x-1.5 bg-rose-500/20 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-pink-200 border border-rose-400/30 mb-5 sm:mb-6">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Thing #{currentIndex + 1} / {items.length}</span>
        </div>

        {/* Current Thing Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="min-h-[110px] sm:min-h-[120px] flex items-center justify-center p-4 sm:p-6 rounded-2xl bg-burgundy-dark/60 border border-pink-400/20 mb-6 sm:mb-8 shadow-inner"
        >
          <p className="font-serif text-base sm:text-lg md:text-xl font-medium text-pink-100 leading-relaxed px-2">
            "{items[currentIndex]}"
          </p>
        </motion.div>

        {/* Reveal Next Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm sm:text-base shadow-lg flex items-center justify-center space-x-2 border border-pink-300/30 cursor-pointer touch-target"
        >
          <span>Reveal Another ❤️</span>
          <RefreshCw className="w-4 h-4 text-pink-200" />
        </motion.button>
      </div>
    </section>
  );
}
