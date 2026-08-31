import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../config/birthdayConfig";

export default function BirthTime() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [celebrationState, setCelebrationState] = useState("countdown"); // "countdown", "celebrating", "completed"
  const celebrationFiredRef = useRef(false);

  // Staggered fireworks celebration scheduler (3-6 seconds)
  const triggerFireworks = () => {
    if (celebrationFiredRef.current) return;
    celebrationFiredRef.current = true;

    setCelebrationState("celebrating");
    const colors = ["#f43f5e", "#ec4899", "#fbbf24", "#e11d48", "#38bdf8", "#a855f7"];

    // 1. Initial Side Bursts (0ms)
    confetti({
      particleCount: 100,
      spread: 75,
      angle: 45,
      origin: { x: 0, y: 0.85 },
      colors: colors,
    });
    confetti({
      particleCount: 100,
      spread: 75,
      angle: 135,
      origin: { x: 1, y: 0.85 },
      colors: colors,
    });

    // 2. Scheduled bursts in upper areas
    const burstIntervals = [300, 700, 1100, 1600, 2100, 2600, 3100];
    burstIntervals.forEach((delay, idx) => {
      setTimeout(() => {
        const xPos = idx % 2 === 0 ? Math.random() * 0.3 + 0.15 : Math.random() * 0.3 + 0.55;
        const yPos = Math.random() * 0.3 + 0.2; // upper half of screen
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { x: xPos, y: yPos },
          colors: colors,
          startVelocity: 25,
          gravity: 0.85,
          scalar: 1.1,
        });
      }, delay);
    });

    // 3. Central Heart/Sparkle Explosion (1500ms)
    setTimeout(() => {
      confetti({
        particleCount: 160,
        spread: 130,
        origin: { x: 0.5, y: 0.4 },
        colors: ["#ec4899", "#f43f5e", "#fbbf24", "#ffffff"],
        startVelocity: 35,
        gravity: 0.9,
      });
    }, 1500);

    // 4. Gold Sparkle Rain (3000ms)
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 180,
        origin: { x: 0.5, y: 0.1 },
        colors: ["#fbbf24", "#f59e0b", "#d97706"],
        startVelocity: 15,
        gravity: 0.55,
        scalar: 0.8,
      });
    }, 3000);

    // 5. Complete transition to final message (4000ms)
    setTimeout(() => {
      setCelebrationState("completed");
    }, 4000);
  };

  useEffect(() => {
    const calculateTime = () => {
      const dateStr = birthdayConfig.birthdayDate || "2026-09-05";
      const timeStr = birthdayConfig.birthTime || "23:00:00";
      
      const targetDate = new Date(`${dateStr}T${timeStr}`);
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        
        // If it's already in the past when the page loads, bypass active celebration state
        if (!celebrationFiredRef.current) {
          const isInitialLoad = (new Date().getTime() - now.getTime()) < 100;
          if (isInitialLoad) {
            celebrationFiredRef.current = true;
            setCelebrationState("completed");
          } else {
            triggerFireworks();
          }
        } else if (celebrationState === "countdown") {
          setCelebrationState("completed");
        }
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        setCelebrationState("countdown");
      }
    };

    calculateTime();
    const interval = setInterval(() => {
      const dateStr = birthdayConfig.birthdayDate || "2026-09-05";
      const timeStr = birthdayConfig.birthTime || "23:00:00";
      const targetDate = new Date(`${dateStr}T${timeStr}`);
      const diff = targetDate.getTime() - new Date().getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        triggerFireworks();
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [celebrationState]);

  return (
    <section id="birth-time" className="py-14 sm:py-20 px-3 sm:px-4 relative flex flex-col items-center justify-center text-cream overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-25 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-rose-500/20 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl relative text-center"
      >
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-4">
          <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" style={{ animationDuration: "12s" }} />
          <span>The Moment You Came Into This World</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 bg-clip-text text-transparent mb-2 sm:mb-3">
          Birth Time Countdown
        </h2>
        <p className="text-pink-200/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-6 sm:mb-10 font-serif italic px-2">
          "Counting down to the exact moment that changed everything..."
        </p>

        <AnimatePresence mode="wait">
          {celebrationState === "celebrating" && (
            <motion.div
              key="celebration"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-rose-400/50 shadow-[0_0_40px_rgba(244,63,94,0.3)] flex flex-col items-center justify-center space-y-4"
            >
              <div className="relative">
                <Heart className="w-14 sm:w-18 h-14 sm:h-18 fill-rose-500 text-rose-500 animate-ping absolute opacity-70" />
                <div className="w-14 sm:w-18 h-14 sm:h-18 rounded-full bg-rose-500/30 border border-rose-400/40 flex items-center justify-center text-rose-300 relative z-10">
                  <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-300 animate-pulse" />
                </div>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-300 animate-pulse uppercase tracking-wider drop-shadow-lg">
                IT'S YOUR MOMENT ✨
              </h3>
              <p className="text-pink-100/90 text-sm sm:text-base font-medium">
                Celebrating the wonderful day you were born! 🎇🎆
              </p>
            </motion.div>
          )}

          {celebrationState === "completed" && (
            <motion.div
              key="completed"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-900/60 via-pink-900/50 to-rose-900/60 border border-rose-400/40 shadow-2xl flex flex-col items-center space-y-3 sm:space-y-4"
            >
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300 border border-rose-400/40 animate-pulse">
                <Heart className="w-6 sm:w-8 h-6 sm:h-8 fill-rose-500 text-rose-500" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl md:text-4xl font-bold text-amber-300">
                THE MOMENT IS HERE ❤️
              </h3>
              <p className="text-pink-100 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
                {birthdayConfig.wishResponse || "The world became a brighter, sweeter place the exact moment you were born."}
              </p>
            </motion.div>
          )}

          {celebrationState === "countdown" && (
            <motion.div
              key="countdown"
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 max-w-3xl mx-auto"
            >
              <div className="bg-burgundy-dark/60 border border-white/10 backdrop-blur-xl p-3.5 sm:p-5 md:p-6 rounded-2xl flex flex-col items-center shadow-lg">
                <span className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-pink-100 tracking-tight">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300/70 mt-1 sm:mt-2 font-mono">Days</span>
              </div>

              <div className="bg-burgundy-dark/60 border border-white/10 backdrop-blur-xl p-3.5 sm:p-5 md:p-6 rounded-2xl flex flex-col items-center shadow-lg">
                <span className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-pink-100 tracking-tight">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300/70 mt-1 sm:mt-2 font-mono">Hours</span>
              </div>

              <div className="bg-burgundy-dark/60 border border-white/10 backdrop-blur-xl p-3.5 sm:p-5 md:p-6 rounded-2xl flex flex-col items-center shadow-lg">
                <span className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-pink-100 tracking-tight">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300/70 mt-1 sm:mt-2 font-mono">Minutes</span>
              </div>

              <div className="bg-burgundy-dark/60 border border-white/10 backdrop-blur-xl p-3.5 sm:p-5 md:p-6 rounded-2xl flex flex-col items-center shadow-lg">
                <span className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-amber-300 tracking-tight">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-300/70 mt-1 sm:mt-2 font-mono">Seconds</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-center space-x-2 text-[11px] sm:text-xs text-pink-300/70">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Target Time: {birthdayConfig.birthdayDate} at {birthdayConfig.birthTime}</span>
        </div>
      </motion.div>
    </section>
  );
}
