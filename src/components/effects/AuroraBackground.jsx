import React from "react";
import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 100, -50],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-rose-900/50 via-pink-600/30 to-transparent blur-[120px]"
      />
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [100, -50, 100],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-purple-900/40 via-burgundy-dark to-amber-500/20 blur-[140px]"
      />
    </div>
  );
}
