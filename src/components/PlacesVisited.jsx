import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function PlacesVisited() {
  const [activePlace, setActivePlace] = useState(null);
  const places = birthdayConfig.placesVisited || [];

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="places">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-pink-100 mb-2 flex items-center justify-center space-x-2">
          <MapPin className="w-8 h-8 text-rose-400" />
          <span>Places We Have Been 📍</span>
        </h2>
        <p className="text-pink-200/70 text-sm max-w-md mx-auto">
          Tap any location pin on the map to unlock the memory we made there.
        </p>
      </div>

      {/* Map Board Interface */}
      <div className="relative w-full h-[380px] md:h-[440px] bg-gradient-to-tr from-burgundy-dark via-rose-950 to-burgundy-dark rounded-3xl border border-white/20 overflow-hidden shadow-2xl p-4 flex items-center justify-center">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Location Pins */}
        {places.map((place) => (
          <motion.button
            key={place.id}
            style={{ top: `${place.coords.y}%`, left: `${place.coords.x}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePlace(place)}
          >
            <div className="flex flex-col items-center group">
              <div className="p-2.5 rounded-full bg-rose-500 text-white shadow-[0_0_15px_#f43f5e] border-2 border-white animate-bounce">
                <MapPin className="w-5 h-5 fill-white text-rose-500" />
              </div>
              <span className="mt-1 text-xs font-bold text-pink-100 bg-burgundy-dark/90 px-2.5 py-1 rounded-full border border-pink-400/30 whitespace-nowrap shadow-md">
                {place.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Location Detail Modal */}
      <AnimatePresence>
        {activePlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setActivePlace(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-burgundy-dark border border-rose-400/30 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl text-cream"
            >
              <button
                onClick={() => setActivePlace(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-pink-200 hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-pink-100 mb-1">
                {activePlace.name}
              </h3>
              <p className="text-xs text-rose-300 font-mono mb-4">{activePlace.date}</p>

              {activePlace.image && (
                <div className="w-full rounded-xl overflow-hidden mb-4 border border-white/15 shadow-md bg-black/20">
                  <img
                    src={activePlace.image}
                    alt={activePlace.name}
                    className="w-full h-auto block"
                  />
                </div>
              )}

              <p className="text-sm text-pink-200/90 leading-relaxed font-sans">
                "{activePlace.memory}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
