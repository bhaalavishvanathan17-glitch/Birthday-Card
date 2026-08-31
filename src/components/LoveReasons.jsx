import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function LoveReasons() {
  const [index, setIndex] = useState(0);
  const reasons = birthdayConfig.reasons || [];

  const handleNextReason = () => {
    setIndex((prev) => (prev + 1) % reasons.length);
  };

  return (
    <section id="reasons" className="py-24 bg-burgundy-dark text-cream relative overflow-hidden select-none px-6">
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-rose-300 font-mono text-xs uppercase tracking-widest bg-rose-500/20 border border-rose-400/30 px-4 py-1.5 rounded-full mb-3 shadow-md"
          >
            <span>Reasons I Love You</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold text-pink-100"
          >
            Why You Mean The World To Me ❤️
          </motion.h2>
        </div>

        <div className="w-full min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col items-center justify-center gap-4 relative"
            >
              <span className="font-mono text-xs font-bold text-rose-300 uppercase tracking-widest bg-rose-500/20 px-3 py-1 rounded-full border border-rose-400/30">
                Reason #{index + 1}
              </span>

              <p className="font-serif italic text-xl md:text-2xl text-pink-100 leading-relaxed max-w-lg">
                "{reasons[index]}"
              </p>

              <div className="flex gap-1 text-rose-400">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextReason}
          className="mt-8 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-serif font-bold text-base rounded-full shadow-xl flex items-center gap-2 cursor-pointer border border-pink-300/30"
        >
          <span>Give me another reason ❤️</span>
        </motion.button>
      </div>
    </section>
  );
}
