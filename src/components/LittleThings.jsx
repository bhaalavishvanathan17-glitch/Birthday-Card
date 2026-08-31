import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function LittleThings() {
  const items = birthdayConfig.littleThings || [];

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto text-center" id="little-things">
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold text-pink-100 mb-2 flex items-center justify-center space-x-2">
          <Sparkles className="w-7 h-7 text-yellow-300" />
          <span>The Little Things About You ✨</span>
        </h2>
        <p className="text-pink-200/70 text-sm">
          Tiny personal details that make my heart melt...
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-center font-serif text-pink-100 text-sm"
          >
            ✨ "{item}"
          </motion.div>
        ))}
      </div>
    </section>
  );
}
