import React from "react";
import { motion } from "framer-motion";

export default function StarField({ count = 35 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            top: `${(i * 13) % 100}%`,
            left: `${(i * 23) % 100}%`,
            opacity: 0.3 + (i % 5) * 0.15,
            animationDuration: `${2 + (i % 4)}s`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}

      {/* Low frequency shooting star */}
      <motion.div
        initial={{ x: "-10vw", y: "10vh", opacity: 0 }}
        animate={{
          x: ["-10vw", "110vw"],
          y: ["10vh", "70vh"],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "easeOut"
        }}
        className="absolute w-28 h-[1px] bg-gradient-to-r from-transparent via-pink-200 to-white rotate-[-25deg]"
      />
    </div>
  );
}
