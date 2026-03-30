"use client";

import React from "react";
import Image from "next/image";

import PlayIcon from "@/public/icons/play.svg";
import PauseIcon from "@/public/icons/pause.svg";

type Props = {
  isPlaying: boolean;
  onToggle: () => void;
};

function AudioPlayer({ isPlaying, onToggle }: Props) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onToggle}
        className="rounded-full p-3 bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 active:scale-95 transition"
      >
        <Image
          src={isPlaying ? PauseIcon : PlayIcon}
          alt="audio control"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}

export default AudioPlayer;
