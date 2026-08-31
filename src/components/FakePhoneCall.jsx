import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, PhoneCall, X } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import { soundFx } from "../utils/SoundManager";

export default function FakePhoneCall() {
  const [callState, setCallState] = useState("idle"); // idle, ringing, accepted, rejected
  const callData = birthdayConfig.fakePhoneCall || {};

  const handleStartCall = () => {
    soundFx.playPop();
    setCallState("ringing");
  };

  const handleAccept = () => {
    soundFx.playUnwrap();
    setCallState("accepted");
  };

  const handleReject = () => {
    soundFx.playClick();
    setCallState("rejected");
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto text-center" id="phone-call">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative">
        <h2 className="font-serif text-2xl font-bold text-pink-100 mb-2">
          Incoming Call Story 📞
        </h2>
        <p className="text-pink-200/70 text-xs mb-6">
          Press to trigger a fictional incoming phone call!
        </p>

        {callState === "idle" && (
          <button
            onClick={handleStartCall}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 mx-auto cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Receive Birthday Call ❤️</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {callState !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-burgundy-dark border border-white/20 rounded-3xl p-8 max-w-xs w-full text-center relative shadow-2xl text-cream"
            >
              <button
                onClick={() => setCallState("idle")}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-pink-200 hover:bg-white/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-3xl animate-bounce">
                ❤️
              </div>

              <h3 className="font-serif text-xl font-bold text-pink-100 mb-1">
                {callData.callerName || "My Love ❤️"}
              </h3>
              <p className="font-mono text-xs text-rose-300 mb-8">
                {callState === "ringing" ? "Incoming Call..." : callState === "accepted" ? "Connected 00:14" : "Call Ended"}
              </p>

              {callState === "ringing" && (
                <div className="flex items-center justify-around">
                  <button
                    onClick={handleReject}
                    className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg cursor-pointer"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleAccept}
                    className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg cursor-pointer animate-pulse"
                  >
                    <Phone className="w-6 h-6" />
                  </button>
                </div>
              )}

              {callState === "accepted" && (
                <p className="font-serif italic text-sm text-pink-100">
                  "{callData.acceptMsg || "I just wanted to hear your voice and wish you a Happy Birthday! ❤️"}"
                </p>
              )}

              {callState === "rejected" && (
                <p className="font-serif italic text-sm text-rose-300">
                  "{callData.rejectMsg || "Nice try! You cannot escape my love! 😂❤️"}"
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
