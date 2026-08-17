import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../config/birthdayConfig";

export default function BirthdayHero() {
  const [wished, setWished] = useState(false);

  const handleMakeWish = () => {
    setWished(true);

    // Fire Confetti explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Fire center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section 
      id="home" 
      className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#fff5f5] to-cream px-6 select-none"
    >
      {/* Sparkles / Ambient elements */}
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <div className="absolute top-10 left-10 text-rose-300 text-3xl animate-pulse">✨</div>
        <div className="absolute top-40 right-16 text-rose-300 text-2xl animate-ping">✨</div>
        <div className="absolute bottom-20 left-1/4 text-rose-300 text-xl animate-bounce">❤️</div>
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center text-center relative z-10">
        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-playfair font-bold text-4xl md:text-6xl text-rose-800 tracking-tight leading-tight mb-4"
        >
          {birthdayConfig.heroTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-cormorant italic text-xl md:text-2xl lg:text-3xl text-rose-950/80 max-w-xl mb-12"
        >
          "{birthdayConfig.heroSubtitle}"
        </motion.p>

        {/* Animated Birthday Cake */}
        <div className="relative w-72 h-64 flex flex-col items-center justify-end mb-10">
          {/* Candles */}
          <div className="flex gap-4 mb-[-2px] z-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center relative w-3 h-14 bg-gradient-to-t from-pink-300 via-rose-300 to-amber-200 rounded-t-md">
                {/* Candle stripes */}
                <div className="absolute inset-0 bg-transparent bg-gradient-to-b from-transparent via-rose-400/20 to-transparent skew-y-12" />
                {/* Candle flame */}
                <AnimatePresence>
                  {!wished && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.1, 0.9, 1],
                        opacity: 1,
                        y: [0, -2, 0]
                      }}
                      exit={{ 
                        scale: 0, 
                        opacity: 0, 
                        y: -10,
                        transition: { duration: 0.5 }
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "mirror" 
                      }}
                      className="absolute -top-6 w-4 h-6 bg-gradient-to-t from-amber-400 via-orange-500 to-yellow-200 rounded-full blur-[1px] shadow-[0_0_8px_rgba(245,158,11,0.8)] cursor-pointer"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Cake Body */}
          <div className="w-56 h-24 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 rounded-t-xl relative border-b-4 border-rose-300 flex items-center justify-center shadow-md">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-4 flex justify-around">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-rose-400 rounded-full mt-[-6px] shadow-inner" />
              ))}
            </div>
            
            {/* Strawberries / Decorations */}
            <div className="absolute top-4 inset-x-0 h-4 flex justify-center gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white">🍓</div>
              ))}
            </div>

            {/* Base Stand */}
            <div className="absolute -bottom-3 w-64 h-3 bg-slate-200 rounded-full shadow" />
          </div>

          {/* Sparkles around cake */}
          <AnimatePresence>
            {!wished && (
              <motion.div 
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-1/4 left-1/5 text-amber-400 text-lg animate-ping">✨</div>
                <div className="absolute top-1/3 right-1/5 text-amber-400 text-lg animate-ping" style={{ animationDelay: '0.5s' }}>✨</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="h-32 flex flex-col items-center justify-start w-full px-4">
          <AnimatePresence mode="wait">
            {!wished ? (
              <motion.button
                key="wish-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                onClick={handleMakeWish}
                className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-poppins font-semibold rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300"
              >
                Make a Wish 🎂
              </motion.button>
            ) : (
              <motion.div
                key="wish-text"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                className="glass-premium p-6 rounded-2xl max-w-xl shadow-md border border-rose-200"
              >
                <p className="font-playfair italic text-lg md:text-xl text-rose-900 leading-relaxed">
                  "{birthdayConfig.wishResponse}"
                </p>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="mt-3 flex justify-center text-rose-500 text-xl"
                >
                  ❤️❤️❤️
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
