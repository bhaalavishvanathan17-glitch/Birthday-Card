import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { soundFx } from "../utils/SoundManager";

export default function LoveMeter() {
  const [val, setVal] = useState(50);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = () => {
    soundFx.playPop();
    setIsCalculated(true);
    setVal(100);
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="love-meter">
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold text-pink-100 mb-2 flex items-center justify-center space-x-2">
          <Activity className="w-7 h-7 text-rose-400" />
          <span>Love Meter 📈</span>
        </h2>
        <p className="text-pink-200/70 text-sm">
          Slide the heart meter to measure how much I love you!
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative">
        {!isCalculated ? (
          <>
            <div className="flex justify-between text-xs font-mono text-pink-200 mb-2">
              <span>A Lot ❤️</span>
              <span>To Infinity 🚀</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={val}
              onChange={(e) => {
                setVal(e.target.value);
                soundFx.playClick();
              }}
              className="w-full h-3 bg-burgundy-dark rounded-lg appearance-none cursor-pointer accent-rose-500 mb-6"
            />
            <button
              onClick={handleCalculate}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-lg shine-btn cursor-pointer"
            >
              Calculate Total Love ❤️
            </button>
          </>
        ) : (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-4">
            <div className="text-4xl text-rose-400 font-bold mb-2 font-mono">ERROR 404!</div>
            <p className="font-serif text-xl text-pink-100 italic mb-4">
              "Love cannot be measured. It goes beyond infinity! ❤️"
            </p>
            <button
              onClick={() => setIsCalculated(false)}
              className="px-5 py-2 rounded-full bg-white/10 text-pink-200 text-xs font-mono border border-white/20 cursor-pointer"
            >
              Try Again 🔄
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
