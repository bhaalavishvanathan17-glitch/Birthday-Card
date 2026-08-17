import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function FinalMessage() {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleHeartClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    
    if (nextCount >= birthdayConfig.easterEgg.clickHeartCount) {
      setShowSecret(true);
      setClickCount(0);
    }
  };

  return (
    <section className="py-32 bg-gradient-to-b from-cream via-[#16020c] to-[#0a0005] text-white relative overflow-hidden select-none px-6 flex flex-col items-center justify-center min-h-[90vh]">
      
      {/* Ambient night stars background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating stardust/hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-500 fill-rose-500 animate-bounce"
            style={{
              width: `${12 + Math.random() * 16}px`,
              height: `${12 + Math.random() * 16}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-playfair font-bold text-3xl md:text-5xl text-rose-300 leading-tight"
        >
          Happy Birthday, {birthdayConfig.birthdayPerson} ❤️
        </motion.h2>

        {/* Cinematic Subtitles */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-cormorant italic text-xl md:text-2xl text-rose-100/90"
        >
          "Thank you for being you."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-inter text-sm md:text-base text-rose-100/70 max-w-lg leading-relaxed font-light"
        >
          Here's to another year of your beautiful smile, your crazy moments, your dreams, and hopefully... many more memories together.
        </motion.p>

        {/* Dedication Block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col items-center gap-3 mt-4"
        >
          <span className="font-playfair text-xs uppercase tracking-widest text-rose-300/60 font-semibold">
            With all my love
          </span>
          
          {/* Glowing signature name */}
          <span className="font-cormorant font-bold text-3xl text-rose-200 tracking-wide select-text">
            {birthdayConfig.senderName}
          </span>

          {/* Interactive Easter Egg Heart Trigger */}
          <button
            onClick={handleHeartClick}
            aria-label="Easter Egg Secret Heart"
            className="w-10 h-10 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/20 cursor-pointer active:scale-90 transition mt-2 focus:outline-none"
          >
            <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
          </button>
        </motion.div>
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
            {/* Close click background */}
            <div className="absolute inset-0" onClick={() => setShowSecret(false)} />

            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="glass p-6 md:p-8 rounded-3xl border border-rose-400/30 max-w-md w-full relative z-10 text-center flex flex-col items-center gap-6"
            >
              <button
                onClick={() => setShowSecret(false)}
                aria-label="Close Secret message"
                className="absolute top-4 right-4 text-rose-300 hover:text-rose-400 cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 shadow-inner">
                <Sparkles className="w-5 h-5 fill-rose-500/25" />
              </div>

              <h4 className="font-playfair text-xl font-bold text-rose-800">
                You Found the Easter Egg! 🌟
              </h4>

              <p className="font-cormorant italic text-lg md:text-xl text-rose-950 leading-relaxed font-semibold">
                "{birthdayConfig.easterEgg.secretMessage}"
              </p>

              <button
                onClick={() => setShowSecret(false)}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-poppins text-xs font-semibold shadow-md transition cursor-pointer focus:outline-none"
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
