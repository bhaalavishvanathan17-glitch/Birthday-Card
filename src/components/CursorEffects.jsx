import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorEffects() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile touch devices or small screens
    const checkDevice = () => {
      const mobile = 
        window.innerWidth < 768 || 
        navigator.maxTouchPoints > 0 || 
        "ontouchstart" in window;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const moveCursor = (e) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX - 10); // Center the 20px circle
      cursorY.set(e.clientY - 10);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over an interactive element
      const target = e.target;
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.closest(".glass"); // Hovering cards
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, isVisible]);

  // Don't render on mobile/touch interfaces
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-50 mix-blend-difference border-2 border-rose-400"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 2.2 : 1,
          backgroundColor: isHovering ? "rgba(251, 113, 133, 0.2)" : "rgba(251, 113, 133, 0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 bg-rose-500"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          // center dot inside outer ring (20px vs 8px)
          translateX: 6,
          translateY: 6,
          scale: isHovering ? 0.6 : 1,
        }}
      />
    </>
  );
}
