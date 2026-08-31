import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function LivingPhoto() {
  const [zoomed, setZoomed] = useState(false);
  const photo = (birthdayConfig.gallery && birthdayConfig.gallery[0]) || {};

  const handleTap = () => {
    soundFx.playPop();
    setZoomed(!zoomed);
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="living-photo">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative">
        <h2 className="font-serif text-2xl font-bold text-pink-100 mb-2">
          Living Memory Photo ✨
        </h2>
        <p className="text-pink-200/70 text-xs mb-4">
          Tap the photo to reveal what I remember about this moment!
        </p>

        {/*
          IMAGE FIX:
          - Removed the fixed h-64 container that forced every photo into the
            same height, cutting off faces and cropping the composition.
          - Removed object-cover (was the root cause of the crop).
          - Removed scale-125 zoom-on-tap (was pushing content outside the
            fixed frame, hiding the face further when tapped).
          - Now uses w-full h-auto so the complete photo shows at its
            natural aspect ratio — no face is cut, no body is hidden.
          - The tap interaction is preserved:
            • Tapping now applies a gentle glow/border highlight instead
              of a destructive zoom that crops the photo.
          - overflow-hidden is retained on the outer rounded container
            only for the rounded-2xl border effect, but the img itself
            is no longer constrained to a fixed height.
        */}
        <div
          onClick={handleTap}
          className={`relative w-full rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 mb-4 bg-black/20 ${
            zoomed
              ? "border-rose-400/60 shadow-[0_0_24px_rgba(244,63,94,0.35)]"
              : "border-white/20"
          }`}
        >
          <img
            src={photo.url || "/images/gallery1.svg"}
            alt="Living Photo"
            className="w-full h-auto block transition-all duration-500"
          />

          {/* Tap hint overlay when not yet interacted */}
          {!zoomed && (
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <div className="bg-burgundy-dark/60 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/10">
                <p className="text-pink-200/80 text-[10px] font-mono uppercase tracking-wider">
                  ✨ Tap to reveal the memory
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Memory reveal text */}
        <AnimatePresence>
          {zoomed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-3 bg-burgundy-dark/80 rounded-xl border border-white/10 text-xs text-pink-100 font-serif italic"
            >
              "What I remember most about this moment: Your laugh was so genuine and warm,
              it melted every worry in my heart. ❤️"
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
