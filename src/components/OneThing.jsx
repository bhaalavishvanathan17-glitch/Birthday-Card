import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function OneThing() {
  const [revealed, setRevealed] = useState(false);
  const data = birthdayConfig.oneThing || {};

  const handleReveal = () => {
    soundFx.playUnwrap();
    setRevealed(true);
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="one-thing">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
          <Gift className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-2xl font-bold text-pink-100 mb-3">
          {data.question || "If I could give you one thing for this birthday..."}
        </h2>

        {!revealed ? (
          <button
            onClick={handleReveal}
            className="px-6 py-3 rounded-full bg-rose-500 text-white font-sans text-xs font-bold shadow-md cursor-pointer shine-btn"
          >
            Reveal My Birthday Wish ❤️
          </button>
        ) : (
          <motion.p initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="font-serif italic text-lg text-pink-100 leading-relaxed">
            "{data.answer}"
          </motion.p>
        )}
      </div>
    </section>
  );
}
