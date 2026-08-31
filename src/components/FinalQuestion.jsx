import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function FinalQuestion({ onAnswer }) {
  const [answered, setAnswered] = useState(false);
  const questionText = birthdayConfig.finalQuestionText || "Will you make many more memories with me?";

  const handleAnswer = () => {
    soundFx.playUnwrap();
    setAnswered(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#BE185D", "#FBCFE8", "#F59E0B", "#FFFFFF"]
    });
    if (onAnswer) onAnswer();
  };

  return (
    <section className="py-24 px-4 max-w-2xl mx-auto text-center" id="final-question">
      <div className="bg-black/60 backdrop-blur-2xl border border-pink-400/40 rounded-3xl p-8 md:p-12 shadow-2xl relative select-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-400/30"
        >
          <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
        </motion.div>

        <p className="text-xs text-pink-300/70 font-mono uppercase tracking-widest mb-3">
          Before you leave...
        </p>

        <h2 className="font-serif text-2xl md:text-4xl font-bold text-pink-100 mb-8 leading-tight">
          "{questionText}"
        </h2>

        {!answered ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnswer}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-base shadow-xl border border-pink-300/40 shine-btn cursor-pointer"
            >
              YES ❤️
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnswer}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-rose-500 text-white font-bold text-base shadow-xl border border-purple-300/40 shine-btn cursor-pointer"
            >
              ALWAYS 🥹
            </motion.button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="text-emerald-300 font-serif text-lg font-bold">
              ❤️ Forever & Always. Happy Birthday! ❤️
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
