import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../config/birthdayConfig";

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const giftData = birthdayConfig.gift;

  const handleOpenGift = () => {
    setIsOpen(true);

    // Explode Confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 45,
        spread: 45,
        origin: { x: 0, y: 0.85 }
      });
      confetti({
        particleCount: 7,
        angle: 135,
        spread: 45,
        origin: { x: 1, y: 0.85 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <section 
      id="surprise" 
      className="py-24 bg-gradient-to-b from-cream to-[#fff5f5] relative overflow-hidden select-none px-6"
    >
      {/* Sparkles background */}
      <div className="absolute top-10 right-10 text-rose-300 text-3xl animate-ping">✨</div>
      <div className="absolute bottom-10 left-10 text-rose-300 text-2xl animate-pulse">✨</div>

      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full mb-3"
          >
            The Final Box
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-5xl font-bold text-rose-900"
          >
            {giftData.heading}
          </motion.h2>
        </div>

        {/* Gift Box Container */}
        <div className="w-full min-h-[360px] flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Gift Closed State */
              <motion.div
                key="gift-closed"
                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -25 }}
                transition={{ type: "spring", stiffness: 90, damping: 15 }}
                className="flex flex-col items-center gap-10"
              >
                {/* 3D Gift Box Drawing */}
                <div className="relative w-44 h-44 flex flex-col items-center justify-end group cursor-pointer" onClick={handleOpenGift}>
                  {/* Glowing Box base ring */}
                  <div className="absolute -inset-3 bg-rose-300 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Ribbon bow on top */}
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1 w-16 h-8 flex justify-center items-center z-15"
                  >
                    {/* Left Loop */}
                    <div className="w-8 h-8 rounded-full border-4 border-rose-500 bg-rose-400 rotate-45 transform origin-bottom-right" />
                    {/* Right Loop */}
                    <div className="w-8 h-8 rounded-full border-4 border-rose-500 bg-rose-400 -rotate-45 transform origin-bottom-left" />
                    {/* Center Knot */}
                    <div className="absolute w-5 h-5 bg-rose-600 rounded-full border-2 border-rose-500" />
                  </motion.div>

                  {/* Gift Box Lid */}
                  <div className="w-48 h-10 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-lg z-10 border border-rose-300 shadow-md relative">
                    {/* Lid Ribbon Horizontal */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-rose-500" />
                  </div>

                  {/* Gift Box Base */}
                  <div className="w-44 h-32 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-b-xl border-x border-b border-rose-400 shadow-lg relative flex items-center justify-center">
                    {/* Base Ribbon Horizontal */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-rose-600" />
                    <Gift className="w-8 h-8 text-white/50 relative z-10" />
                  </div>
                </div>

                <button
                  onClick={handleOpenGift}
                  className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-poppins font-semibold rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300"
                >
                  {giftData.buttonText}
                </button>
              </motion.div>
            ) : (
              /* Gift Opened Reveal State */
              <motion.div
                key="gift-opened"
                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 85, damping: 15 }}
                className="w-full max-w-xl"
              >
                <div className="glass-premium p-8 rounded-3xl border border-rose-200/60 shadow-2xl flex flex-col items-center gap-6 relative overflow-hidden text-center">
                  {/* Glowing background aura */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-rose-200 via-pink-200 to-amber-100 opacity-20 blur-xl pointer-events-none" />

                  <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 shadow-inner">
                    <Heart className="w-6 h-6 fill-rose-500/30" />
                  </div>

                  <p className="font-playfair italic text-lg md:text-2xl text-rose-950 leading-relaxed font-semibold">
                    "{giftData.message}"
                  </p>

                  <div className="border-t border-rose-200/50 w-24 pt-4 mt-2">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-rose-800">
                      Happy Birthday, {birthdayConfig.birthdayPerson}!
                    </h3>
                  </div>

                  {/* Sparkles decorations */}
                  <div className="absolute top-4 left-4 text-amber-400">✨</div>
                  <div className="absolute bottom-4 right-4 text-amber-400">✨</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
