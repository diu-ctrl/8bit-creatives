"use client";

import * as React from "react";
import { CoverflowCarousel, type CoverflowSlide } from "./coverflow-carousel";

const ROSTER_SLIDES: CoverflowSlide[] = [
  {
    id: "mortal",
    src: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80",
    alt: "Mortal - Naman Mathur",
    title: "MORTAL",
    subtitle: "Naman Mathur · BGMI Esports Legend",
    meta: [
      { label: "REACH", value: "7.1M" },
      { label: "PLATFORM", value: "YouTube" },
    ],
  },
  {
    id: "payal",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    alt: "Payal Gaming - Payal Dhare",
    title: "PAYAL GAMING",
    subtitle: "Payal Dhare · Variety & Esports Icon",
    meta: [
      { label: "REACH", value: "4.2M" },
      { label: "PLATFORM", value: "YouTube & IG" },
    ],
  },
  {
    id: "snax",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    alt: "Snax - Raj Varma",
    title: "SNAX",
    subtitle: "Raj Varma · FPS Competitive & Kick Streamer",
    meta: [
      { label: "REACH", value: "1.8M" },
      { label: "PLATFORM", value: "Kick & YouTube" },
    ],
  },
  {
    id: "scout",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    alt: "Scout - Tanmay Singh",
    title: "SCOUT",
    subtitle: "Tanmay Singh · Global Esports Pioneer",
    meta: [
      { label: "REACH", value: "5.2M" },
      { label: "PLATFORM", value: "YouTube" },
    ],
  },
  {
    id: "regaltos",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    alt: "Regaltos - Parv Singh",
    title: "REGALTOS",
    subtitle: "Parv Singh · Mobile Esports Prodigy",
    meta: [
      { label: "REACH", value: "2.4M" },
      { label: "PLATFORM", value: "YouTube & Kick" },
    ],
  },
  {
    id: "mamba",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    alt: "8Bit Mamba - Salman Ahmad",
    title: "8BIT MAMBA",
    subtitle: "Salman Ahmad · GTA RP Pioneer & Storyteller",
    meta: [
      { label: "REACH", value: "1.4M" },
      { label: "PLATFORM", value: "Kick & YouTube" },
    ],
  },
];

export function CoverflowDemo() {
  const handleSelectCreator = (slide: CoverflowSlide) => {
    if (typeof window !== "undefined" && (window as any).openCreatorModal && slide.id) {
      (window as any).openCreatorModal(slide.id);
    } else {
      console.log("Selected Creator:", slide.title);
    }
  };

  return (
    <div className="w-full bg-[#0C0C0D] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF5A00]">
              <span className="inline-block h-2 w-2 rotate-45 bg-[#FF5A00]" />
              02 — THE ROSTER
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl font-display">
              THE FACES OF INDIAN GAMING.
            </h2>
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            …and 47 more where they came from.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <CoverflowCarousel
          slides={ROSTER_SLIDES}
          initialIndex={0}
          rotate={44}
          depth={0.6}
          perspective={3}
          falloff={0.56}
          onSlideClick={handleSelectCreator}
        />
      </div>
    </div>
  );
}
