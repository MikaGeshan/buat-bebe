"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import S1 from "@/public/images/S1.jpeg";
import S2 from "@/public/images/S2.jpeg";
import S3 from "@/public/images/S3.jpeg";
import S4 from "@/public/images/S4.jpeg";
import S5 from "@/public/images/S5.jpeg";
import S6 from "@/public/images/S6.jpeg";

const images = [S1, S2, S3, S4, S5, S6];

const CELL =
  typeof window !== "undefined" ? Math.min(window.innerWidth / 12, 56) : 56;
const COLS = 13;
const ROWS = 13;

// perfectly centered + symmetric
function isInsideHeart(col: number, row: number): boolean {
  const x = (col - (COLS - 1) / 2) / ((COLS - 1) / 2);

  let y = ((ROWS - 1) / 2 - row) / ((ROWS - 1) / 2);

  y *= 1.3; // stretch vertically
  y += 0.1; // lift top slightly

  const val = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3);

  return val <= 0;
}

// 🔥 clean edge detection (8 directions)
function isEdgeCell(col: number, row: number): boolean {
  if (!isInsideHeart(col, row)) return false;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  return directions.some(([dx, dy]) => {
    const c = col + dx;
    const r = row + dy;

    if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return true;
    return !isInsideHeart(c, r);
  });
}

// generate outline cells only
const heartCells: { col: number; row: number }[] = [];

for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    if (isEdgeCell(col, row)) {
      heartCells.push({ col, row });
    }
  }
}

const centerCol = (COLS - 1) / 2;

heartCells.sort((a, b) => {
  // bottom first
  if (b.row !== a.row) return b.row - a.row;

  // then center outward
  return Math.abs(a.col - centerCol) - Math.abs(b.col - centerCol);
});

function HeartShapedImage() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < heartCells.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 45); // slightly faster = smoother outline draw
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  const totalWidth = COLS * CELL;
  const totalHeight = ROWS * CELL;

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div
        className="relative"
        style={{ width: totalWidth, height: totalHeight }}
      >
        {heartCells.map(({ col, row }, i) => {
          const img = images[i % images.length];
          const x = col * CELL;
          const y = row * CELL;

          return (
            <motion.div
              key={`${col}-${row}`}
              className="absolute overflow-hidden rounded-2xl"
              style={{
                left: x,
                top: y,
                width: CELL - 4,
                height: CELL - 4,
                border: "2px solid rgba(255,255,255,0.7)",
                boxShadow:
                  "0 0 12px rgba(255,105,180,0.7), 0 0 25px rgba(255,105,180,0.35)",
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: 20, // comes from below 👇
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.035, // 🔥 key magic
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <Image
                src={img}
                alt={`Rilly ${(i % images.length) + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default HeartShapedImage;
