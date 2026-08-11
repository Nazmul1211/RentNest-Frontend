"use client";

import { useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85";

interface PropertyGalleryProps {
  images?: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const gallery = (images ?? []).filter(Boolean);
  const slides = gallery.length > 0 ? gallery : [fallbackImage];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/40 bg-muted shadow-sm">
        <img
          src={slides[activeIndex]}
          alt={`${title} image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 z-10 rounded-md bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur-md">
          {activeIndex + 1} / {slides.length} photos
        </div>
      </div>

      {slides.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {slides.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              aria-label={`Show photo ${index + 1} of ${slides.length}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`aspect-4/3 overflow-hidden rounded-lg border-2 bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeIndex === index
                  ? "border-primary"
                  : "border-transparent opacity-75 hover:border-primary/50 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
