import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function MemoryGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const photos = birthdayConfig.gallery || [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <section id="memories" className="py-16 sm:py-24 bg-burgundy-dark text-cream relative overflow-hidden select-none px-4 sm:px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-rose-300 font-mono text-[11px] sm:text-xs uppercase tracking-widest bg-rose-500/20 border border-rose-400/30 px-4 py-1.5 rounded-full mb-3 shadow-md"
          >
            <Heart className="w-3 h-3 fill-rose-400 text-rose-400 animate-pulse" />
            <span>Our Memories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 bg-clip-text text-transparent"
          >
            OUR MEMORIES ❤️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-pink-200/70 text-xs sm:text-sm max-w-md mx-auto mt-2 font-serif italic"
          >
            "A beautiful chronological collection of our sweet moments together."
          </motion.p>
        </div>

        {/* Masonry Gallery — each photo shows at its NATURAL aspect ratio, never cropped */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.035, 0.25) }}
              onClick={() => setSelectedIndex(index)}
              className="break-inside-avoid mb-5 group cursor-pointer rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 p-2.5 hover:border-rose-400/40 hover:shadow-[0_0_28px_rgba(244,63,94,0.12)] hover:bg-white/8 transition-all duration-300"
            >
              {/* Image — width:100%, height:auto  → preserves every photo's natural ratio */}
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {/* Hover overlay (full cover of the natural image area) */}
                <div className="absolute inset-0 bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-rose-500/90 flex items-center justify-center shadow-lg border border-white/20">
                    <Heart className="w-4 h-4 fill-white text-white" />
                  </div>
                </div>
              </div>

              {/* Caption + date */}
              <div className="pt-2.5 px-0.5 flex justify-between items-center gap-2">
                <span className="font-serif text-xs sm:text-sm font-semibold text-pink-100 leading-tight flex-1 min-w-0 truncate">
                  {photo.caption}
                </span>
                <span className="font-mono text-[9px] text-pink-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 whitespace-nowrap">
                  {photo.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox — shows the COMPLETE photo with object-contain, no cropping */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* Backdrop to close */}
            <div className="absolute inset-0" onClick={() => setSelectedIndex(null)} />

            {/* Prev */}
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-pink-200 border border-white/15 cursor-pointer focus:outline-none transition z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-pink-200 border border-white/15 cursor-pointer focus:outline-none transition z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-pink-200 border border-white/15 cursor-pointer focus:outline-none transition z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox content */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative z-10 flex flex-col items-center gap-3 max-w-3xl w-full max-h-[90vh]"
            >
              {/* Image — object-contain so the FULL photo is always shown */}
              <div className="w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/30 p-2">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Caption */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full px-1">
                <div className="text-center sm:text-left">
                  <p className="font-serif text-sm sm:text-base md:text-lg font-bold text-pink-100">
                    {selectedPhoto.caption}
                  </p>
                  <p className="font-mono text-xs text-pink-300/70 mt-0.5">
                    Captured on {selectedPhoto.date}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-300 text-xs font-mono bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{selectedIndex + 1} / {photos.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
