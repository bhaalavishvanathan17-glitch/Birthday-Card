import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayConfig } from "./config/birthdayConfig";

// Components
import LoadingScreen from "./components/LoadingScreen";
import LandingScreen from "./components/LandingScreen";
import Navbar from "./components/Navbar";
import CursorEffects from "./components/CursorEffects";
import MusicPlayer from "./components/MusicPlayer";
import BirthdayHero from "./components/BirthdayHero";
import Countdown from "./components/Countdown";
import OurStory from "./components/OurStory";
import MemoryGallery from "./components/MemoryGallery";
import LoveReasons from "./components/LoveReasons";
import OurSong from "./components/OurSong";
import BucketList from "./components/BucketList";
import LoveLetter from "./components/LoveLetter";
import BirthdayQuiz from "./components/BirthdayQuiz";
import SpecialReasons from "./components/SpecialReasons";
import GiftBox from "./components/GiftBox";
import FinalMessage from "./components/FinalMessage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [surpriseOpened, setSurpriseOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);
  
  const audioRef = useRef(null);

  useEffect(() => {
    // Show loading screen for 2.2 seconds for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenSurprise = () => {
    setSurpriseOpened(true);
    // Trigger music play on user interaction
    if (audioRef.current && hasMusic) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Audio play blocked by browser. User needs to tap play.", err);
        });
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={birthdayConfig.music.file}
        preload="auto"
        loop
        onError={() => {
          console.log("Optional music file not found/loaded at public/music/our-song.mp3. Silent mode activated.");
          setHasMusic(false);
        }}
      />

      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && !surpriseOpened && (
          <LandingScreen key="landing" onOpen={handleOpenSurprise} />
        )}
      </AnimatePresence>

      {/* Main website content after surprise is opened */}
      {surpriseOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full overflow-x-hidden min-h-screen bg-cream flex flex-col"
        >
          {/* Floating Navigation Menu */}
          <Navbar />

          {/* Desktop Custom Glowing Cursor */}
          <CursorEffects />

          {/* 1. Hero Section + Cake */}
          <BirthdayHero />

          {/* 2. Countdown Section */}
          <Countdown />

          {/* 3. Our Story Section */}
          <OurStory />

          {/* 4. Memory Gallery Section */}
          <MemoryGallery />

          {/* 5. Reasons Section */}
          <LoveReasons />

          {/* 6. Dedicated Our Song Section */}
          <OurSong 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying} 
            hasMusic={hasMusic} 
            audioRef={audioRef} 
          />

          {/* 7. Bucket List Section */}
          <BucketList />

          {/* 8. Letter Section */}
          <LoveLetter />

          {/* 9. Quiz Section */}
          <BirthdayQuiz />

          {/* 10. Special Qualities Section */}
          <SpecialReasons />

          {/* 11. Gift Surprise Section */}
          <GiftBox />

          {/* 12. Final Message Section */}
          <FinalMessage />

          {/* Music player controls overlays */}
          <MusicPlayer
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            hasMusic={hasMusic}
          />
        </motion.div>
      )}
    </>
  );
}
