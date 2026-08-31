import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const paperRef = useRef(null);

  const letterData = birthdayConfig.letter || {};
  const letterBody = letterData.body || "";

  const handleOpen = () => {
    soundFx.playUnwrap();
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    setDisplayedText("");
    let currentIdx = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + letterBody.charAt(currentIdx));
      currentIdx++;
      if (currentIdx >= letterBody.length) {
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isOpen, letterBody]);

  return (
    <section id="letter" className="py-16 sm:py-24 bg-burgundy-dark text-cream relative overflow-hidden select-none px-4 sm:px-6">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-rose-300 font-mono text-[11px] sm:text-xs uppercase tracking-widest bg-rose-500/20 border border-rose-400/30 px-3.5 py-1.5 rounded-full mb-3 shadow-md"
          >
            <span>Personal Letter</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-pink-100"
          >
            From My Heart To Yours 💌
          </motion.h2>
        </div>

        {/* Envelope trigger button */}
        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpen}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full flex flex-col items-center gap-4 cursor-pointer hover:border-rose-400/40 shine-btn touch-target"
        >
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-3xl sm:text-4xl shadow-xl border border-white/30">
            💌
          </div>
          <p className="font-serif font-bold text-base sm:text-lg text-pink-100 px-2">
            {letterData.envelopeText || "You have a letter waiting for you..."}
          </p>
          <span className="px-6 py-2.5 bg-rose-500 text-white rounded-full text-xs font-bold shadow-md">
            {letterData.buttonText || "Open Letter 💌"}
          </span>
        </motion.div>
      </div>

      {/* Realistic Stationery Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          >
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="stationery-paper max-w-2xl w-full p-5 sm:p-8 md:p-10 rounded-3xl relative z-10 text-rose-950 shadow-2xl max-h-[88vh] flex flex-col border border-rose-300 select-none"
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Letter"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-rose-200/80 text-rose-900 hover:bg-rose-300 flex items-center justify-center cursor-pointer touch-target z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-rose-800 text-sm font-handwriting font-bold mb-3 border-b border-rose-200 pb-2.5">
                <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                <span>My Dearest Birthday Letter</span>
              </div>

              <div ref={paperRef} className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <p className="font-serif text-sm sm:text-base md:text-lg text-rose-950 leading-relaxed whitespace-pre-line italic">
                  {displayedText}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
