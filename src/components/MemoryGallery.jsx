import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section 
      id="memories" 
      className="py-24 bg-gradient-to-b from-cream to-[#fff5f5] relative overflow-hidden select-none px-6"
    >
      {/* Decorative stars */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-pink-200/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 text-rose-300 text-2xl animate-pulse">✨</div>

      <div className="max-w-6xl mx-auto relative">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full mb-3"
          >
            Gallery
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-playfair text-3xl md:text-5xl font-bold text-rose-900"
          >
            Little Moments, Big Memories 📸
          </motion.h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {birthdayConfig.gallery.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass p-3 border border-rose-100/50 hover:border-rose-300 hover:shadow-md transition-all duration-300 relative"
            >
              {/* Photo Wrapper */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden relative">
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Hover Glass Overlay */}
                <div className="absolute inset-0 bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-rose-600 shadow-md"
                  >
                    <Heart className="w-6 h-6 fill-rose-600 animate-pulse" />
                  </motion.div>
                </div>
              </div>

              {/* Caption Summary (Card bottom) */}
              <div className="pt-3 px-1 flex justify-between items-center">
                <span className="font-poppins text-xs font-semibold text-rose-950 truncate max-w-[70%]">
                  {photo.caption}
                </span>
                <span className="font-inter text-[10px] text-rose-700/60 uppercase tracking-widest font-semibold">
                  {photo.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0f0208]/90 backdrop-blur-md flex items-center justify-center px-4"
          >
            {/* Close trigger clicking background */}
            <div className="absolute inset-0" onClick={() => setSelectedPhoto(null)} />

            {/* Lightbox Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-dark max-w-3xl w-full p-4 rounded-3xl relative z-10 overflow-hidden flex flex-col gap-4 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Lightbox"
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/20 cursor-pointer focus:outline-none transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-res Image */}
              <div className="w-full flex-1 overflow-hidden rounded-2xl bg-black/20 flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-h-[60vh] w-auto object-contain rounded-xl"
                />
              </div>

              {/* Footer caption */}
              <div className="px-2 py-1 text-white flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <p className="font-playfair text-lg md:text-xl font-bold text-rose-200">
                    {selectedPhoto.caption}
                  </p>
                  <p className="font-inter text-xs text-white/60 mt-1">
                    Captured on {selectedPhoto.date}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-amber-200 text-sm font-poppins">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  A Moment to Cherish
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
