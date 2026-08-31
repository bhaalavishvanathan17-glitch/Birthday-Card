import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../config/birthdayConfig";

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const handleMakeWish = () => {
    setCandlesBlown(true);
    // Trigger confetti burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#BE185D", "#FBCFE8", "#F59E0B", "#E0E7FF", "#FFFFFF"]
    });
    setTimeout(() => {
      setShowWish(true);
    }, 800);
  };

  return (
    <section className="py-12 px-4 max-w-xl mx-auto text-center" id="cake">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-pink-100 mb-2">
          Make a Wish 🎂
        </h2>
        <p className="text-pink-200/80 text-sm mb-6">
          Close your eyes, make a silent wish in your heart, and blow out the candles.
        </p>

        {/* Cake Illustration Container */}
        <div className="relative w-48 h-48 mx-auto my-6 flex flex-col items-center justify-end">
          {/* Candles */}
          <div className="flex justify-center space-x-4 mb-1 z-10">
            {[1, 2, 3].map((id) => (
              <div key={id} className="flex flex-col items-center">
                {/* Flame */}
                {!candlesBlown ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror", delay: id * 0.15 }}
                    className="w-4 h-6 bg-gradient-to-t from-yellow-500 via-orange-400 to-yellow-200 rounded-full shadow-[0_0_12px_#f59e0b] mb-1"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -10 }}
                    className="w-2 h-4 text-xs text-gray-400"
                  >
                    💨
                  </motion.div>
                )}
                {/* Candle Body */}
                <div className="w-2.5 h-10 bg-gradient-to-b from-pink-300 to-rose-400 rounded-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="w-44 h-14 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-t-2xl border-t-4 border-pink-200 flex items-center justify-center text-xl shadow-md">
            🍓 🌸 🍓
          </div>
          <div className="w-52 h-16 bg-gradient-to-r from-rose-900 via-burgundy-dark to-rose-900 rounded-b-2xl border-t-2 border-pink-300/30 flex items-center justify-center text-2xl shadow-lg">
            ✨ ❤️ ✨
          </div>
        </div>

        {/* Action Button */}
        {!candlesBlown ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMakeWish}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium shadow-lg hover:shadow-rose-500/40 border border-amber-300/40 transition-all text-base"
          >
            Blow Out Candles & Make a Wish 🎂
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-emerald-300 font-medium text-sm mb-4">
              ✨ Your wish has been sent up into the stars ✨
            </p>
          </motion.div>
        )}

        {/* Wish Response Card */}
        <AnimatePresence>
          {showWish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-6 p-5 rounded-2xl bg-rose-950/60 border border-pink-400/30 text-pink-100 text-sm leading-relaxed shadow-inner"
            >
              <p className="font-serif italic">
                "{birthdayConfig.wishResponse || "I hope every wish you make today finds its way to you. Happy Birthday, my love."}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
