import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundFx } from "../utils/SoundManager";

export default function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggle = () => {
    const newState = soundFx.toggle();
    setIsEnabled(newState);
    if (newState) soundFx.playPop();
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isEnabled ? "Disable UI Sound Effects" : "Enable UI Sound Effects"}
      className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-pink-200 hover:text-white shadow-xl hover:scale-105 cursor-pointer focus:outline-none"
    >
      {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
    </button>
  );
}
