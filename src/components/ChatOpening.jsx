import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";

export default function ChatOpening({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [imageError, setImageError] = useState(false);

  const chatContainerRef = useRef(null);

  const profileName = birthdayConfig.profileName || "SK Gopi";
  const profileImage = birthdayConfig.profileImage || "/images/profile.jpg";

  const chatList = birthdayConfig.chatMessages || [
    { sender: "them", text: "Hey...", delay: 800 },
    { sender: "them", text: "Are you free for a minute?", delay: 1600 },
    { sender: "them", text: "Because I made something for you...", delay: 2400 },
    { sender: "them", text: "Something you have never seen before. ✨", delay: 3200 },
    { sender: "them", text: "Ready? ❤️", delay: 4000 }
  ];

  // Auto-scroll chat container to bottom when messages or typing status updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  // StrictMode-safe sequential message loop
  useEffect(() => {
    if (currentIndex >= chatList.length) {
      setIsTyping(false);
      setIsDone(true);
      return;
    }

    setIsTyping(true);

    const typingDuration = 1000;
    const typingTimer = setTimeout(() => {
      const currentMsg = chatList[currentIndex];
      
      setMessages((prev) => {
        if (prev.some((m) => m.text === currentMsg.text)) return prev;
        return [...prev, currentMsg];
      });

      setIsTyping(false);

      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 600);

      return () => clearTimeout(nextTimer);
    }, typingDuration);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-burgundy-dark flex flex-col items-center justify-center p-4 relative overflow-hidden text-cream">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col h-[540px]"
      >
        {/* Chat Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
          <div className="relative">
            {!imageError ? (
              <img
                src={profileImage}
                alt={profileName}
                onError={() => setImageError(true)}
                className="w-12 h-12 rounded-full object-cover border-2 border-pink-400/40 shadow-md"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow-md border-2 border-pink-300/40">
                SK
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-burgundy-dark" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-pink-100">{profileName}</h3>
            <p className="text-xs text-pink-300/90 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Online & typing a message...</span>
            </p>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto py-4 space-y-3 px-1 custom-scrollbar">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start"
            >
              <div className="bg-gradient-to-r from-rose-900/80 to-pink-900/70 text-cream px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] text-sm leading-relaxed border border-rose-500/20 shadow-sm">
                {m.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-1.5 bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm w-16"
            >
              <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </motion.div>
          )}
        </div>

        {/* Chat Action Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-center">
          <AnimatePresence>
            {isDone && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-base shadow-lg hover:shadow-pink-500/30 flex items-center justify-center space-x-2 border border-pink-300/30 cursor-pointer"
              >
                <span>Yes, I am ready! ❤️</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

