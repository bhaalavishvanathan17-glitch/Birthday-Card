import React, { useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function SecretNumber() {
  const [val, setVal] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const target = birthdayConfig.secretNumber || "1408";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (val.trim() === target) {
      soundFx.playUnwrap();
      setUnlocked(true);
    } else {
      soundFx.playPop();
    }
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="secret-number">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative">
        <h2 className="font-serif text-2xl font-bold text-pink-100 mb-2">
          Secret Number Code 🔢
        </h2>
        <p className="text-pink-200/70 text-xs mb-4">
          Enter the secret date code to unlock a hidden note!
        </p>

        {!unlocked ? (
          <form onSubmit={handleSubmit} className="flex justify-center space-x-2">
            <input
              type="text"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="e.g. 1408"
              className="px-4 py-2 rounded-full bg-burgundy-dark border border-white/20 text-cream text-center font-mono text-sm w-36"
            />
            <button type="submit" className="px-5 py-2 rounded-full bg-rose-500 text-white font-sans text-xs font-bold cursor-pointer">
              Unlock
            </button>
          </form>
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif italic text-base text-pink-100">
            "You remembered our special number code! You mean the world to me. ❤️"
          </motion.p>
        )}
      </div>
    </section>
  );
}
