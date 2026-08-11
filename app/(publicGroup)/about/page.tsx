import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, Users, Sparkles, ArrowRight, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About RentNest - Direct Peer-to-Peer Rental Management Platform",
  description:
    "Learn how RentNest connects property owners and verified renters directly without middleman markups or recurring subscription risks.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-teal-500/20 selection:text-teal-600">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-background via-teal-500/5 to-background border-b border-border/40">
        <div className="pointer-events-none absolute -top-24 left-1/3 size-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
            <Sparkles className="size-3.5 shrink-0" />
            <span>Direct Peer-to-Peer Rental Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Revolutionizing how people <br />
            <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              rent & manage property.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            RentNest was created to eliminate expensive middleman fees, fragmented communication, and opaque security deposits. We empower tenants and property owners with direct tools and verified listings.
          </p>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Why RentNest Exists</h2>
          <p className="text-sm text-muted-foreground">
            A rental management platform built for transparency, convenience, and absolute clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-xs space-y-4 hover:border-teal-500/40 transition-all">
            <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <ShieldCheck className="size-6" />
            </div>
            <h3 className="text-lg font-bold">Verified Listings & Users</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every property listing and user account undergoes verification checks to ensure reliable transactions, authentic images, and honest pricing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-xs space-y-4 hover:border-teal-500/40 transition-all">
            <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <HeartHandshake className="size-6" />
            </div>
            <h3 className="text-lg font-bold">Zero Middleman Markup</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Renters connect directly with property managers and owners. No hidden broker fees, no arbitrary price inflations, and zero subscription trap.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-xs space-y-4 hover:border-teal-500/40 transition-all">
            <div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Building2 className="size-6" />
            </div>
            <h3 className="text-lg font-bold">Seamless Management</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Integrated dashboards for landlords to track rental requests, list spaces, manage tenants, and monitor performance in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Stats Section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">100%</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Direct Contact</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">৳0</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Renter Fee</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">2,400+</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Verified Rentals</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-300">4.9/5</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Callout */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Ready to find or list your space?</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Join thousands of tenants and property owners already saving time and money on RentNest.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl" asChild>
            <Link href="/properties">
              Explore Properties
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-xl font-semibold" asChild>
            <Link href="/register">
              Create Account
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
