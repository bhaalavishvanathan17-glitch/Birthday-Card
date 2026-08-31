import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function BirthdayHero() {
  return (
    <section 
      id="home" 
      className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-burgundy-dark via-rose-950 to-burgundy-dark text-cream px-4 sm:px-6 select-none"
    >
      {/* Background glowing particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-16 left-6 sm:left-12 text-rose-300 text-2xl sm:text-3xl animate-pulse">✨</div>
        <div className="absolute top-44 right-6 sm:right-16 text-yellow-300 text-xl sm:text-2xl animate-ping">✨</div>
        <div className="absolute bottom-28 left-8 sm:left-1/4 text-rose-400 text-lg sm:text-xl animate-bounce">❤️</div>
        <div className="absolute top-1/3 right-8 sm:right-1/4 text-amber-300 text-xl sm:text-2xl animate-pulse">🌟</div>
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center text-center relative z-10">
        {/* Animated Headline Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-rose-500/20 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-pink-200 border border-rose-400/30 mb-4 sm:mb-6 shadow-md"
        >
          <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-yellow-300" />
          <span>Today is a Special Day</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-pink-100 tracking-tight leading-tight mb-4 sm:mb-6 px-2"
        >
          {birthdayConfig.heroTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-sans italic text-base sm:text-xl md:text-2xl text-pink-200/80 max-w-xl mb-8 sm:mb-12 leading-relaxed px-2"
        >
          "{birthdayConfig.heroSubtitle}"
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
          className="mt-4 sm:mt-8 flex flex-col items-center space-y-2 text-pink-300/70 text-xs font-mono cursor-pointer touch-target"
          onClick={() => {
            const el = document.querySelector("#cake");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>Scroll to explore the universe</span>
          <ChevronDown className="w-5 h-5 text-rose-400" />
        </motion.div>
      </div>
    </section>
  );
}
