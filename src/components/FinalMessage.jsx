import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RefreshCw, X } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function FinalMessage({ onReplay }) {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleHeartClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    
    if (nextCount >= (birthdayConfig.easterEgg?.clickHeartCount || 5)) {
      setShowSecret(true);
      setClickCount(0);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-burgundy-dark via-black to-burgundy-dark text-white relative overflow-hidden select-none px-6 flex flex-col items-center justify-center min-h-[85vh]" id="final-message">
      
      {/* Ambient night stars background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${1 + Math.random() * 2.5}px`,
              height: `${1 + Math.random() * 2.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif font-bold text-3xl md:text-5xl text-pink-100 leading-tight"
        >
          Happy Birthday, {birthdayConfig.birthdayPerson} ❤️
        </motion.h2>

        {/* Cinematic Subtitles */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif italic text-xl md:text-2xl text-pink-200/90"
        >
          "Thank you for being you."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-sans text-sm md:text-base text-pink-200/70 max-w-lg leading-relaxed font-light"
        >
          {birthdayConfig.finalMessage || "I hope this year brings you everything you have been wishing for..."}
        </motion.p>

        {/* Dedication Block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col items-center gap-2 mt-4"
        >
          <span className="font-sans text-xs uppercase tracking-widest text-pink-300/60 font-semibold">
            With all my love,
          </span>
          
          <span className="font-serif font-bold text-3xl text-pink-100 tracking-wide">
            {birthdayConfig.senderNameDisplay || birthdayConfig.senderName}
          </span>

          {/* Interactive Easter Egg Heart Trigger */}
          <button
            onClick={handleHeartClick}
            aria-label="Easter Egg Secret Heart"
            className="w-10 h-10 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/20 cursor-pointer active:scale-90 transition mt-3 focus:outline-none"
          >
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
          </button>
        </motion.div>

        {/* Replay Experience Button (Feature 37) */}
        {onReplay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <button
              onClick={onReplay}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm shadow-xl hover:shadow-pink-500/30 flex items-center space-x-2 border border-pink-300/30 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Experience It Again ❤️</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Secret Easter Egg Modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center px-6"
          >
            <div className="absolute inset-0" onClick={() => setShowSecret(false)} />

            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-burgundy-dark border border-rose-400/40 p-6 md:p-8 rounded-3xl max-w-md w-full relative z-10 text-center flex flex-col items-center gap-4 text-cream shadow-2xl"
            >
              <button
                onClick={() => setShowSecret(false)}
                aria-label="Close Secret message"
                className="absolute top-4 right-4 text-pink-300 hover:text-white cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center text-yellow-300">
                <Sparkles className="w-6 h-6" />
              </div>

              <h4 className="font-serif text-xl font-bold text-pink-100">
                You Found the Easter Egg! 🌟
              </h4>

              <p className="font-serif italic text-base md:text-lg text-pink-200 leading-relaxed">
                "{birthdayConfig.easterEgg?.secretMessage}"
              </p>

              <button
                onClick={() => setShowSecret(false)}
                className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-sans text-xs font-semibold shadow-md cursor-pointer"
              >
                Close Secret ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
