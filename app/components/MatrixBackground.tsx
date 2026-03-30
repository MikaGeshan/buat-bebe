"use client";

import { useEffect, useRef } from "react";

const text = "HAPPY BIRTHDAY ";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 28;
    const columns = Math.floor(width / fontSize);

    const drops: number[] = Array(columns).fill(0);
    const charIndex: number[] = Array(columns).fill(0);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const draw = () => {
      // 🖤 fade trail (THIS is the magic)
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(0, 0, 0, 1)";

      ctx.font = `700 ${fontSize}px monospace`;
      ctx.textAlign = "center";

      const trailLength = 10; // tweak this (8–15 is nice)

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize + fontSize / 2;

        for (let j = 0; j < trailLength; j++) {
          const y = (drops[i] - j) * fontSize;

          if (y < 0) continue;

          const index = (charIndex[i] - j + text.length) % text.length;
          const char = text[index];

          if (j === 0) {
            ctx.fillStyle = "#ffc0cb";
            ctx.shadowColor = "#ff69b4";
            ctx.shadowBlur = 12;
          } else {
            const opacity = 1 - j / trailLength;
            ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`;
            ctx.shadowBlur = 6 * opacity;
          }

          ctx.fillText(char, x, y);
        }

        // move down
        drops[i]++;
        charIndex[i]++;

        // reset
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
          charIndex[i] = Math.floor(Math.random() * text.length);
        }
      }
    };

    let lastTime = 0;
    const fps = 30;
    const interval = 1200 / fps;

    const drawLoop = (time: number) => {
      if (time - lastTime > interval) {
        draw();
        lastTime = time;
      }
      requestAnimationFrame(drawLoop);
    };

    requestAnimationFrame(drawLoop);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-black" />;
}
