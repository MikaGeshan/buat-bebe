"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MatrixBackground from "./components/MatrixBackground";
import Countdown from "./components/Countdown";
import GalaxyBackground from "./components/GalaxyBackground";
import BirthdayCard from "./components/BirthdayCard";
import BlessingCard from "./components/BlessingCard";
import HeartShapedImage from "./components/HeartShapedImage";
import AudioPlayer from "./components/AudioPlayer";
import Loading from "./components/Loading";

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  const [index, setIndex] = useState(0);
  const [showBlessing, setShowBlessing] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 sec intro

    return () => clearTimeout(timer);
  }, []);

  const tracks = {
    main: "/audio/hepibesdey.mp3",
    heart: "/audio/sempurna.mp3",
  };
  const [currentTrack, setCurrentTrack] = useState(tracks.main);

  useEffect(() => {
    if (showHeart) {
      setCurrentTrack(tracks.heart);
    } else {
      setCurrentTrack(tracks.main);
    }
  }, [showHeart, tracks.heart, tracks.main]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  const handleToggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const messages = [
    "Happy 16th Birthday Rilly!",
    "Wishing you a day filled with love and joy.",
    "May you have a long and healthy life,",
    "and may all your dreams come true in this new chapter.",
    "Keep striving in JKT48, it's a joy to see you shine more each day.",
    "Here's to another year of amazing memories.",
    "Enjoy every moment of your journey!!!",
    "Stay true to yourself and always be happy.",
  ];

  const handleNextMessage = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
    } else {
      setShowBlessing(true);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <audio ref={audioRef} src={currentTrack} preload="auto" />;
      <div className="absolute top-4 right-4 z-50">
        <AudioPlayer isPlaying={isPlaying} onToggle={handleToggleAudio} />
      </div>
      {/* Background */}
      <AnimatePresence>
        {!showMain && (
          <motion.div
            key="matrix"
            className="absolute inset-0 z-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <MatrixBackground />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Countdown */}
      <AnimatePresence>
        {!showMain && (
          <motion.div
            key="countdown"
            className="absolute inset-0 z-10 flex items-center justify-center px-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <Countdown onFinish={() => setShowMain(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main */}
      <AnimatePresence>
        {showMain && !showHeart && (
          <motion.div
            key="main"
            className="absolute inset-0 z-20 flex items-center justify-center bg-black px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <GalaxyBackground />

            <div className="relative flex flex-col items-center justify-center gap-3 w-full max-w-md h-full py-6">
              {/* Message bubble */}
              {!showBlessing && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={messages[index]}
                    className="w-full flex justify-center px-4 shrink-0"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <motion.h2
                      className="relative text-center text-sm sm:text-base font-semibold
                        px-5 py-3 rounded-2xl shadow-md
                        max-w-[90%] leading-relaxed"
                      style={{
                        background:
                          "linear-gradient(160deg, #fff7f9 0%, #ffffff 60%, #fdf0ff 100%)",
                        boxShadow:
                          "0 4px 20px rgba(236, 72, 153, 0.12), 0 1px 4px rgba(0,0,0,0.06)",
                        border: "1px solid rgba(249, 168, 212, 0.35)",
                      }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <span
                        style={{
                          background:
                            "linear-gradient(135deg, #db2777 0%, #9333ea 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {messages[index]}
                      </span>
                      <span className="absolute -top-2.5 -right-2.5 text-sm leading-none select-none">
                        💖
                      </span>
                    </motion.h2>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Card */}
              <div className="w-full flex justify-center flex-1 min-h-0">
                {!showBlessing ? (
                  <BirthdayCard
                    onPrev={() => setIndex((prev) => Math.max(0, prev - 1))}
                    setIndex={handleNextMessage}
                  />
                ) : (
                  <BlessingCard onPress={() => setShowHeart(true)} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Heart Section */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            key="heart"
            className="absolute inset-0 z-30 flex items-center justify-center bg-black px-4 sm:px-6 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <GalaxyBackground />

            <div className="relative flex items-center justify-center w-full h-full max-w-105 sm:max-w-130 md:max-w-160">
              <div className="w-full aspect-square flex items-center justify-center">
                <HeartShapedImage />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
