import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RefreshCw } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function LoveReasons() {
  const [index, setIndex] = useState(0);
  const reasons = birthdayConfig.reasons;

  const handleNextReason = () => {
    setIndex((prevIndex) => (prevIndex + 1) % reasons.length);
  };

  return (
    <section 
      id="reasons" 
      className="py-24 bg-gradient-to-b from-[#fff5f5] to-cream relative overflow-hidden select-none px-6"
    >
      {/* Decorative vector background */}
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 text-rose-300 text-3xl animate-pulse">✨</div>

      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full mb-3"
          >
            My Reasons
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-5xl font-bold text-rose-900"
          >
            A Few Reasons Why I Love You ❤️
          </motion.h2>
        </div>

        {/* Reason Card Container */}
        <div className="w-full min-h-[250px] flex items-center justify-center relative mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -50, rotate: 2 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="glass p-8 md:p-10 rounded-3xl border border-rose-200 shadow-md w-full max-w-lg text-center flex flex-col justify-center items-center gap-6 relative"
            >
              {/* Card Heart Badge */}
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 shadow-inner">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>

              {/* Number indicator */}
              <span className="font-poppins text-xs font-bold uppercase tracking-widest text-rose-700">
                Reason #{String(index + 1).padStart(2, "0")}
              </span>

              {/* Reason Content */}
              <p className="font-cormorant italic text-2xl md:text-3xl text-rose-950 font-medium leading-relaxed px-4">
                "{reasons[index]}"
              </p>

              {/* Floating Sparkles decoration */}
              <div className="absolute -top-3 -right-3 text-amber-400">✨</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleNextReason}
            className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-poppins font-semibold rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300"
          >
            Give me another reason ❤️
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-2">
            {reasons.map((_, i) => (
              <button
                key={i}
                aria-label={`Show reason ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index ? "w-6 bg-rose-500" : "w-2 bg-rose-200 hover:bg-rose-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
