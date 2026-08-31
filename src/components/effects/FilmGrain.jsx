import React from "react";

export default function FilmGrain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] overflow-hidden mix-blend-overlay">
      <svg className="w-full h-full">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
