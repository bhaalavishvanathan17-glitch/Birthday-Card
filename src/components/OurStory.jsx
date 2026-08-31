import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import PolaroidStack from "./PolaroidStack";

export default function OurStory() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <section id="our-story" className="py-16 sm:py-24 bg-burgundy-dark text-cream relative overflow-hidden select-none px-4 sm:px-6">
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-rose-300 font-mono text-[11px] sm:text-xs uppercase tracking-widest bg-rose-500/20 border border-rose-400/30 px-3.5 py-1.5 rounded-full mb-3 shadow-md"
          >
            <span>Our Journey</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-100"
          >
            Our Little Story ❤️
          </motion.h2>
        </div>

        {/* Polaroid Scrapbook Stack */}
        <PolaroidStack />

        {/* Timeline Title Divider */}
        <div className="my-12 sm:my-16 text-center">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-rose-400/40 to-transparent max-w-xl mx-auto mb-6 sm:mb-8" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-pink-100">
            Timeline of Our Moments 📅
          </h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-10 sm:gap-16 md:gap-24 relative"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-rose-500 via-pink-400 to-rose-900 z-0" />

          {(birthdayConfig.memories || []).map((memory, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-start justify-between w-full relative z-10 pl-10 md:pl-0 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Heart node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-500 border-4 border-burgundy-dark flex items-center justify-center shadow-lg z-10">
                  <Heart className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-white text-white" />
                </div>

                <div className="w-full md:w-[45%]">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col gap-3">
                    {/* Date badge */}
                    <span className="self-start bg-burgundy-dark/90 text-pink-100 font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full border border-pink-400/30">
                      {memory.date}
                    </span>

                    {/*
                      PHOTO: w-full h-auto → preserves the original aspect ratio.
                      No fixed height, no object-fit:cover, no cropping whatsoever.
                    */}
                    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                      <img
                        src={memory.image}
                        alt={memory.title}
                        loading="lazy"
                        className="w-full h-auto block"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-pink-100">
                        {memory.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-pink-200/80 leading-relaxed">
                        {memory.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spacer for opposite side on desktop */}
                <div className="w-full md:w-[45%] hidden md:block" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
