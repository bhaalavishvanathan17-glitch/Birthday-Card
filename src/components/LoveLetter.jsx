import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const letterBody = birthdayConfig.letter.body;
  const paperRef = useRef(null);

  // Check for prefers-reduced-motion
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    
    const handler = (e) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isOpen) return;

    if (shouldReduceMotion) {
      setDisplayedText(letterBody);
      return;
    }

    setDisplayedText("");
    let currentIdx = 0;
    const delay = 25; // 25ms per character for readable flow
    
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + letterBody.charAt(currentIdx));
      currentIdx++;
      if (currentIdx >= letterBody.length) {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [isOpen, shouldReduceMotion]);

  // Scroll paper down as typewriter progresses to keep it in view
  useEffect(() => {
    if (paperRef.current && isOpen && !shouldReduceMotion) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [displayedText, isOpen]);

  return (
    <section 
      id="letter" 
      className="py-24 bg-gradient-to-b from-[#fff5f5] to-cream relative overflow-hidden select-none px-6"
    >
      <div className="absolute top-1/3 left-10 w-48 h-48 bg-pink-100/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 text-rose-300 text-2xl animate-pulse">✨</div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-rose-800 font-poppins text-xs font-semibold uppercase tracking-widest bg-rose-100 px-4 py-1.5 rounded-full mb-3"
          >
            A Sealed Message
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-5xl font-bold text-rose-900"
          >
            A Letter For You 💌
          </motion.h2>
        </div>

        {/* Envelope Layout / Letter container */}
        <div className="w-full flex justify-center items-center min-h-[380px]">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Envelope View */
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Envelope Graphic */}
                <div className="relative w-64 h-40 bg-rose-100 rounded-2xl shadow-lg border border-rose-200 flex items-center justify-center group overflow-hidden">
                  {/* Flap outline back */}
                  <div className="absolute inset-0 bg-transparent bg-gradient-to-b from-transparent via-rose-300/10 to-transparent" />
                  
                  {/* Heart Icon floating inside */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-rose-500 z-10"
                  >
                    <Mail className="w-12 h-12 fill-rose-500/10 stroke-[1.5px]" />
                  </motion.div>

                  {/* Corner decorations */}
                  <div className="absolute top-2 left-2 text-[10px] text-rose-300">🌸</div>
                  <div className="absolute bottom-2 right-2 text-[10px] text-rose-300">🌸</div>
                </div>

                <p className="font-poppins text-sm font-semibold text-rose-900 tracking-wide">
                  {birthdayConfig.letter.envelopeText}
                </p>

                <button
                  onClick={() => setIsOpen(true)}
                  className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-poppins font-semibold rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300"
                >
                  {birthdayConfig.letter.buttonText}
                </button>
              </motion.div>
            ) : (
              /* Opened Letter View */
              <motion.div
                key="letter-opened"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl flex flex-col items-center"
              >
                <div className="w-full bg-[#fdfcfa] border border-stone-200 shadow-2xl rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col">
                  {/* Decorative faint background watermark */}
                  <div className="absolute -top-10 -right-10 text-9xl text-stone-100 pointer-events-none select-none font-serif opacity-30">
                    ✉️
                  </div>

                  {/* Letter Header */}
                  <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-6">
                    <span className="font-playfair italic text-xs text-stone-500 uppercase tracking-widest">
                      Confidential & Personal
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-xs uppercase font-poppins font-bold text-rose-700 hover:text-rose-900 cursor-pointer focus:outline-none"
                    >
                      Fold Back 💌
                    </button>
                  </div>

                  {/* Scrollable letter text container */}
                  <div 
                    ref={paperRef}
                    className="max-h-[350px] overflow-y-auto pr-2 custom-stone-scrollbar"
                  >
                    <p className="font-cormorant font-medium text-lg md:text-xl text-stone-900 leading-relaxed whitespace-pre-wrap">
                      {displayedText}
                      {displayedText.length < letterBody.length && (
                        <span className="inline-block w-[3px] h-5 bg-rose-500 ml-1 animate-pulse" />
                      )}
                    </p>
                  </div>

                  {/* Faint scroll down arrow indicator */}
                  {isOpen && displayedText.length >= letterBody.length && (
                    <div className="flex justify-center mt-6 text-stone-400 animate-bounce">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
