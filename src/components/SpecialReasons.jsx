import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function SpecialReasons() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 15 }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#fff5f5] to-cream relative overflow-hidden select-none px-6">
      {/* Sparkles backdrop */}
      <div className="absolute top-1/4 left-10 text-rose-300 text-2xl animate-pulse">✨</div>
      <div className="absolute bottom-1/4 right-10 text-rose-300 text-3xl animate-ping">✨</div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" /> You Are Unique
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-5xl font-bold text-rose-900"
          >
            Why You Are So Special ❤️
          </motion.h2>
        </div>

        {/* Floating Cards Cascading Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {birthdayConfig.specialReasons.map((reason, index) => {
            // Apply slight random rotation to cards to look organic
            const rot = [ "-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0" ][index % 5];
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`glass p-6 rounded-3xl border border-rose-100 hover:border-rose-300 transition-all duration-300 shadow-sm flex flex-col justify-between min-h-[160px] relative overflow-hidden ${rot}`}
              >
                {/* Decorative absolute heart */}
                <Heart className="absolute -bottom-4 -right-4 w-16 h-16 fill-rose-500/5 text-rose-500/5 stroke-[1px]" />
                
                {/* Top Badge */}
                <div className="w-8 h-8 rounded-full bg-rose-100/50 flex items-center justify-center text-rose-600 mb-4 shadow-inner">
                  <Heart className="w-4 h-4 fill-rose-500/40 text-rose-500" />
                </div>

                {/* Reason Text */}
                <p className="font-poppins text-sm md:text-base font-semibold leading-relaxed text-rose-950 flex-1">
                  {reason}
                </p>

                {/* Sparkling detail */}
                <div className="absolute top-3 right-3 text-rose-300/30 text-[10px]">✨</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
