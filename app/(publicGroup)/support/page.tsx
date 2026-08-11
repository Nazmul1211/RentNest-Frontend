"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, Search, ChevronDown, ChevronUp, FileText, UserCheck, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FAQS = [
  {
    category: "Tenants & Applicants",
    items: [
      {
        question: "How do I apply for a rental property on RentNest?",
        answer:
          "Browse listings under the Properties tab, select your preferred home, and click 'Request Rental'. Enter your proposed move-in and move-out dates, add a message for the landlord, and submit your request directly.",
      },
      {
        question: "Are there any hidden broker or middleman fees for tenants?",
        answer:
          "No! RentNest is completely free for tenants. You connect directly with property owners and landlords without paying any agency commission or recurring subscription fees.",
      },
      {
        question: "How do lease payments work on RentNest?",
        answer:
          "Once a landlord approves your rental application, you can execute payments directly through our secure payment checkout integration. Your payment status updates automatically in your tenant dashboard.",
      },
    ],
  },
  {
    category: "Landlords & Property Owners",
    items: [
      {
        question: "How do I list my property for rent?",
        answer:
          "Sign in to your Landlord account, navigate to your workspace dashboard, and click 'Create Property'. Upload high-resolution photos, set the rent amount, address, and amenities, and publish instantly.",
      },
      {
        question: "Can I review tenant applications before accepting?",
        answer:
          "Yes! All incoming applications appear in your Landlord Rental Requests dashboard. You can review tenant profiles, read applicant messages, and click 'Approve' or 'Reject' with optional landlord notes.",
      },
      {
        question: "How do I delete or update a published listing?",
        answer:
          "Visit your 'My Properties' dashboard list. Each listing features options to edit details or delete the property with a confirmation modal.",
      },
    ],
  },
  {
    category: "Account & Security",
    items: [
      {
        question: "How do I update my profile details or avatar photo?",
        answer:
          "Click on your profile icon in the top navbar dropdown or sidebar menu and select 'My Profile & Settings'. You can edit your name, phone number, and avatar image link directly.",
      },
      {
        question: "Is my personal contact information kept secure?",
        answer:
          "Yes! RentNest uses JWT session encryption and secure data handling to protect user credentials and privacy.",
      },
    ],
  },
];

export default function SupportPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-teal-500/20 selection:text-teal-600">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-b from-background via-teal-500/5 to-background border-b border-border/40">
        <div className="pointer-events-none absolute -top-24 left-1/3 size-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
            <HelpCircle className="size-3.5 shrink-0" />
            <span>Help Center & FAQ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            How can we <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">help you today?</span>
          </h1>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics (e.g. applications, listing property, payments)..."
              className="pl-12 h-12 text-xs font-medium rounded-2xl bg-card border-border/80 shadow-sm focus-visible:ring-teal-500"
            />
          </div>
        </div>
      </section>

      {/* FAQ Category Lists */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {FAQS.map((cat, catIdx) => {
          const filteredItems = cat.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={catIdx} className="space-y-4">
              <h2 className="text-xl font-bold text-foreground border-b border-border/40 pb-2">
                {cat.category}
              </h2>

              <div className="space-y-3">
                {filteredItems.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = Boolean(openItems[key]);

                  return (
                    <div
                      key={itemIdx}
                      className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(key)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-foreground hover:text-teal-600 transition-colors"
                      >
                        <span>{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="size-4 text-teal-600 shrink-0" />
                        ) : (
                          <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Contact Support Banner */}
        <div className="p-8 bg-card border border-border/60 rounded-2xl text-center space-y-4 shadow-xs">
          <h3 className="text-2xl font-bold text-foreground">Still have questions?</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our dedicated support team.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl" asChild>
              <Link href="/contact">
                <Mail className="size-4 mr-2" /> Contact Support Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
