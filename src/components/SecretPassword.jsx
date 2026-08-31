import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, KeyRound, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function SecretPassword() {
  const [inputVal, setInputVal] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const secretPass = (birthdayConfig.secretPassword || "love").toLowerCase();
  const secretContent = birthdayConfig.secretRoomContent || "✨ You unlocked the secret vault! ❤️";

  const handleUnlock = (e) => {
    e.preventDefault();
    if (inputVal.trim().toLowerCase() === secretPass) {
      soundFx.playUnwrap();
      setIsUnlocked(true);
      setError(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      soundFx.playPop();
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="secret-password">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg">
          {isUnlocked ? <Unlock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-pink-100 mb-2">
          Locked Secret Vault 🔐
        </h2>
        <p className="text-pink-200/70 text-xs md:text-sm mb-6">
          Enter the secret word to open the portal... (Hint: It starts with 'l')
        </p>

        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-4 max-w-sm mx-auto">
            <div className="relative">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter secret word..."
                className="w-full px-5 py-3.5 rounded-full bg-burgundy-dark/80 border border-white/20 text-cream placeholder-pink-300/40 text-center font-medium focus:outline-none focus:border-rose-400 text-sm"
              />
              <KeyRound className="w-4 h-4 text-pink-300/50 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold shadow-lg shine-btn cursor-pointer"
            >
              Open Secret Portal ❤️
            </motion.button>

            {error && (
              <p className="text-xs text-rose-300 mt-2">
                That is not it... try again ❤️
              </p>
            )}
          </form>
        ) : (
          /* Secret Room Portal Transition */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-3xl bg-black/90 border border-amber-400/50 text-pink-100 text-sm leading-relaxed shadow-2xl relative overflow-hidden"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl font-bold text-amber-300 mb-3">
              Secret Room Portal Unlocked 🌟
            </h3>

            <p className="whitespace-pre-line font-serif italic text-pink-100 leading-relaxed">
              {secretContent}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
