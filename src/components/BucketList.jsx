import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Check } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function BucketList() {
  const [list, setList] = useState(birthdayConfig.bucketList);
  const [particles, setParticles] = useState([]);

  const handleToggle = (id, event) => {
    // Find index and check if it's about to be checked
    const targetItem = list.find((item) => item.id === id);
    const becameChecked = targetItem && !targetItem.checked;

    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );

    // If checked, spawn cute heart particles at click position
    if (becameChecked && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = (event.clientX || (event.touches && event.touches[0].clientX)) - rect.left;
      const clickY = (event.clientY || (event.touches && event.touches[0].clientY)) - rect.top;

      const newParticles = [...Array(6)].map((_, i) => ({
        id: Date.now() + i,
        x: clickX,
        y: clickY,
        angle: Math.random() * 360,
        distance: 30 + Math.random() * 50,
        scale: 0.5 + Math.random() * 0.8,
      }));

      setParticles((prev) => [...prev, ...newParticles]);

      // Clear particles after 1.2s
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 1200);
    }
  };

  return (
    <section 
      id="bucket-list" 
      className="py-16 sm:py-24 bg-gradient-to-b from-[#fff5f5] to-cream relative overflow-hidden select-none px-4 sm:px-6"
    >
      {/* Decorative stars */}
      <div className="absolute top-10 left-6 text-rose-300 text-2xl sm:text-3xl animate-bounce">✨</div>
      <div className="absolute bottom-20 right-6 text-rose-300 text-lg sm:text-xl animate-ping">✨</div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-[11px] sm:text-xs font-semibold uppercase tracking-widest bg-rose-100 px-3.5 py-1.5 rounded-full mb-3"
          >
            Our Future
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-rose-900"
          >
            Things I Want To Do With You 🗒️❤️
          </motion.h2>
          <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-rose-800/80 mt-2 px-2">
            A small bucket list of dreams waiting for us. Check them off as we make them happen!
          </p>
        </div>

        {/* Bucket List Grid */}
        <div className="glass p-4 sm:p-8 md:p-10 rounded-3xl border border-rose-200/50 shadow-inner flex flex-col gap-3.5 relative overflow-hidden">
          {list.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleToggle(item.id, e)}
              className="flex items-center text-left gap-3.5 p-3.5 sm:p-4 rounded-2xl hover:bg-white/60 focus:bg-white/80 transition-all duration-300 w-full group relative focus:outline-none focus:ring-2 focus:ring-rose-200 cursor-pointer touch-target"
            >
              {/* Checkbox (Heart circle) */}
              <div 
                className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
                  item.checked 
                    ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-200 scale-105" 
                    : "border-rose-300 bg-white/50 text-transparent group-hover:border-rose-400 group-hover:scale-102"
                }`}
              >
                {item.checked ? (
                  <Check className="w-4 h-4 stroke-[3px]" />
                ) : (
                  <Heart className="w-4 h-4 text-rose-300 group-hover:text-rose-400 fill-transparent" />
                )}
              </div>

              {/* Text */}
              <span 
                className={`font-poppins text-xs sm:text-sm md:text-base font-medium tracking-wide transition-all duration-300 flex-1 ${
                  item.checked 
                    ? "text-rose-900/40 line-through" 
                    : "text-rose-950 group-hover:text-rose-700"
                }`}
              >
                {item.text}
              </span>

              {/* Sparkle icon when checked */}
              {item.checked && (
                <Heart className="w-4 h-4 text-rose-300 fill-rose-300 animate-pulse flex-shrink-0" />
              )}
            </button>
          ))}

          {/* Floating click particles */}
          <AnimatePresence>
            {particles.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              const moveX = Math.cos(rad) * p.distance;
              const moveY = Math.sin(rad) * p.distance - 40;

              return (
                <motion.div
                  key={p.id}
                  initial={{ x: p.x, y: p.y, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: p.x + moveX, 
                    y: p.y + moveY, 
                    scale: p.scale, 
                    opacity: 0 
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute pointer-events-none text-rose-500 text-base sm:text-lg z-20"
                >
                  ❤️
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
