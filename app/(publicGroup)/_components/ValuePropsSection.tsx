"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  MessageSquare,
  KeyRound,
  FilePlus,
  UserCheck,
  Percent,
  ArrowRight,
  Sparkles,
  Building2,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ValuePropsSection() {
  const [activeTab, setActiveTab] = useState<"tenants" | "landlords">("tenants");

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            <span>Direct & Effortless</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            How RentNest simplifies your rental journey
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Choose your role below to see how easy it is to find a place to live or manage your property listings.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="p-1.5 rounded-2xl bg-muted/60 border border-border/50 inline-flex gap-2">
            <button
              onClick={() => setActiveTab("tenants")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "tenants"
                  ? "bg-card text-foreground shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Renters & Tenants
            </button>
            <button
              onClick={() => setActiveTab("landlords")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "landlords"
                  ? "bg-card text-foreground shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Landlords & Owners
            </button>
          </div>
        </div>

        {/* 3-Step Process Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {activeTab === "tenants" ? (
            <>
              {/* Tenant Step 1 */}
              <div className="relative space-y-4 border-t-2 border-border/50 px-1 pt-6 transition-colors duration-300 hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Search className="size-6" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30">01</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Explore Verified Homes</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Search by location, rent budget, and property type. Every listing features transparent rent prices, exact security deposits, and real photos.
                </p>
                <div className="pt-2 text-xs font-semibold text-primary flex items-center gap-1">
                  100% Free Search <ArrowRight className="size-3" />
                </div>
              </div>

              {/* Tenant Step 2 */}
              <div className="relative space-y-4 border-t-2 border-border/50 px-1 pt-6 transition-colors duration-300 hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <MessageSquare className="size-6" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30">02</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Direct Landlord Request</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Submit rental requests directly to verified property owners. Ask questions, schedule visits, and negotiate terms without agent interference.
                </p>
                <div className="pt-2 text-xs font-semibold text-primary flex items-center gap-1">
                  Direct Contact <ArrowRight className="size-3" />
                </div>
              </div>

              {/* Tenant Step 3 */}
              <div className="relative space-y-4 border-t-2 border-border/50 px-1 pt-6 transition-colors duration-300 hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <KeyRound className="size-6" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30">03</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Move In Zero Markup</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Finalize your tenancy directly. Tenants pay $0 platform fees or application charges — your rent goes straight to your agreement.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  Zero Tenant Fees <ArrowRight className="size-3" />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Landlord Step 1 */}
              <div className="relative space-y-4 border-t-2 border-border/50 px-1 pt-6 transition-colors duration-300 hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <FilePlus className="size-6" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30">01</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Post Listing in 2 Mins</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Add your property details, set your monthly rent, upload photos, and publish. No upfront listing fees or subscription credit card required.
                </p>
                <div className="pt-2 text-xs font-semibold text-primary flex items-center gap-1">
                  $0 Upfront Cost <ArrowRight className="size-3" />
                </div>
              </div>

              {/* Landlord Step 2 */}
              <div className="relative space-y-4 border-t-2 border-border/50 px-1 pt-6 transition-colors duration-300 hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <UserCheck className="size-6" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30">02</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Review Tenant Requests</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Receive incoming tenant applications in your dashboard. Review tenant profiles, chat directly, and accept the tenant that fits your property best.
                </p>
                <div className="pt-2 text-xs font-semibold text-primary flex items-center gap-1">
                  Full Control <ArrowRight className="size-3" />
                </div>
              </div>

              {/* Landlord Step 3 */}
              <div className="relative space-y-4 border-t-2 border-border/50 px-1 pt-6 transition-colors duration-300 hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Percent className="size-6" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30">03</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Pay Only When Rented (2%)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Never pay monthly software subscriptions. Pay a small 2% fee strictly based on property rent only when a tenancy agreement is finalized.
                </p>
                <div className="pt-2 text-xs font-semibold text-primary flex items-center gap-1">
                  Zero Monthly Subscriptions <ArrowRight className="size-3" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* High-End Bottom Banner */}
        <div className="relative mt-16 flex flex-col items-center justify-between gap-8 overflow-hidden rounded-xl bg-foreground p-8 text-background shadow-xl sm:p-12 lg:flex-row dark:bg-card dark:text-foreground">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
              <Building2 className="size-4" /> Ready to get started?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Stop paying recurring monthly software fees to list properties.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Join hundreds of renters and property owners who communicate directly without middleman subscription markups.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link href="/properties" className="w-full sm:w-auto">
              <Button size="lg" className="w-full font-bold cursor-pointer rounded-xl shadow-md">
                <Home className="size-4 mr-2" />
                Browse Properties
              </Button>
            </Link>
            <Link href="/dashboard/landlord/properties" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full font-bold cursor-pointer rounded-xl bg-background/10 border-background/20 hover:bg-background/20 dark:bg-muted/40 text-foreground">
                List Property Now
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
