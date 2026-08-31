import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function MemoryConstellation() {
  const [activeStar, setActiveStar] = useState(null);
  const stars = birthdayConfig.constellation || [];

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto" id="constellation">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-pink-100 mb-2 flex items-center justify-center space-x-2">
          <Sparkles className="w-8 h-8 text-yellow-300" />
          <span>Memory Constellation</span>
        </h2>
        <p className="text-pink-200/70 text-sm max-w-md mx-auto">
          Every glowing star in this sky represents a unforgettable memory we share. Click any star to zoom into the moment.
        </p>
      </div>

      {/* Constellation Canvas Container */}
      <div className="relative w-full h-[400px] md:h-[480px] bg-gradient-to-b from-black via-burgundy-dark to-black rounded-3xl border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Background Ambient Star Dust */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40 animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}

        {/* Interactive Constellation Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            style={{ top: `${star.y}%`, left: `${star.x}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveStar(star)}
          >
            <div className="relative flex flex-col items-center group">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 flex items-center justify-center shadow-[0_0_15px_#f59e0b] group-hover:shadow-[0_0_25px_#fde047]">
                <Sparkles className="w-3.5 h-3.5 text-burgundy-dark" />
              </div>
              <span className="mt-1 text-[11px] font-medium text-pink-200 bg-burgundy-dark/80 px-2 py-0.5 rounded-full border border-pink-400/20 whitespace-nowrap opacity-80 group-hover:opacity-100">
                {star.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Star Memory Modal */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setActiveStar(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-burgundy-dark border border-yellow-400/40 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl text-cream"
            >
              <button
                onClick={() => setActiveStar(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-pink-200 hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-pink-100 mb-1">
                {activeStar.name}
              </h3>
              <p className="text-xs text-yellow-300 font-mono mb-4">{activeStar.date}</p>

              {activeStar.image && (
                <div className="w-full rounded-xl overflow-hidden mb-4 border border-white/15 shadow-md bg-black/20">
                  <img
                    src={activeStar.image}
                    alt={activeStar.name}
                    className="w-full h-auto block"
                  />
                </div>
              )}

              <p className="text-sm text-pink-200/90 leading-relaxed font-sans">
                "{activeStar.text}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
