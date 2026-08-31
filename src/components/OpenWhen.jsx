import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Heart } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function OpenWhen() {
  const [selectedNote, setSelectedNote] = useState(null);
  const notes = birthdayConfig.openWhenMessages || [];

  const handleOpenEnvelope = (n) => {
    soundFx.playPop();
    setSelectedNote(n);
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="open-when">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-pink-100 mb-2 flex items-center justify-center space-x-2">
          <Mail className="w-8 h-8 text-rose-400" />
          <span>Open When... Envelopes 💌</span>
        </h2>
        <p className="text-pink-200/70 text-sm max-w-md mx-auto">
          Handcrafted virtual envelopes for special moments when you need a gentle reminder of my love.
        </p>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((n) => (
          <motion.button
            key={n.id || n.title}
            whileHover={{ scale: 1.04, y: -5 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleOpenEnvelope(n)}
            className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col items-center justify-center text-center group cursor-pointer hover:border-pink-400/40 relative overflow-hidden"
          >
            {/* Wax stamp corner graphic */}
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-600/80 flex items-center justify-center text-white text-[10px]">
              ❤️
            </div>

            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-3xl mb-3 shadow-lg group-hover:rotate-6 transition-transform">
              💌
            </div>
            <h3 className="font-serif text-base font-bold text-pink-100 group-hover:text-pink-300 transition-colors">
              {n.title}
            </h3>
          </motion.button>
        ))}
      </div>

      {/* Envelope Stationery Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, rotateX: 20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="stationery-paper rounded-3xl p-8 max-w-md w-full text-center relative shadow-2xl border border-rose-300 select-none"
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-inner">
                <Heart className="w-6 h-6 fill-white" />
              </div>

              <h3 className="font-serif text-xl font-bold text-rose-950 mb-3 border-b border-rose-200 pb-2">
                {selectedNote.title}
              </h3>

              <p className="font-handwriting text-xl text-rose-900 leading-relaxed italic">
                "{selectedNote.body}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
