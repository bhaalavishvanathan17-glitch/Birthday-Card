import React, { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Our Story", href: "#our-story" },
    { name: "Memories", href: "#memories" },
    { name: "Reasons", href: "#reasons" },
    { name: "Letter", href: "#letter" },
    { name: "Surprise", href: "#surprise" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check which section is in view
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
      {/* Floating Navbar Container */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-4xl"
      >
        <div className="glass px-4 py-3 rounded-full flex items-center justify-between shadow-md relative overflow-hidden">
          {/* Scroll progress line inside navbar border */}
          <div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-rose-400 to-pink-600 transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Logo / Heart */}
          <button 
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 cursor-pointer font-playfair font-bold text-rose-700 hover:text-rose-800 transition focus:outline-none"
          >
            <Heart className="w-5 h-5 fill-rose-600 text-rose-600 animate-pulse" />
            <span className="text-sm tracking-widest uppercase">My Love</span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-1.5 rounded-full text-xs font-poppins font-medium tracking-wide transition-all cursor-pointer focus:outline-none ${
                    isActive
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-rose-950 hover:bg-rose-100/50 hover:text-rose-700"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-1.5 text-rose-800 hover:text-rose-900 rounded-full hover:bg-rose-100/50 cursor-pointer focus:outline-none"
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
            className="fixed inset-0 bg-[#fff5f5]/90 backdrop-blur-md z-29 flex flex-col items-center justify-center gap-6"
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
                  transition={{ delay: index * 0.08 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-2xl font-playfair font-semibold transition-all cursor-pointer focus:outline-none ${
                    isActive ? "text-rose-600 scale-105" : "text-rose-900 hover:text-rose-600"
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
