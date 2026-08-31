import React, { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Surprise", href: "#home" },
    { name: "Our Story", href: "#our-story" },
    { name: "Birth Time", href: "#birth-time" },
    { name: "Why You", href: "#reasons" },
    { name: "Let's Play", href: "#birthday-quiz" },
    { name: "From Me", href: "#letter" },
    { name: "Our Future", href: "#bucket-list" },
    { name: "Final Surprise", href: "#final-question" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href.replace("#", ""));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-5xl"
      >
        <div className="bg-burgundy-dark/85 backdrop-blur-xl border border-white/20 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center justify-between shadow-2xl relative overflow-hidden">
          {/* Scroll progress bar */}
          <div 
            className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Logo / Heart */}
          <button 
            onClick={() => scrollToSection("#home")}
            className="flex items-center space-x-2 cursor-pointer text-pink-100 hover:text-white transition focus:outline-none touch-target"
          >
            <Heart className="w-4 sm:w-5 h-4 sm:h-5 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="font-serif font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase text-pink-200 truncate max-w-[170px] sm:max-w-none">
              Happy Birthday ❤️
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer focus:outline-none ${
                    isActive
                      ? "bg-rose-500 text-white shadow-md shadow-rose-900/40 font-semibold"
                      : "text-pink-200/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-pink-200 hover:text-white rounded-full hover:bg-white/10 cursor-pointer focus:outline-none touch-target"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-burgundy-dark/95 backdrop-blur-2xl z-30 flex flex-col items-center justify-center space-y-4 p-6"
          >
            {navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-lg sm:text-xl font-serif font-medium transition-all cursor-pointer focus:outline-none py-2 px-6 rounded-full touch-target ${
                    isActive ? "text-rose-400 scale-105 font-bold bg-white/5 border border-rose-500/20" : "text-pink-100 hover:text-rose-300"
                  }`}
                >
                  {item.name}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
