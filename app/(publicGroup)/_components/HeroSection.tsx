"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Star,
  ChevronDown,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedSlide {
  id: string;
  title: string;
  location: string;
  type: string;
  price: string;
  image: string;
  badge: string;
}

const HERO_SLIDES: FeaturedSlide[] = [
  {
    id: "slide-1",
    title: "Modern 3-Bedroom Executive Apartment",
    location: "Gulshan 2, Dhaka",
    type: "Apartment",
    price: "৳35,000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    badge: "Available Now",
  },
  {
    id: "slide-2",
    title: "Spacious Duplex Family Villa",
    location: "Uttara Sector 4, Dhaka",
    type: "House",
    price: "৳65,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    badge: "Verified Owner",
  },
  {
    id: "slide-3",
    title: "Skyline Views Penthouse Suite",
    location: "Banani, Dhaka",
    type: "Penthouse",
    price: "৳90,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    badge: "Featured Unit",
  },
];

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const activeSlide = HERO_SLIDES[activeSlideIndex];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("query", searchTerm.trim());
    if (propertyType && propertyType !== "all") params.set("category", propertyType);

    window.location.href = `/properties?${params.toString()}`;
  };

  const scrollToNextSection = () => {
    const categoryElem = document.getElementById("property-categories");
    if (categoryElem) {
      categoryElem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="rentnest-hero relative overflow-hidden bg-gradient-to-b from-background via-teal-500/5 to-background py-14 sm:py-16 lg:py-20 border-b border-border/40">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 size-96 bg-teal-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow" />
      <div className="pointer-events-none absolute top-1/2 right-10 size-80 bg-teal-500/5 rounded-full blur-3xl -z-10 animate-pulse-glow" />

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12">

          {/* Left Column: Headline & Direct Search CTA */}
          <div className="space-y-3 text-left sm:space-y-5 lg:col-span-7">
            {/* Value Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/15 px-3 py-1.5 text-[11px] font-bold text-teal-800 dark:text-teal-400 sm:px-3.5 sm:text-xs max-[380px]:hidden">
              <Sparkles className="size-3.5 shrink-0 text-teal-700 dark:text-teal-400" />
              <span>Direct Rental Marketplace • Zero Monthly Subscriptions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground max-[380px]:text-[1.65rem] sm:text-4xl lg:text-5xl">
              Find your next space. <br />
              <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Without middleman markup.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground max-[380px]:text-[13px] sm:text-base">
              Connect directly with verified property owners and tenants. Search active rental listings or publish yours with zero recurring subscription risk.
            </p>

            {/* Integrated Search Box */}
            <form
              onSubmit={handleSearch}
              className="p-2 rounded-2xl bg-card border border-border/60 shadow-lg shadow-foreground/5 max-w-2xl flex flex-col sm:flex-row items-stretch gap-2"
            >
              {/* Location Input */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-muted/30 border border-border/40 focus-within:bg-background focus-within:border-teal-500/50 transition-all">
                <MapPin className="size-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <input
                  type="text"
                  placeholder="City, area, or neighborhood..."
                  aria-label="City, area, or neighborhood"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
              </div>

              {/* Property Type Dropdown */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/30 border border-border/40 shrink-0">
                <Building2 className="size-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  aria-label="Property type"
                  className="bg-transparent text-xs sm:text-sm font-medium text-foreground focus:outline-none cursor-pointer pr-1"
                >
                  <option value="all" className="bg-card text-foreground">All Types</option>
                  <option value="a2c49963-308b-478c-9f42-262edff5e996" className="bg-card text-foreground">Apartment</option>
                  <option value="36788eab-f75e-488c-8120-8252fab6c49c" className="bg-card text-foreground">House</option>
                  <option value="55f0ad3b-fddf-4586-b96d-78eb49c286f9" className="bg-card text-foreground">Penthouse</option>
                </select>
              </div>

              {/* Search Button */}
              <Button
                type="submit"
                size="lg"
                className="rounded-xl px-5 bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-sm transition-all cursor-pointer shrink-0"
              >
                <Search className="size-4 mr-1.5" />
                Search
              </Button>
            </form>

            {/* Quick Feature Pills */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs font-medium text-muted-foreground max-[380px]:hidden">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-teal-600 dark:text-teal-400" />
                <span>100% Free for Tenants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-teal-600 dark:text-teal-400" />
                <span>Pay Only When Rented</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-teal-600 dark:text-teal-400" />
                <span>Direct Landlord Contact</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="hidden items-center gap-3 pt-1 sm:flex">
              <div className="flex -space-x-2">
                <div className="size-7 rounded-full bg-teal-500/20 border-2 border-background flex items-center justify-center text-[9px] font-bold text-teal-600 dark:text-teal-400">
                  RA
                </div>
                <div className="size-7 rounded-full bg-emerald-500/20 border-2 border-background flex items-center justify-center text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  NH
                </div>
                <div className="size-7 rounded-full bg-amber-500/20 border-2 border-background flex items-center justify-center text-[9px] font-bold text-amber-600 dark:text-amber-400">
                  SK
                </div>
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3 fill-amber-500" />
                  ))}
                  <span className="font-bold text-foreground ml-1">4.9/5</span>
                </div>
                <span className="text-muted-foreground text-[11px]">Trusted by verified renters & owners</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Rental Showcase Slider */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto max-w-md animate-float">

              {/* Decorative Back Card Glow */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-teal-500/10 border border-teal-500/20 -z-10 transition-all" />

              {/* Interactive Slide Showcase Card */}
              <div className="space-y-3 rounded-3xl border border-border/70 bg-card p-4 shadow-xl shadow-foreground/5">

                {/* Slider Image & Overlay Badges */}
                <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-muted group">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 flex gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/90 text-white text-[10px] font-bold shadow-xs backdrop-blur-xs flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-white animate-pulse" />
                      {activeSlide.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-background/80 text-foreground text-[10px] font-semibold backdrop-blur-md">
                      {activeSlide.type}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-teal-600 text-white text-xs font-extrabold shadow-md">
                    {activeSlide.price} <span className="text-[10px] font-normal opacity-90">/ mo</span>
                  </div>
                </div>

                {/* Property Meta */}
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-teal-600 dark:text-teal-400 font-semibold mb-0.5">
                    <ShieldCheck className="size-3.5" />
                    <span>Verified Listing • {activeSlide.location}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground truncate">{activeSlide.title}</h3>
                </div>

                {/* Interactive Slider Indicators / Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    {HERO_SLIDES.map((slide, index) => (
                      <button
                        key={slide.id}
                        onClick={() => {
                          setActiveSlideIndex(index);
                          setIsAutoPlaying(false);
                        }}
                        aria-label={`Show slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          index === activeSlideIndex
                            ? "w-6 bg-teal-600"
                            : "w-2 bg-border hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAutoPlaying((playing) => !playing)}
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={isAutoPlaying ? "Pause featured listings slideshow" : "Play featured listings slideshow"}
                    aria-pressed={isAutoPlaying}
                  >
                    {isAutoPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  </button>

                  <Link
                    href="/properties"
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 dark:text-teal-400 flex items-center gap-0.5 hover:underline"
                  >
                    <span>View Listing</span>
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Clear Visual Flow Indicator to Next Section */}
      <div className="w-full pt-1 text-center">
        <button
          onClick={scrollToNextSection}
          className="inline-flex flex-col items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-teal-600 transition-all cursor-pointer group"
          aria-label="Scroll down to browse categories"
        >
          <span className="hidden sm:inline">Scroll to explore categories & listings</span>
          <ChevronDown className="size-4 animate-bounce text-teal-600 dark:text-teal-400" />
        </button>
      </div>
    </section>
  );
}
