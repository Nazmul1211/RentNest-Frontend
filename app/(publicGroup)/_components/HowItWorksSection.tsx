import React from "react";
import { Search, MessageSquareCheck, KeyRound, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    number: "01",
    title: "Discover & Filter Verified Homes",
    description: "Search active rental listings across top neighborhoods. Filter by budget, property type, and verified owner credentials.",
    icon: Search,
    align: "left",
  },
  {
    number: "02",
    title: "Direct Owner Communication",
    description: "Connect directly with property managers and owners without broker markups. Schedule viewings and negotiate terms in real time.",
    icon: MessageSquareCheck,
    align: "right",
  },
  {
    number: "03",
    title: "Secure Move-In & Dashboard",
    description: "Reserve your rental space with SSL-encrypted deposit security and unlock your personalized role-based tenant dashboard.",
    icon: KeyRound,
    align: "left",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-muted/20 border-b border-border/40">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 bg-teal-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
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
          {/* Central Vertical Trunk Line */}
          <div className="absolute left-6 md:left-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-teal-500/10 via-teal-500/50 to-teal-500/10 -translate-x-1/2" />

          {/* Timeline Steps */}
          <div className="space-y-10 sm:space-y-14">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLeft = step.align === "left";

              return (
                <div key={idx} className="relative group">
                  {/* Desktop 3-Column Grid Layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                    {/* Column 1: Left Content or Spacer */}
                    <div>
                      {isLeft ? (
                        <div className="rounded-2xl border border-border/60 bg-card p-6 lg:p-8 shadow-xs hover:border-teal-500/40 hover:shadow-lg transition-all duration-300 space-y-2.5 text-right">
                          <div className="flex items-center justify-end">
                            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 px-2.5 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20">
                              Step {step.number}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Column 2: Central Icon Node on Trunk */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="size-14 rounded-2xl bg-card border-2 border-teal-500 text-teal-600 dark:text-teal-400 shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                        <Icon className="size-6 shrink-0" />
                      </div>
                    </div>

                    {/* Column 3: Right Content or Spacer */}
                    <div>
                      {!isLeft ? (
                        <div className="rounded-2xl border border-border/60 bg-card p-6 lg:p-8 shadow-xs hover:border-teal-500/40 hover:shadow-lg transition-all duration-300 space-y-2.5 text-left">
                          <div className="flex items-center justify-start">
                            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 px-2.5 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20">
                              Step {step.number}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout (< md) */}
                  <div className="md:hidden flex items-start gap-4 pl-0">
                    <div className="relative z-10 flex items-center justify-center shrink-0">
                      <div className="size-12 rounded-xl bg-card border-2 border-teal-500 text-teal-600 dark:text-teal-400 shadow-sm flex items-center justify-center">
                        <Icon className="size-5 shrink-0" />
                      </div>
                    </div>

                    <div className="flex-1 rounded-2xl border border-border/60 bg-card p-5 shadow-xs space-y-2">
                      <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 inline-block">
                        Step {step.number}
                      </span>
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
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md shadow-teal-500/20 cursor-pointer" asChild>
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
