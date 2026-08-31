import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, X, ChevronRight, Sparkles } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function OurMovie() {
  const [isOpen, setIsOpen] = useState(false);
  const [chapterIdx, setChapterIdx] = useState(0);

  const movieData = birthdayConfig.ourMovie || { title: "OUR STORY", chapters: [] };
  const chapters = movieData.chapters || [];
  const currentChapter = chapters[chapterIdx];

  const handleOpenMovie = () => {
    soundFx.playUnwrap();
    setIsOpen(true);
    setChapterIdx(0);
  };

  const handleNextChapter = () => {
    soundFx.playClick();
    if (chapterIdx + 1 < chapters.length) {
      setChapterIdx(chapterIdx + 1);
    }
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto text-center" id="our-movie">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xl animate-pulse">
          <Film className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center space-x-2 bg-amber-500/20 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 border border-amber-400/30 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>MAIN FEATURE EXPERIENCE</span>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl font-bold text-pink-100 mb-3">
          OUR MOVIE: The Cinematic Story 🎬
        </h2>
        <p className="text-pink-200/80 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Watch our love story unfold like a romantic full-screen motion picture.
        </p>

        <button
          onClick={handleOpenMovie}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-base shadow-xl shine-btn flex items-center justify-center space-x-3 mx-auto cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>Watch Our Movie 🍿</span>
        </button>
      </div>

      {/* Full-screen Cinematic Movie Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black text-cream flex flex-col justify-between p-6 select-none overflow-hidden"
          >
            {/* Top Bar with Close button */}
            <div className="flex items-center justify-between z-20">
              <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-widest">
                <Film className="w-4 h-4" />
                <span>OUR STORY • CINEMATIC FEATURE</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-full bg-white/10 text-pink-200 hover:bg-white/20 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Black Cinematic Bar Top */}
            <div className="absolute top-0 inset-x-0 h-12 bg-black z-10 pointer-events-none" />

            {/* Main Movie Content Frame */}
            {currentChapter && (
              <motion.div
                key={chapterIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center flex-1 flex flex-col items-center justify-center z-20 py-8"
              >
                <div className="relative w-full max-w-xl h-64 md:h-80 rounded-3xl overflow-hidden border border-white/20 shadow-2xl mb-6">
                  <img
                    src={currentChapter.image}
                    alt={currentChapter.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <h3 className="font-serif text-2xl md:text-4xl font-bold text-pink-100 mb-2">
                  {currentChapter.title}
                </h3>
                <p className="font-serif italic text-base md:text-lg text-pink-200/90 max-w-lg leading-relaxed mb-6">
                  "{currentChapter.subtitle}"
                </p>

                {chapterIdx + 1 < chapters.length ? (
                  <button
                    onClick={handleNextChapter}
                    className="px-8 py-3.5 rounded-full bg-rose-500 text-white font-sans text-sm font-bold shadow-xl flex items-center justify-center space-x-2 cursor-pointer shine-btn"
                  >
                    <span>Next Chapter ({chapterIdx + 1}/{chapters.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="font-mono text-sm text-yellow-300 tracking-widest uppercase">
                      To be continued... Happy Birthday ❤️
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-white/10 text-pink-100 text-xs font-mono border border-white/20 cursor-pointer"
                    >
                      Close Movie 🍿
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Black Cinematic Bar Bottom */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-black z-10 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
