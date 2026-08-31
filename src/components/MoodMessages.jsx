import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";

export default function MoodMessages() {
  const [activeMood, setActiveMood] = useState(null);
  const moodData = birthdayConfig.moods || {};

  const moodsList = [
    { id: "happy", label: "Happy", emoji: "😊" },
    { id: "sad", label: "Sad", emoji: "🥺" },
    { id: "tired", label: "Tired", emoji: "😴" },
    { id: "angry", label: "Angry", emoji: "😡" },
    { id: "missing", label: "Missing Me", emoji: "❤️" },
    { id: "peaceful", label: "Peaceful", emoji: "😌" }
  ];

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto text-center" id="moods">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-pink-100 mb-2 flex items-center justify-center space-x-2">
          <Smile className="w-7 h-7 text-rose-400" />
          <span>How Are You Feeling Today?</span>
        </h2>
        <p className="text-pink-200/70 text-sm max-w-md mx-auto">
          Tap your current mood to get a sweet personalized note written just for how you feel.
        </p>
      </div>

      {/* Mood Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {moodsList.map((m) => (
          <motion.button
            key={m.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveMood(m.id)}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
              activeMood === m.id
                ? "bg-rose-500 text-white border-white shadow-lg shadow-rose-900/40"
                : "bg-white/10 backdrop-blur-md text-pink-100 border-white/15 hover:bg-white/20"
            }`}
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className="text-sm font-medium">{m.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Mood Message Card */}
      <AnimatePresence mode="wait">
        {activeMood && (
          <motion.div
            key={activeMood}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 rounded-3xl bg-burgundy-dark/90 border border-pink-400/30 text-pink-100 shadow-2xl text-left relative"
          >
            <div className="flex items-center space-x-2 mb-3 text-rose-300 font-bold text-sm">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span>For when you feel {moodsList.find((m) => m.id === activeMood)?.label.toLowerCase()}...</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed font-sans text-pink-100/90">
              "{moodData[activeMood] || "Remember that I love you through every mood, every day, always. ❤️"}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
