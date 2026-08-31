import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundFx } from "../utils/SoundManager";

export default function VirtualHug() {
  const [hugged, setHugged] = useState(false);

  const handleHug = () => {
    soundFx.playUnwrap();
    setHugged(true);
    setTimeout(() => setHugged(false), 3000);
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="virtual-hug">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative">
        <h2 className="font-serif text-2xl font-bold text-pink-100 mb-2">
          Need a Hug Right Now? 🤗
        </h2>
        <p className="text-pink-200/70 text-xs mb-6">
          Press the button below for your unlimited virtual hug!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleHug}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-4xl shadow-2xl border border-white/30 cursor-pointer"
        >
          {hugged ? "🤗" : "🫂"}
        </motion.button>

        {hugged && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <p className="font-serif text-lg font-bold text-pink-100">
              Here is your warm unlimited hug! 🤗❤️
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
