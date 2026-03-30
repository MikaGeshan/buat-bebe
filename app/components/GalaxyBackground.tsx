"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
};

type Heart = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
};

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars: Star[] = [];
    const hearts: Heart[] = [];

    // ⭐ create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        speed: Math.random() * 0.3,
      });
    }

    // 💖 spawn hearts
    const spawnHeart = () => {
      hearts.push({
        x: Math.random() * width,
        y: height + 20,
        size: Math.random() * 10 + 8,
        speed: Math.random() * 0.5 + 0.3,
        opacity: 1,
      });
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const drawHeart = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.beginPath();

      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
      ctx.bezierCurveTo(-5, 3, 0, 5, 0, 8);
      ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
      ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);

      ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`;
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      // 🌌 background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // subtle movement
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      }

      if (Math.random() < 0.05) {
        spawnHeart();
      }

      for (let i = hearts.length - 1; i >= 0; i--) {
        const heart = hearts[i];

        drawHeart(heart.x, heart.y, heart.size, heart.opacity);

        heart.y -= heart.speed;
        heart.opacity -= 0.005;

        if (heart.opacity <= 0) {
          hearts.splice(i, 1);
        }
      }
    };

    const loop = () => {
      draw();
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
