import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function LandingScreen({ onOpen }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence the text reveal steps
    const timer1 = setTimeout(() => setStep(1), 2200);
    const timer2 = setTimeout(() => setStep(2), 4400);
    const timer3 = setTimeout(() => setStep(3), 6600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#fff5f5] flex flex-col items-center justify-center z-40 px-6 text-center select-none overflow-hidden">
      {/* Dynamic Romantic Floating Background Hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-400 text-2xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="max-w-2xl w-full flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p
              key="text0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="font-playfair italic text-2xl md:text-3xl lg:text-4xl text-rose-800 font-medium"
            >
              "I made something special for you..."
            </motion.p>
          )}

          {step === 1 && (
            <motion.p
              key="text1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-2xl md:text-3xl lg:text-4xl text-rose-900 font-medium"
            >
              "Because today isn't just another day."
            </motion.p>
          )}

          {step === 2 && (
            <motion.div
              key="text2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <h1 className="font-playfair font-bold text-3xl md:text-5xl text-rose-700">
                Today is YOUR day. ❤️
              </h1>
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative group">
                <motion.div
                  className="absolute -inset-1.5 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <button
                  onClick={onOpen}
                  aria-label="Open Birthday Surprise"
                  className="relative px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-poppins font-semibold text-lg shadow-lg flex items-center gap-3 cursor-pointer transform hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-rose-300"
                >
                  <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
                  Open Your Birthday Surprise
                  <Heart className="w-5 h-5 fill-white animate-pulse" />
                </button>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1, duration: 1 }}
                className="font-inter text-xs text-rose-600 font-medium tracking-wide mt-2"
              >
                (Make sure your volume is on ✨)
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
