import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundFx } from "../utils/SoundManager";

export default function DontBreakMyHeart() {
  const [caught, setCaught] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleHover = () => {
    if (caught) return;
    const newX = (Math.random() - 0.5) * 200;
    const newY = (Math.random() - 0.5) * 150;
    setPos({ x: newX, y: newY });
  };

  const handleCatch = () => {
    soundFx.playUnwrap();
    setCaught(true);
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="dont-break">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative min-h-[260px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl font-bold text-pink-100 mb-2">
          Catch My Heart ❤️
        </h2>
        <p className="text-pink-200/70 text-xs mb-6">
          Try to catch the floating heart!
        </p>

        {!caught ? (
          <motion.button
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onMouseEnter={handleHover}
            onClick={handleCatch}
            className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center text-3xl shadow-xl cursor-pointer"
          >
            ❤️
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="font-serif text-lg font-bold text-pink-100 mb-2">
              Well... you already had my heart all along! ❤️
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
