import React, { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Eye } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function GuessMemory() {
  const [isRevealed, setIsRevealed] = useState(false);
  const data = birthdayConfig.guessMemory || {};

  const handleReveal = () => {
    soundFx.playUnwrap();
    setIsRevealed(true);
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="guess-memory">
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold text-pink-100 mb-2 flex items-center justify-center space-x-2">
          <HelpCircle className="w-7 h-7 text-rose-400" />
          <span>Guess The Memory 🤔</span>
        </h2>
        <p className="text-pink-200/70 text-sm">
          Read the clues below and try to remember which memory this photo is from!
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative">
        {/* Clues */}
        <div className="mb-4 text-left bg-burgundy-dark/70 p-4 rounded-2xl border border-white/10 text-xs text-pink-200 space-y-1.5 font-mono">
          <p className="font-bold text-rose-300">CLUES:</p>
          {(data.clues || ["Somewhere special.", "It was raining heavily."]).map((c, i) => (
            <p key={i}>• {c}</p>
          ))}
        </div>

        {/*
          IMAGE FIX:
          - Removed fixed h-56 container that forced cropping.
          - Removed object-cover (was cutting the face).
          - Now uses w-full h-auto so the full photo renders at its
            natural aspect ratio — no cropping, no face cut-off.
          - The blur/reveal effect is preserved:
            • Blurred before reveal (scale stays at 1 so no zoom-crop).
            • Clear after reveal.
          - overflow-hidden only applies to the border-radius, not to crop the photo.
        */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-6 border border-white/20 bg-black/20">
          <img
            src={data.image || "/images/memory2.svg"}
            alt="Guess Memory"
            className={`w-full h-auto block transition-all duration-700 ${
              isRevealed ? "blur-0" : "blur-md"
            }`}
          />
          {/* Overlay prompt when blurred */}
          {!isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-burgundy-dark/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                <p className="text-pink-200/80 text-xs font-mono">🤔 Can you guess this memory?</p>
              </div>
            </div>
          )}
        </div>

        {!isRevealed ? (
          <button
            onClick={handleReveal}
            className="px-6 py-3 rounded-full bg-rose-500 text-white font-sans text-xs font-bold shadow-md cursor-pointer flex items-center justify-center space-x-2 mx-auto"
          >
            <Eye className="w-4 h-4" />
            <span>Reveal Photo &amp; Story</span>
          </button>
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif text-lg font-bold text-pink-100">
            "{data.title || "Our Rainy Coffee Date ❤️"}"
          </motion.p>
        )}
      </div>
    </section>
  );
}
