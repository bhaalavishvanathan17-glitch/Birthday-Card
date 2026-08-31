import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ChapterIntroCard({ number, title, subtitle, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-burgundy-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center text-cream select-none"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl relative"
      >
        <div className="inline-flex items-center space-x-2 bg-rose-500/20 px-4 py-1.5 rounded-full text-xs font-mono text-rose-300 border border-rose-400/30 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>CHAPTER {number}</span>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-bold text-pink-100 mb-3">
          {title}
        </h2>

        <p className="font-sans italic text-pink-200/80 text-sm md:text-base leading-relaxed mb-6">
          "{subtitle}"
        </p>

        <button
          onClick={onComplete}
          className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-xs font-mono inline-flex items-center space-x-1.5 border border-white/20 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </motion.div>
  );
}
