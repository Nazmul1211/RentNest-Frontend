"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap, Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";

export default function PricingSection() {
  // Rent calculator state (default 30,000 BDT)
  const [rentAmount, setRentAmount] = useState<number>(30000);
  const feeRate = 0.02; // 2% of first month rent
  const estimatedFee = Math.round(rentAmount * feeRate);

  const presetRents = [15000, 30000, 50000, 100000];

  return (
    <section className="relative bg-muted/20 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Zap className="size-3.5" />
            <span>Fair & Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Pricing based on property rent. <br className="hidden sm:inline" />
            <span className="text-primary">Zero monthly subscriptions.</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            We believe you shouldn&apos;t pay recurring fees just to hold a listing. Our pricing is strictly based on the actual rent of the property — you pay a small one-time fee only when a tenant signs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tenant Pricing Card */}
          <Card className="relative flex flex-col justify-between overflow-hidden rounded-xl border-border/35 bg-card shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader className="p-6 sm:p-8 border-b border-border/30 bg-muted/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">For Tenants</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">100% Free</span>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-foreground">৳0</span>
                <span className="text-sm font-medium text-muted-foreground">/ month forever</span>
              </div>
              <CardDescription className="mt-2 text-xs sm:text-sm text-muted-foreground">
                Search, apply, and move into your next home with absolutely zero platform charges.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-4 flex-1">
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span>Unlimited property searches & filters</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span>Direct landlord communication</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span>Instant online rental application submission</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span>No hidden booking or middleman fees</span>
                </li>
              </ul>
            </CardContent>

            <div className="p-6 sm:p-8 pt-0">
              <Link href="/properties" className="w-full inline-block">
                <Button variant="outline" className="w-full rounded-xl py-5 font-semibold cursor-pointer">
                  Browse Free Listings
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Landlord Pricing Card */}
          <Card className="relative flex flex-col justify-between overflow-hidden rounded-xl border-primary/35 bg-card shadow-md transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              Pay Only When Rented
            </div>

            <CardHeader className="p-6 sm:p-8 border-b border-border/30 bg-primary/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">For Landlords & Property Owners</span>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-foreground">2%</span>
                <span className="text-sm font-medium text-muted-foreground">of 1st month&apos;s rent (One-time)</span>
              </div>
              <CardDescription className="mt-2 text-xs sm:text-sm text-muted-foreground">
                No monthly subscription fees. You pay only when a rental request is approved and finalized.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-4 flex-1">
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span><strong>$0 Monthly Subscriptions</strong> — Keep listings live free</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span>Fee directly proportional to property rent amount</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span>Tenant management & rental request tracking</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span>Zero risk — if your property isn&apos;t rented, you pay $0</span>
                </li>
              </ul>
            </CardContent>

            <div className="p-6 sm:p-8 pt-0">
              <Link href="/dashboard/landlord/properties" className="w-full inline-block">
                <Button className="w-full rounded-xl py-5 font-semibold cursor-pointer shadow-sm">
                  List Your Property
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Rent Fee Estimator Widget */}
        <div className="mx-auto mt-14 max-w-3xl rounded-xl bg-card p-6 shadow-md ring-1 ring-border/35 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Calculator className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Interactive Rent-Based Fee Estimator</h3>
              <p className="text-xs text-muted-foreground">See exactly what you pay based on your monthly rent setting</p>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            {/* Rent Slider */}
            <div>
              <div className="flex justify-between items-center text-sm font-medium mb-2">
                <span className="text-muted-foreground">Monthly Property Rent:</span>
                <span className="text-lg font-extrabold text-foreground">৳{rentAmount.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="2500"
                value={rentAmount}
                onChange={(e) => setRentAmount(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
              />
              <div className="flex gap-2 mt-3">
                <span className="text-xs text-muted-foreground self-center mr-1">Quick select:</span>
                {presetRents.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setRentAmount(preset)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${rentAmount === preset
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                  >
                    ৳{(preset / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Fee Result Box */}
            <div className="grid grid-cols-1 gap-4 rounded-xl bg-muted/40 p-4 text-center sm:grid-cols-3">
              <div className="p-2">
                <span className="text-xs text-muted-foreground block mb-1">Monthly Subscription</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">৳0 / month</span>
              </div>
              <div className="p-2 border-t sm:border-t-0 sm:border-l border-border/40">
                <span className="text-xs text-muted-foreground block mb-1">One-Time Fee on Rent (2%)</span>
                <span className="text-lg font-extrabold text-primary">৳{estimatedFee.toLocaleString()}</span>
              </div>
              <div className="p-2 border-t sm:border-t-0 sm:border-l border-border/40">
                <span className="text-xs text-muted-foreground block mb-1">Cost If Vacant</span>
                <span className="text-lg font-bold text-foreground">৳0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
