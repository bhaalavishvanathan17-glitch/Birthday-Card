import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function OurStory() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  return (
    <section 
      id="our-story" 
      className="py-24 bg-gradient-to-b from-[#fff5f5] to-cream relative overflow-hidden select-none px-6"
    >
      {/* Decorative Hearts background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
        <Heart className="absolute top-1/4 left-10 w-24 h-24 fill-rose-600 text-rose-600 animate-pulse" />
        <Heart className="absolute bottom-1/4 right-10 w-32 h-32 fill-rose-600 text-rose-600 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full mb-3"
          >
            Our Journey
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-playfair text-3xl md:text-5xl font-bold text-rose-900"
          >
            Our Little Story ❤️
          </motion.h2>
        </div>

        {/* Timeline Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-40 bottom-10 w-[2px] bg-gradient-to-b from-rose-200 via-rose-400 to-pink-300 hidden md:block" />

        {/* Timeline Items */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-16 md:gap-24 relative"
        >
          {birthdayConfig.memories.map((memory, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center justify-between w-full relative ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot (Desktop only) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-rose-400 z-10 hidden md:flex items-center justify-center shadow-md">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                </div>

                {/* Card side */}
                <div className="w-full md:w-[45%]">
                  <div className="glass p-6 rounded-3xl border border-rose-100 hover:border-rose-300 transition-all duration-300 shadow-sm flex flex-col gap-4">
                    {/* Image */}
                    <div className="w-full h-48 md:h-60 rounded-2xl overflow-hidden relative group">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 to-transparent z-10" />
                      <img 
                        src={memory.image} 
                        alt={memory.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-rose-900 font-poppins text-[10px] font-bold tracking-widest px-3 py-1 rounded-full z-15 shadow-sm">
                        {memory.date}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-playfair font-bold text-xl md:text-2xl text-rose-950">
                        {memory.title}
                      </h3>
                      <p className="font-inter text-sm text-rose-900/80 leading-relaxed">
                        {memory.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Empty block to balance layout on desktop */}
                <div className="w-full md:w-[45%] hidden md:block" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
