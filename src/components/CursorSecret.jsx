import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { soundFx } from "../utils/SoundManager";

export default function CursorSecret() {
  const [showSecret, setShowSecret] = useState(false);

  const handleClick = () => {
    soundFx.playUnwrap();
    setShowSecret(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="fixed top-3 left-3 z-40 p-3 cursor-pointer opacity-50 hover:opacity-100 transition-opacity touch-target"
        title="Secret Corner Heart 👀"
      >
        <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
      </div>

      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowSecret(false)}
          >
            <div className="bg-burgundy-dark border border-rose-400/40 p-6 rounded-3xl max-w-sm text-center text-cream shadow-2xl">
              <p className="font-serif text-lg font-bold text-pink-100 mb-2">
                You found something I did not tell you about! 👀❤️
              </p>
              <p className="font-serif italic text-sm text-pink-200">
                "You pay attention to the smallest details. That is why I love you so much!"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
