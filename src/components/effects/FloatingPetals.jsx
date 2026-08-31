import React from "react";
import { motion } from "framer-motion";

export default function FloatingPetals({ count = 8 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${(i * 15) % 100}vw`,
            y: "-10vh",
            rotate: 0,
            opacity: 0.8
          }}
          animate={{
            y: "110vh",
            x: [`${(i * 15) % 100}vw`, `${((i * 15) % 100) + 15}vw`, `${(i * 15) % 100}vw`],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 10 + (i % 5) * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          className="absolute text-rose-400/40 text-xl"
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}
