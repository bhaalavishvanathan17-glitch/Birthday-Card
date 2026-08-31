import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function ThenNowSlider() {
  const data = birthdayConfig.thenNow || {
    thenImage: "/images/memory1.svg",
    nowImage: "/images/memory4.svg",
    thenLabel: "THEN",
    nowLabel: "NOW",
    caption: "Look how far we have come. ❤️"
  };

  return (
    <section className="py-14 sm:py-16 px-4 max-w-4xl mx-auto select-none" id="then-now">
      <div className="text-center mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 text-rose-300 font-mono text-[11px] sm:text-xs uppercase tracking-widest bg-rose-500/20 border border-rose-400/30 px-4 py-1.5 rounded-full mb-3"
        >
          <Heart className="w-3 h-3 fill-rose-400 text-rose-400 animate-pulse" />
          <span>Then &amp; Now</span>
        </motion.div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-pink-100 mb-2">
          Then vs Now 📸
        </h2>
        <p className="text-pink-200/70 text-xs sm:text-sm px-2 max-w-md mx-auto">
          Look how far we have come together — every step of this journey has been my favourite.
        </p>
      </div>

      {/*
        Layout:
          • Mobile  : single column (THEN above, NOW below)
          • Desktop : side by side

        Both images use w-full h-auto — they render at their own natural
        aspect ratio. No cropping, no fixed height, no object-fit:cover.
      */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-4 sm:p-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

          {/* THEN */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-center">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-pink-200 bg-rose-500/20 border border-rose-400/30 px-4 py-1 rounded-full">
                {data.thenLabel || "THEN"}
              </span>
            </div>
            {/* Full image, natural ratio */}
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/20 shadow-lg">
              <img
                src={data.thenImage}
                alt="Then memory"
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
          </motion.div>

          {/* NOW */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-center">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-amber-300 bg-amber-500/15 border border-amber-400/30 px-4 py-1 rounded-full">
                {data.nowLabel || "NOW"}
              </span>
            </div>
            {/* Full image, natural ratio */}
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/20 shadow-lg">
              <img
                src={data.nowImage}
                alt="Now memory"
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm font-serif italic text-pink-100 px-2 border-t border-white/10 pt-5">
          "{data.caption}"
        </p>
      </div>
    </section>
  );
}
