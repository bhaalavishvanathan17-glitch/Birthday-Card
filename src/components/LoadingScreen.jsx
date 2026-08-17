import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#fff5f5] flex flex-col items-center justify-center z-50 overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.2, 1],
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl md:text-8xl mb-6 select-none"
        aria-hidden="true"
      >
        ❤️
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-poppins text-lg md:text-xl font-medium text-rose-600 tracking-wider text-center px-4"
      >
        Preparing something special...
      </motion.h1>
      
      {/* Decorative background ambient dots */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-rose-300 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-pink-300 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
