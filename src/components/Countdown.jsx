import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Gift } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isArrived: false,
  });

  useEffect(() => {
    // Parse target date specifically in IST (UTC+5:30)
    // Format: YYYY-MM-DD -> YYYY-MM-DDT00:00:00+05:30
    const targetString = `${birthdayConfig.birthdayDate}T00:00:00+05:30`;
    const targetTime = Date.parse(targetString);

    const calculateTime = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft((prev) => ({ ...prev, isArrived: true }));
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isArrived: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-cream to-[#fff5f5] flex flex-col items-center justify-center px-6 select-none relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-10 w-48 h-48 bg-rose-200/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        <AnimatePresence mode="wait">
          {timeLeft.isArrived ? (
            /* Celebration Screen */
            <motion.div
              key="celebration"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="glass p-8 rounded-3xl border border-rose-200 shadow-md flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 animate-bounce">
                <Gift className="w-8 h-8 fill-rose-500/25" />
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-rose-800">
                Today is the day! 🎉❤️
              </h2>
              <p className="font-inter text-rose-950/80 leading-relaxed">
                Happy Birthday to you, {birthdayConfig.birthdayPerson}! Let the celebrations begin and your day be filled with endless smiles!
              </p>
            </motion.div>
          ) : (
            /* Countdown Clock */
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                Counting down to your special day...
              </div>

              <div className="flex justify-center gap-3 md:gap-4 w-full">
                {timeBlocks.map((block) => (
                  <div
                    key={block.label}
                    className="w-16 h-20 md:w-20 md:h-24 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-rose-100 flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {/* Top half shine */}
                    <div className="absolute top-0 inset-x-0 h-1/2 bg-white/40 border-b border-rose-50/20" />

                    {/* Value */}
                    <motion.span
                      key={block.value}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="font-poppins text-2xl md:text-3xl font-bold text-rose-700 relative z-10"
                    >
                      {String(block.value).padStart(2, "0")}
                    </motion.span>

                    {/* Label */}
                    <span className="font-inter text-[9px] md:text-[10px] text-rose-800/60 uppercase tracking-widest mt-1 font-medium relative z-10">
                      {block.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
