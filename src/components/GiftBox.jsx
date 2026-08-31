import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const giftData = birthdayConfig.gift || {};

  const handleOpenGift = () => {
    soundFx.playUnwrap();
    setIsOpen(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="gift" className="py-24 bg-burgundy-dark text-cream relative overflow-hidden select-none px-6">
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-rose-300 font-mono text-xs uppercase tracking-widest bg-rose-500/20 border border-rose-400/30 px-4 py-1.5 rounded-full mb-3 shadow-md"
          >
            <span>Final Gift</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold text-pink-100"
          >
            {giftData.heading || "There is still one more surprise..."}
          </motion.h2>
        </div>

        {/* 3D Dimensional Gift Box Presentation */}
        <motion.button
          whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenGift}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full flex flex-col items-center gap-4 cursor-pointer hover:border-amber-400/40 shine-btn transform-gpu"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 flex items-center justify-center text-5xl shadow-2xl border border-amber-300/40 animate-bounce">
            🎁
          </div>
          <p className="font-serif font-bold text-lg text-pink-100">
            Click to Unwrap Your Gift 🎁
          </p>
          <span className="px-6 py-2.5 bg-rose-500 text-white rounded-full text-xs font-bold shadow-md">
            {giftData.buttonText || "Open the Gift 🎁"}
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center px-4"
          >
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ scale: 0.7, y: 40, rotateX: 20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.7, y: 40 }}
              className="bg-burgundy-dark border border-amber-400/50 max-w-md w-full p-6 md:p-8 rounded-3xl relative z-10 text-center text-cream shadow-2xl select-none"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-pink-200 hover:bg-white/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-6xl mb-3">🎁</div>
              <h3 className="font-serif text-2xl font-bold text-pink-100 mb-4 border-b border-white/10 pb-3">
                {giftData.finalWishes || "Happy Birthday!"}
              </h3>
              <p className="font-serif italic text-base md:text-lg text-pink-200 leading-relaxed mb-6">
                "{giftData.message}"
              </p>
              <div className="flex justify-center text-rose-400 gap-1 text-xl">
                ❤️❤️❤️
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
