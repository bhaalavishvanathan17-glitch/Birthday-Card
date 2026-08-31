import React from "react";

export default function Vignette() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-30"
      style={{
        background: "radial-gradient(circle at center, transparent 55%, rgba(10, 2, 7, 0.65) 100%)"
      }}
    />
  );
}
