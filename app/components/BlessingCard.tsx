"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Blessing from "@/public/gifs/Blessing.gif";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

interface BlessingCardProps {
  onPress: () => void;
}

const BlessingCard: React.FC<BlessingCardProps> = ({ onPress }) => {
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const startDate = new Date("2010-04-01T00:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const diffTime = now.getTime() - startDate.getTime();

      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      setTimeDiff({ days, hours, minutes, seconds });
    }, 1000);

    setShowConfetti(true);
    const confettiTimeout = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(confettiTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      {showConfetti && (
        <Confetti width={width} height={height} numberOfPieces={200} />
      )}

      <AnimatePresence>
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
          className="relative bg-white rounded-3xl shadow-2xl px-7 py-8 w-full max-w-85 flex flex-col items-center gap-5 overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #fff7f9 0%, #ffffff 60%, #fdf0ff 100%)",
          }}
        >
          {/* Soft decorative background blobs */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #f9a8d4 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-15 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #d8b4fe 0%, transparent 70%)",
            }}
          />

          <div className="w-36 h-36 sm:w-40 sm:h-40 relative rounded-2xl overflow-hidden">
            <Image
              src={Blessing}
              alt="Blessing"
              fill
              className="object-contain"
            />
          </div>

          {/* Heading */}
          <h1
            className="text-center text-base sm:text-lg font-semibold leading-snug"
            style={{
              background: "linear-gradient(135deg, #db2777 0%, #9333ea 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            You&apos;ve been a blessing for this long
          </h1>

          {/* Live Counter Grid */}
          <div className="grid grid-cols-4 gap-2 w-full">
            {[
              { value: timeDiff.days.toLocaleString(), label: "days" },
              {
                value: timeDiff.hours.toString().padStart(2, "0"),
                label: "hours",
              },
              {
                value: timeDiff.minutes.toString().padStart(2, "0"),
                label: "mins",
              },
              {
                value: timeDiff.seconds.toString().padStart(2, "0"),
                label: "secs",
              },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center bg-white/70 rounded-xl py-2 px-1 shadow-sm ring-1 ring-pink-100"
              >
                <span
                  className="text-xl sm:text-2xl font-bold tabular-nums"
                  style={{
                    background:
                      "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {value}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="relative mt-1">
            <span className="absolute -top-2 -right-2 text-base leading-none z-10 select-none">
              💕
            </span>

            <button
              onClick={onPress}
              className="relative inline-flex items-center justify-center font-semibold text-white text-sm sm:text-base py-3 px-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)",
                boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
              }}
            >
              Click here
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BlessingCard;
