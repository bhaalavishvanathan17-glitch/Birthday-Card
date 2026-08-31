import React from "react";

export default function BokehParticles({ count = 12 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-rose-300/20 blur-xl animate-pulse"
          style={{
            width: `${20 + (i % 4) * 25}px`,
            height: `${20 + (i % 4) * 25}px`,
            top: `${(i * 17) % 100}%`,
            left: `${(i * 29) % 100}%`,
            animationDuration: `${3 + (i % 3) * 2}s`,
            animationDelay: `${i * 0.4}s`
          }}
        />
      ))}
    </div>
  );
}
