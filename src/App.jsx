import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayConfig } from "./config/birthdayConfig";

// Atmospheric Effects & Overlays
import FilmGrain from "./components/effects/FilmGrain";
import Vignette from "./components/effects/Vignette";
import AuroraBackground from "./components/effects/AuroraBackground";
import StarField from "./components/effects/StarField";
import SoundToggle from "./components/SoundToggle";
import AchievementSystem from "./components/AchievementSystem";
import CursorSecret from "./components/CursorSecret";

// Components & Navigation
import LoadingScreen from "./components/LoadingScreen";
import ChatOpening from "./components/ChatOpening";
import SurpriseOpener from "./components/SurpriseOpener";
import Navbar from "./components/Navbar";
import CursorEffects from "./components/CursorEffects";
import MusicPlayer from "./components/MusicPlayer";
import BirthdayHero from "./components/BirthdayHero";
import BirthdayCake from "./components/BirthdayCake";

// Chapter 1 Features
import LoveMeter from "./components/LoveMeter";
import VirtualHug from "./components/VirtualHug";

// Chapter 2 Components & Memory Features
import OurStory from "./components/OurStory";
import BirthTime from "./components/BirthTime";
import MemoryConstellation from "./components/MemoryConstellation";
import MemoryGallery from "./components/MemoryGallery";
import ThenNowSlider from "./components/ThenNowSlider";
import PlacesVisited from "./components/PlacesVisited";
import GuessMemory from "./components/GuessMemory";
import LivingPhoto from "./components/LivingPhoto";

// Chapter 3 Components & Emotional Features
import LoveReasons from "./components/LoveReasons";
import HundredThings from "./components/HundredThings";
import MoodMessages from "./components/MoodMessages";
import OpenWhen from "./components/OpenWhen";
import ThingsNeverSaid from "./components/ThingsNeverSaid";
import OneThing from "./components/OneThing";
import LittleThings from "./components/LittleThings";

// Chapter 4 Components & Game Features
import BirthdayQuiz from "./components/BirthdayQuiz";
import DontBreakMyHeart from "./components/DontBreakMyHeart";

// Chapter 5 Components & Secret Features
import OurSong from "./components/OurSong";
import LoveLetter from "./components/LoveLetter";
import EasterEggs from "./components/EasterEggs";
import SecretNumber from "./components/SecretNumber";
import FewSecondsWithYou from "./components/FewSecondsWithYou";
import OurMovie from "./components/OurMovie";

import BucketList from "./components/BucketList";

// Chapter 7 Components
import GiftBox from "./components/GiftBox";
import FinalQuestion from "./components/FinalQuestion";
import FinalMessage from "./components/FinalMessage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chatCompleted, setChatCompleted] = useState(false);
  const [surpriseOpened, setSurpriseOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenSurprise = () => {
    setSurpriseOpened(true);
    if (audioRef.current && hasMusic) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          console.log("Audio play blocked by browser. User can tap play on music control.");
        });
    }
  };

  const handleReplay = () => {
    setChatCompleted(false);
    setSurpriseOpened(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <FilmGrain />
      <Vignette />
      <SoundToggle />
      <AchievementSystem />
      <CursorSecret />

      <audio
        ref={audioRef}
        src={birthdayConfig.music.file}
        preload="auto"
        loop
        onError={() => setHasMusic(false)}
      />

      <EasterEggs />

      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && !chatCompleted && (
          <ChatOpening
            key="chat"
            onComplete={() => setChatCompleted(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && chatCompleted && !surpriseOpened && (
          <SurpriseOpener
            key="surprise"
            onOpen={handleOpenSurprise}
          />
        )}
      </AnimatePresence>

      {surpriseOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full overflow-x-hidden min-h-screen bg-burgundy-dark flex flex-col text-cream select-none"
        >
          <AuroraBackground />
          <Navbar />
          <CursorEffects />

          {/* CHAPTER 1 */}
          <BirthdayHero />
          <BirthdayCake />
          <LoveMeter />
          <VirtualHug />

          {/* CHAPTER 2 */}
          <OurStory />
          <BirthTime />
          <MemoryConstellation />
          <MemoryGallery />
          <GuessMemory />
          <LivingPhoto />
          <ThenNowSlider />
          <PlacesVisited />

          {/* CHAPTER 3 */}
          <LoveReasons />
          <HundredThings />
          <ThingsNeverSaid />
          <OneThing />
          <LittleThings />
          <MoodMessages />
          <OpenWhen />

          {/* CHAPTER 4 */}
          <BirthdayQuiz />
          <DontBreakMyHeart />

          {/* CHAPTER 5 */}
          <OurSong
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            hasMusic={hasMusic}
            audioRef={audioRef}
          />
          <LoveLetter />
          <SecretNumber />
          <FewSecondsWithYou />
          <OurMovie />

          <StarField />
          <BucketList />

          {/* CHAPTER 7 */}
          <GiftBox />
          <FinalQuestion />
          <FinalMessage onReplay={handleReplay} />

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
