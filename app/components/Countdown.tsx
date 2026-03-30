"use client";

import { Press_Start_2P } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const customFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

function Countdown({ onFinish }: { onFinish: () => void }) {
  const sequence = [3, 2, 1, "HAPPY", "BIRTHDAY", "TO", "RILLY"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const delay = index >= 4 ? 1500 : 1100;

    const timer = setTimeout(() => {
      if (index < sequence.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        onFinish();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [index, onFinish, sequence.length]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          className={`
    ${customFont.className}
    text-[28px] sm:text-[40px] md:text-[72px] lg:text-[96px]
    tracking-widest sm:tracking-[0.2em]
    max-w-[90vw]
    text-center
    wrap-break-word
  `}
          initial={{ opacity: 0, scale: 0.3, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.3, filter: "blur(6px)" }}
          transition={{
            duration: 0.45,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #fef08a 0%, #facc15 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}
          >
            {sequence[index]}
          </span>
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

export default Countdown;
