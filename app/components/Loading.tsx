"use client";
import { motion } from "framer-motion";
import { Press_Start_2P } from "next/font/google";

const customFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white gap-8">
      <motion.div
        className="w-16 h-16 border-[6px] border-pink-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />

      <motion.h1
        className={`${customFont.className} text-xs sm:text-sm text-center leading-relaxed`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        PREPARING SOMETHING
        <br />
        FOR YOU...
      </motion.h1>
    </div>
  );
}
