import React from "react";
import { Search, MessageSquareCheck, KeyRound, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    number: "01",
    title: "Discover & Filter Verified Homes",
    description: "Search active rental listings across top neighborhoods. Filter by budget, property type, and verified owner credentials.",
    icon: Search,
    align: "left",
    tag: "Find Space",
  },
  {
    number: "02",
    title: "Direct Owner Communication",
    description: "Connect directly with property managers and owners without broker markups. Schedule viewings and negotiate terms in real time.",
    icon: MessageSquareCheck,
    align: "right",
    tag: "Zero Broker Fee",
  },
  {
    number: "03",
    title: "Secure Move-In & Dashboard",
    description: "Reserve your rental space with SSL-encrypted deposit security and unlock your personalized role-based tenant dashboard.",
    icon: KeyRound,
    align: "left",
    tag: "Instant Keys",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background via-teal-500/5 to-background border-b border-border/40">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 bg-teal-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/15 border border-teal-600/30 text-xs font-bold text-teal-950 dark:text-teal-300 shadow-xs">
            <Sparkles className="size-3.5 text-teal-600 dark:text-teal-400" />
            <span>✦ Simple 3-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            How RentNest Works
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            From discovering listings to receiving your keys — an effortless peer-to-peer rental workflow.
          </p>
        </div>

        {/* Tree-Style Vertical Timeline Container */}
        <div className="relative">
          {/* Animated Glowing Central Vertical Trunk Line */}
          <div className="absolute left-6 md:left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-teal-500/20 via-teal-500 to-teal-500/20 shadow-[0_0_12px_rgba(20,184,166,0.6)] -translate-x-1/2 animate-pulse-glow" />

          {/* Timeline Steps */}
          <div className="space-y-12 sm:space-y-16">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLeft = step.align === "left";

              return (
                <div key={idx} className="relative group">
                  {/* Desktop 3-Column Grid Layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
                    
                    {/* Column 1: Left Content Card or Spacer */}
                    <div>
                      {isLeft ? (
                        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 lg:p-8 shadow-xs hover:border-teal-500/60 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 group-hover:-translate-y-1 text-right">
                          {/* Hover spotlight overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="relative z-10 space-y-3">
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                                {step.tag}
                              </span>
                              <span className="text-xs font-mono font-extrabold text-white bg-teal-600 dark:bg-teal-500 px-2.5 py-0.5 rounded-lg shadow-xs">
                                Step {step.number}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Column 2: Central Animated Node on Trunk */}
                    <div className="relative z-10 flex items-center justify-center">
                      {/* Outer Pulse Radar Ring */}
                      <div className="absolute size-16 rounded-2xl bg-teal-500/20 animate-ping opacity-75 pointer-events-none" />
                      
                      {/* Glowing Node Backdrop Aura */}
                      <div className="absolute size-16 rounded-2xl bg-teal-500/20 border border-teal-500/40 blur-sm group-hover:scale-125 transition-transform duration-500" />

                      {/* Main Interactive Icon Node */}
                      <div className="relative size-14 rounded-2xl bg-card border-2 border-teal-500 text-teal-600 dark:text-teal-400 shadow-lg shadow-teal-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-400 transition-all duration-500 cursor-pointer">
                        <Icon className="size-6 shrink-0 animate-float" />
                      </div>
                    </div>

                    {/* Column 3: Right Content Card or Spacer */}
                    <div>
                      {!isLeft ? (
                        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 lg:p-8 shadow-xs hover:border-teal-500/60 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 group-hover:-translate-y-1 text-left">
                          {/* Hover spotlight overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="relative z-10 space-y-3">
                            <div className="flex items-center justify-start gap-2">
                              <span className="text-xs font-mono font-extrabold text-white bg-teal-600 dark:bg-teal-500 px-2.5 py-0.5 rounded-lg shadow-xs">
                                Step {step.number}
                              </span>
                              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                                {step.tag}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                  </div>

                  {/* Mobile Layout (< md) */}
                  <div className="md:hidden flex items-start gap-4 pl-0">
                    <div className="relative z-10 flex items-center justify-center shrink-0">
                      <div className="size-12 rounded-xl bg-card border-2 border-teal-500 text-teal-600 dark:text-teal-400 shadow-md flex items-center justify-center">
                        <Icon className="size-5 shrink-0" />
                      </div>
                    </div>

                    <div className="flex-1 rounded-2xl border border-border/70 bg-card p-5 shadow-xs space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-extrabold text-white bg-teal-600 px-2 py-0.5 rounded shadow-xs">
                          Step {step.number}
                        </span>
                        <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase">
                          {step.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-6">
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/25 cursor-pointer hover:scale-105 transition-all duration-300" asChild>
            <Link href="/properties">
              Explore Active Listings
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
