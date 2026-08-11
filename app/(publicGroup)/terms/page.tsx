import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, Lock, Scale, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service & Privacy Policy - RentNest",
  description: "Read RentNest's terms of service, platform rules, tenant-landlord conduct guidelines, and privacy practices.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-teal-500/20 selection:text-teal-600">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 lg:py-18 bg-gradient-to-b from-background via-teal-500/5 to-background border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
            <Scale className="size-3.5 shrink-0" />
            <span>Legal Documentation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Terms of Service & <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">Privacy Guidelines</span>
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Effective Date: August 2026. Please review our platform usage terms and data protection policies carefully.
          </p>
        </div>
      </section>

      {/* Main Legal Content Container */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm">
        
        {/* Section 1 */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-3 shadow-xs">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileText className="size-5 text-teal-600" /> 1. Platform Overview & User Agreement
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            RentNest operates as a direct peer-to-peer property listing and rental management platform connecting verified tenants with property managers and owners. By accessing or registering an account on RentNest, you agree to comply with all platform rules, terms, and applicable local tenancy regulations.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-3 shadow-xs">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="size-5 text-teal-600" /> 2. Landlord Listing Responsibilities
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Property owners and landlords agree that all listed property information, photos, amenities, availability statuses, and rental valuations represent authentic, truthful details. Landlords are prohibited from publishing misleading images, false rent amounts, or deceptive property conditions.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-3 shadow-xs">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Lock className="size-5 text-teal-600" /> 3. Data Protection & Privacy Practices
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We value your privacy. RentNest collects user information (Name, Email, Phone number, Profile Photo) solely for account verification, rental application management, and communication between property counterparties. We do not sell or trade personal data to third-party marketing brokers.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-3 shadow-xs">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Scale className="size-5 text-teal-600" /> 4. Rental Payments & Applications
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Rental requests and payment transactions processed through RentNest are logged for user transparency. Tenants and landlords are responsible for reviewing rental terms, move-in dates, and security deposit agreements prior to approving or submitting payment.
          </p>
        </div>

        <div className="pt-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" className="text-xs font-semibold text-teal-600" asChild>
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
          </Button>

          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs" asChild>
            <Link href="/contact">
              Have Legal Questions? Contact Us
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
