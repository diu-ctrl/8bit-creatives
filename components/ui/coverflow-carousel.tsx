"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  id?: string;
  meta?: { label: string; value: string }[];
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  initialIndex?: number;
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  onSlideChange?: (index: number) => void;
  onSlideClick?: (slide: CoverflowSlide, index: number) => void;
}

export function CoverflowCarousel({
  slides,
  initialIndex = 0,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  className,
  autoPlay = false,
  interval = 4000,
  onSlideChange,
  onSlideClick,
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState<number>(initialIndex);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const startXRef = React.useRef(0);
  const currentDragRef = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;

  const clampIndex = React.useCallback(
    (idx: number) => {
      return Math.max(0, Math.min(totalSlides - 1, idx));
    },
    [totalSlides]
  );

  const goToSlide = React.useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index);
      setActiveIndex(nextIndex);
      onSlideChange?.(nextIndex);
    },
    [clampIndex, onSlideChange]
  );

  const handlePrev = React.useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const handleNext = React.useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Autoplay
  React.useEffect(() => {
    if (!autoPlay || isDragging) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isDragging, totalSlides]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentDragRef.current = 0;
    setDragOffset(0);
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startXRef.current;
    currentDragRef.current = diff;
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    const threshold = 60;
    if (currentDragRef.current < -threshold && activeIndex < totalSlides - 1) {
      goToSlide(activeIndex + 1);
    } else if (currentDragRef.current > threshold && activeIndex > 0) {
      goToSlide(activeIndex - 1);
    }
    setDragOffset(0);
  };

  const currentSlide = slides[activeIndex];

  return (
    <div
      className={cn("relative w-full select-none overflow-hidden py-10", className)}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: "pan-y" }}
    >
      {/* 3D Coverflow Stage */}
      <div
        className="relative mx-auto flex h-[480px] w-full max-w-5xl items-center justify-center"
        style={{
          perspective: `${perspective * 400}px`,
          perspectiveOrigin: "center center",
        }}
      >
        {slides.map((slide, idx) => {
          const offset = idx - activeIndex + dragOffset / 300;
          const absOffset = Math.abs(offset);
          const isCenter = idx === activeIndex;

          const rotateY = offset * -rotate;
          const translateZ = -absOffset * (depth * 220);
          const translateX = offset * (falloff * 240);
          const scale = Math.max(0.75, 1 - absOffset * 0.12);
          const opacity = Math.max(0.2, 1 - absOffset * 0.35);
          const zIndex = Math.round(100 - absOffset * 10);

          return (
            <div
              key={`${slide.src}-${idx}`}
              onClick={(e) => {
                if (Math.abs(currentDragRef.current) > 5) return;
                if (!isCenter) {
                  goToSlide(idx);
                } else {
                  onSlideClick?.(slide, idx);
                }
              }}
              className={cn(
                "absolute h-[380px] w-[280px] sm:h-[440px] sm:w-[320px] md:h-[480px] md:w-[360px]",
                "cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl transition-all",
                isDragging ? "duration-0" : "duration-500 ease-out",
                isCenter ? "ring-2 ring-amber-500 ring-offset-4 ring-offset-neutral-950" : "filter brightness-75 hover:brightness-90"
              )}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              {/* Card Label Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                {slide.title && (
                  <h4 className="text-xl font-bold tracking-tight text-amber-400">
                    {slide.title}
                  </h4>
                )}
                {slide.subtitle && (
                  <p className="mt-1 text-sm text-neutral-300">
                    {slide.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Card Info / Metadata Box */}
      {currentSlide && (
        <div className="mx-auto mt-8 max-w-xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {currentSlide.title || "Featured Talent"}
            </span>
            {currentSlide.meta?.map((m, i) => (
              <React.Fragment key={i}>
                <span className="text-neutral-600">|</span>
                <span className="text-xs text-neutral-300">
                  <strong className="text-white">{m.value}</strong> {m.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Controls and Pagination */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous Slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-white shadow-lg transition-all hover:border-amber-500 hover:bg-neutral-800 disabled:opacity-30 disabled:hover:border-neutral-800 disabled:hover:bg-neutral-900"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Indicator Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-8 bg-amber-500"
                  : "w-2 bg-neutral-700 hover:bg-neutral-500"
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={activeIndex === totalSlides - 1}
          aria-label="Next Slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-white shadow-lg transition-all hover:border-amber-500 hover:bg-neutral-800 disabled:opacity-30 disabled:hover:border-neutral-800 disabled:hover:bg-neutral-900"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
