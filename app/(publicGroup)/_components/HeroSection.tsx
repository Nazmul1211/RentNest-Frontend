"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building2,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";


export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("query", searchTerm.trim());
    if (propertyType && propertyType !== "all") params.set("category", propertyType);

    window.location.href = `/properties?${params.toString()}`;
  };


  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 size-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-1/2 right-10 size-80 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Direct Copy & Search */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Direct Value Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5 shrink-0" />
              <span>Direct Rental Marketplace • Zero Monthly Subscriptions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Find your next space. <br />
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Without middleman markup.
              </span>
            </h1>

            {/* Human Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Connect directly with verified property owners and tenants. Search active rental listings or publish yours with zero recurring subscription risk.
            </p>

            {/* Integrated Search Box */}
            <form
              onSubmit={handleSearch}
              className="p-2 sm:p-2.5 rounded-2xl bg-card border border-border/60 shadow-lg shadow-foreground/5 max-w-2xl flex flex-col sm:flex-row items-stretch gap-2"
            >
              {/* Location Input */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40 focus-within:bg-background focus-within:border-primary/40 transition-all">
                <MapPin className="size-4 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="City, area, or neighborhood..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
              </div>

              {/* Property Type Dropdown */}
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40 shrink-0">
                <Building2 className="size-4 text-primary shrink-0" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
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
                className="rounded-xl px-6 font-bold shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
              >
                <Search className="size-4 mr-1.5" />
                Search
              </Button>
            </form>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" />
                <span>100% Free for Tenants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" />
                <span>Pay Only When Rented</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" />
                <span>Direct Landlord Contact</span>
              </div>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-4 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="size-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary">
                  RA
                </div>
                <div className="size-8 rounded-full bg-emerald-500/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  NH
                </div>
                <div className="size-8 rounded-full bg-teal-500/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-teal-600 dark:text-teal-400">
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
                <span className="text-muted-foreground">Trusted by verified renters & owners</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Interactive Feature Card Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Stacked Showcase Card container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Decorative Card 1 (Back Glow Card) */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-primary/10 border border-primary/20 -z-10" />

              {/* Main Visual Showcase Card */}
              <div className="rounded-3xl bg-card border border-border/70 p-5 shadow-2xl shadow-foreground/5 space-y-4">

                {/* Image & Badges */}
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                    alt="Luxury Modern Apartment"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white text-[11px] font-bold shadow-xs backdrop-blur-xs">
                      Available Now
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-background/80 text-foreground text-[11px] font-semibold backdrop-blur-md">
                      Apartment
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md">
                    ৳35,000 <span className="text-[11px] font-normal opacity-90">/ mo</span>
                  </div>
                </div>

                {/* Card Title & Location */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-semibold mb-1">
                    <ShieldCheck className="size-3.5" />
                    <span>Verified Listing • Gulshan 2, Dhaka</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground">Modern 3-Bedroom Executive Apartment</h3>
                </div>

                {/* Simulated Direct Chat Bubble */}
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/40 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="size-3 text-primary" />
                      Direct Landlord Chat
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">Online</span>
                  </div>
                  <div className="bg-card p-2.5 rounded-xl border border-border/30 text-xs text-foreground shadow-2xs">
                    <p className="font-medium text-primary text-[11px] mb-0.5">Tenant Request:</p>
                    <p className="text-muted-foreground">"Can I schedule a walkthrough visit tomorrow at 4 PM?"</p>
                  </div>
                  <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20 text-xs text-foreground shadow-2xs">
                    <p className="font-medium text-primary text-[11px] mb-0.5">Verified Landlord:</p>
                    <p className="text-foreground">"Absolutely! I will meet you directly at the property."</p>
                  </div>
                </div>

                {/* Floating Bottom Pill */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs">
                  <span className="text-muted-foreground font-medium">Platform Subscription Fee:</span>
                  <span className="font-bold text-primary text-sm">৳0 / month</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
