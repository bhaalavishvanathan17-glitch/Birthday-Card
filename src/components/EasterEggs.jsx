import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function EasterEggs() {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    let keyBuffer = "";
    const handleKeyDown = (e) => {
      const char = e.key.toLowerCase();
      keyBuffer = (keyBuffer + char).slice(-4);
      if (keyBuffer === "love") {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        setToastMessage("❤️ You typed 'LOVE'! Heart explosion activated! ❤️");
        setTimeout(() => setToastMessage(null), 4000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-rose-600 text-white font-medium text-xs md:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center space-x-2 pointer-events-none"
        >
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
