import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Lock,
  MessageSquare,
  BadgeCheck,
  TrendingUp,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About RentNest - Direct Peer-to-Peer Rental Management Platform",
  description:
    "Learn how RentNest connects property owners and verified renters directly without middleman markups or recurring subscription risks.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-teal-500/20 selection:text-teal-600">
      {/* Hero Section with 3D Illustration */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-background via-teal-500/5 to-background border-b border-border/40">
        <div className="pointer-events-none absolute -top-24 left-1/3 size-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
                <Sparkles className="size-3.5 shrink-0" />
                <span>Direct Peer-to-Peer Rental Ecosystem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Revolutionizing how people <br />
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  rent & manage property.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                RentNest eliminates expensive broker fees, fragmented communication, and opaque security deposit terms. We empower tenants and property owners with direct management tools and verified authentic listings.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20" asChild>
                  <Link href="/properties">
                    Explore Listings
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl font-semibold border-teal-500/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10" asChild>
                  <Link href="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-border/40 text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-teal-500" />
                  <span>Verified Hosts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="size-4 text-teal-500" />
                  <span>Secure SSL Escrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-teal-500" />
                  <span>0% Renter Brokerage</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Panel */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative aspect-square w-full max-w-[420px] rounded-3xl overflow-hidden border border-teal-500/30 shadow-2xl shadow-teal-500/10 backdrop-blur-xl group">
                <Image
                  src="/images/about-hero.png"
                  alt="RentNest 3D Headquarters"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 border border-teal-500/30 backdrop-blur-md text-white text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-teal-400">
                    <span>RentNest Platform Trust</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="size-3.5" /> 100% Direct</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Connecting tenants & property managers directly across Bangladesh.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Platform Stats Section */}
      <section className="py-14 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-white border-y border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">100%</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Direct Peer Contact</div>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">৳0</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Renter Brokerage Fee</div>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">2,400+</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Verified Rental Spaces</div>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-300">4.9/5</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Community Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400">
            Our Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why RentNest Exists</h2>
          <p className="text-sm text-muted-foreground">
            A modern property management platform built on transparency, direct communication, and zero hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-card border border-border/60 shadow-xs space-y-4 hover:border-teal-500/40 hover:shadow-lg transition-all group">
            <div className="size-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 border border-teal-500/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="size-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Verified Listings & Users</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every property listing and user profile undergoes strict verification checks to guarantee authentic photographs, transparent prices, and legitimate ownership.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border/60 shadow-xs space-y-4 hover:border-teal-500/40 hover:shadow-lg transition-all group">
            <div className="size-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <HeartHandshake className="size-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Zero Middleman Markup</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Renters deal directly with property owners. No unexpected broker fees, no price inflation, and zero monthly subscription lock-ins.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border/60 shadow-xs space-y-4 hover:border-teal-500/40 hover:shadow-lg transition-all group">
            <div className="size-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Building2 className="size-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Role-Based Workspaces</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Dedicated, real-time dashboards tailored for Tenants (tracking applications & requests) and Landlords (managing listings & approving renters).
            </p>
          </div>
        </div>
      </section>

      {/* Security & Protection Section */}
      <section className="py-16 bg-muted/30 border-t border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built with Trust & Security First</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              We protect both sides of the rental transaction with industry-standard protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-card border border-border/50 space-y-2.5">
              <BadgeCheck className="size-6 text-teal-500" />
              <h4 className="font-bold text-sm">Host Identity Audit</h4>
              <p className="text-xs text-muted-foreground">All landlords verify NID & ownership documentation before listing.</p>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/50 space-y-2.5">
              <Lock className="size-6 text-teal-500" />
              <h4 className="font-bold text-sm">SSL Secure Payments</h4>
              <p className="text-xs text-muted-foreground">Rental booking deposits processed securely via SSLCommerz gateway.</p>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/50 space-y-2.5">
              <MessageSquare className="size-6 text-teal-500" />
              <h4 className="font-bold text-sm">Direct Messaging</h4>
              <p className="text-xs text-muted-foreground">Ask questions and negotiate lease terms directly with owners.</p>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/50 space-y-2.5">
              <FileCheck2 className="size-6 text-teal-500" />
              <h4 className="font-bold text-sm">Clear Agreement Terms</h4>
              <p className="text-xs text-muted-foreground">Standardized lease rules and transparent security deposit terms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Callout */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 p-8 sm:p-12 text-white border border-teal-500/30 shadow-2xl space-y-6">
          <div className="pointer-events-none absolute -top-24 -right-24 size-80 bg-teal-500/20 rounded-full blur-3xl" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ready to find or list your space?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join thousands of tenants and property owners saving time and eliminating broker fees on RentNest.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl px-8" asChild>
              <Link href="/properties">
                Explore Properties
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl font-semibold border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="/register">
                Create Free Account
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

