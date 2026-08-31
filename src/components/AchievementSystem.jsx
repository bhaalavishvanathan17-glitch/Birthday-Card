import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { achievementManager } from "../utils/AchievementManager";
import { birthdayConfig } from "../config/birthdayConfig";

export default function AchievementSystem() {
  const [toast, setToast] = useState(null);
  const [showRoom, setShowRoom] = useState(false);
  const [unlockedList, setUnlockedList] = useState([]);

  useEffect(() => {
    const unsub = achievementManager.onUnlock((ach) => {
      setToast(ach);
      setTimeout(() => setToast(null), 4000);
    });
    return unsub;
  }, []);

  const handleOpenRoom = () => {
    setUnlockedList(achievementManager.getUnlocked());
    setShowRoom(true);
  };

  const definitions = birthdayConfig.achievements || [];

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 left-6 z-50 bg-amber-500 text-black font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-amber-300 flex items-center space-x-2 pointer-events-none"
          >
            <Trophy className="w-4 h-4" />
            <span>UNLOCKED: {toast.title}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trophy Room Button */}
      <button
        onClick={handleOpenRoom}
        className="fixed bottom-5 sm:bottom-6 right-16 sm:right-20 z-40 p-2.5 rounded-full bg-amber-500/20 backdrop-blur-xl border border-amber-400/40 text-amber-300 hover:text-white shadow-xl hover:scale-105 cursor-pointer focus:outline-none touch-target"
        aria-label="Achievement Room"
      >
        <Trophy className="w-4 h-4" />
      </button>

      {/* Achievement Room Modal */}
      <AnimatePresence>
        {showRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowRoom(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-burgundy-dark border border-amber-400/40 rounded-3xl p-6 max-w-md w-full text-center relative shadow-2xl text-cream max-h-[80vh] flex flex-col"
            >
              <button onClick={() => setShowRoom(false)} className="absolute top-4 right-4 p-2 text-pink-200">
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
                <Trophy className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl font-bold text-amber-300 mb-4 border-b border-white/10 pb-2">
                Secret Trophy Room 🏆
              </h3>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {definitions.map((def) => {
                  const isUnlocked = unlockedList.includes(def.id);
                  return (
                    <div
                      key={def.id}
                      className={`p-3 rounded-2xl border text-left flex items-center space-x-3 ${
                        isUnlocked
                          ? "bg-amber-500/10 border-amber-400/40 text-amber-200"
                          : "bg-white/5 border-white/10 text-pink-200/40 opacity-50"
                      }`}
                    >
                      <span className="text-xl">{isUnlocked ? "🏆" : "🔒"}</span>
                      <div>
                        <p className="font-serif font-bold text-xs">{isUnlocked ? def.title : "???"}</p>
                        <p className="text-[10px] font-mono">{isUnlocked ? def.desc : "Locked Achievement"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
