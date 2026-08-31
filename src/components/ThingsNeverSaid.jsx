import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function ThingsNeverSaid() {
  const list = birthdayConfig.thingsNeverSaid || [];

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto text-center" id="never-said">
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold text-pink-100 mb-2 flex items-center justify-center space-x-2">
          <Heart className="w-7 h-7 text-rose-400 fill-rose-400" />
          <span>Things I Do Not Say Enough 💌</span>
        </h2>
        <p className="text-pink-200/70 text-sm">
          Quiet thoughts from my heart to yours...
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {list.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-left font-serif italic text-pink-100 text-sm leading-relaxed"
          >
            "{item}"
          </motion.div>
        ))}
      </div>
    </section>
  );
}
