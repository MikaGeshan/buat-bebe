"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import BirthdayGif from "@/public/gifs/Party Love GIF by HUisHU.gif";
import Rilly1 from "@/public/images/Rilly1.jpeg";
import Rilly2 from "@/public/images/Rilly2.jpeg";
import Rilly3 from "@/public/images/Rilly3.jpeg";
import Rilly4 from "@/public/images/Rilly4.jpeg";
import Rilly5 from "@/public/images/Rilly5.jpeg";
import Rilly6 from "@/public/images/Rilly6.jpeg";
import Rilly7 from "@/public/images/Rilly7.jpeg";

const images = [
  BirthdayGif,
  Rilly1,
  Rilly2,
  Rilly3,
  Rilly4,
  Rilly5,
  Rilly6,
  Rilly7,
];

function BirthdayCard({
  setIndex,
  onPrev,
}: {
  setIndex: () => void;
  onPrev: () => void;
}) {
  const [imgIndex, setImgIndex] = React.useState(0);

  const handleDragEnd = (
    event: PointerEvent,
    info: { offset: { x: number } },
  ) => {
    if (info.offset.x < -100) {
      if (imgIndex < images.length - 1) {
        setImgIndex((prev) => prev + 1);
        setIndex();
      } else {
        setIndex();
      }
    } else if (info.offset.x > 100 && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
      onPrev();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full max-h-[70vh]">
      <div className="relative w-full max-w-88 h-full max-h-125">
        <AnimatePresence>
          {images.map((img, i) => {
            const isActive = i === imgIndex;
            const offset = i - imgIndex;

            if (offset < -2 || offset > 2) return null;

            return (
              <motion.div
                key={i}
                className="absolute w-full h-full rounded-2xl overflow-hidden shadow-xl"
                style={{
                  zIndex: 10 - Math.abs(offset),
                }}
                animate={{
                  scale: isActive ? 1 : 0.9,
                  y: isActive ? 0 : 20,
                  opacity: isActive ? 1 : 0.8,
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ scale: 0.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {i === 0 ? (
                  <div className="w-full h-full p-6 bg-white flex items-center justify-center">
                    <Image
                      src={img}
                      alt={`Card ${i}`}
                      className="object-contain rounded-xl"
                    />
                  </div>
                ) : (
                  <Image
                    src={img}
                    alt={`Card ${i}`}
                    fill
                    className="object-cover"
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BirthdayCard;
