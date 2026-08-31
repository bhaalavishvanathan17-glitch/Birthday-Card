import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function SurpriseOpener({ onOpen }) {
  return (
    <div className="min-h-screen bg-burgundy-dark flex flex-col items-center justify-center p-4 relative overflow-hidden text-cream">
      {/* Background Floating Hearts */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-400/20 text-2xl pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: Math.random() * 0.8 + 0.5,
          }}
          animate={{
            y: [0, -100, 0],
            rotate: [0, 45, -45, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center shadow-2xl relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-4xl shadow-xl shadow-rose-900/40 border border-white/30"
        >
          🎁
        </motion.div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-pink-100 mb-3 leading-tight">
          A Special Birthday Gift
        </h1>
        <p className="text-pink-200/80 text-sm md:text-base mb-8 max-w-sm mx-auto leading-relaxed">
          I built this entire digital universe for you, {birthdayConfig.birthdayPerson || "my love"}. Take a breath and step inside...
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(244, 63, 94, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-lg shadow-xl flex items-center justify-center space-x-3 group border border-pink-300/40 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform" />
          <span>Open Your Birthday Surprise ✨</span>
          <Heart className="w-5 h-5 text-rose-200 fill-rose-300 group-hover:scale-110 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
}
