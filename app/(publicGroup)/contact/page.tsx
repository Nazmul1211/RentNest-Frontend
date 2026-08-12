"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ContactAction from "../_actions/ContactAction";

const FAQS = [
  {
    q: "How quickly do landlords respond to rental inquiries?",
    a: "Landlords on RentNest receive instant SMS & email notifications. Most hosts reply to viewings and inquiries within 2 to 4 hours.",
  },
  {
    q: "Are security deposits paid securely online?",
    a: "Yes! Rental booking deposits are processed via SSLCommerz encrypted gateway and held securely until contract signing.",
  },
  {
    q: "How can property owners verify their listing?",
    a: "Landlords upload NID/Passport identification and property utility bills directly through their Landlord Dashboard for automated verification.",
  },
  {
    q: "Can I cancel a viewing or rental request?",
    a: "Yes, tenants can manage or cancel pending rental requests directly from their Tenant Dashboard under the 'My Requests' tab.",
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await ContactAction({
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      topic: String(formData.get("category") || "general"),
      message: String(formData.get("message") || ""),
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      toast.success("Message received! Our team will contact you shortly.");
      e.currentTarget.reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-teal-500/20 selection:text-teal-600">
      {/* Header */}
      <section className="relative overflow-hidden py-14 lg:py-16 bg-gradient-to-b from-teal-500/5 via-background to-background border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-xs font-semibold text-teal-600 dark:text-teal-400">
            <MessageSquare className="size-3.5" />
            <span>Contact Support</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            We&apos;re here to help
          </h1>

          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Have questions about a property listing, rental application, or platform features? Send us a message and we&apos;ll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 lg:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Get in touch</h2>

            <div className="space-y-3">
              <a
                href="mailto:support@rentnest.com"
                className="group flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card hover:border-teal-500/40 hover:shadow-xs transition-all"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground">Email</div>
                  <div className="text-sm font-medium text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    support@rentnest.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+8801700000000"
                className="group flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card hover:border-teal-500/40 hover:shadow-xs transition-all"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                  <Phone className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground">Phone</div>
                  <div className="text-sm font-medium text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    +880 1700-000000
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card">
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground">Office</div>
                  <div className="text-sm font-medium text-foreground">
                    Gulshan Avenue, Dhaka 1212
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Response Time: </span>
              Our support team monitors messages daily and typically responds within 2 hours during business operating hours.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8 rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="size-12 text-teal-500 mx-auto" />
                <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Thank you for reaching out. We have received your inquiry and will respond to your email address shortly.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-medium"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">Send a message</h3>
                  <p className="text-xs text-muted-foreground">Fill out the fields below and we&apos;ll get right back to you.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium">Your Name</Label>
                    <Input id="name" name="name" required placeholder="John Doe" className="h-10 text-sm rounded-xl" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium">Email Address</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@example.com" className="h-10 text-sm rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium">Phone Number (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+880 1700-000000" className="h-10 text-sm rounded-xl" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="category" className="text-xs font-medium">Topic</Label>
                    <select id="category" name="category" className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground focus:ring-2 focus:ring-teal-500">
                      <option value="general">General Question</option>
                      <option value="tenant">Tenant Application Help</option>
                      <option value="landlord">Landlord Listing Support</option>
                      <option value="billing">Payment & Deposit Issue</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-medium">Message</Label>
                  <Textarea id="message" name="message" rows={4} required placeholder="How can we help you?" className="text-sm rounded-xl" />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold h-10 px-6 rounded-xl gap-2 w-full sm:w-auto cursor-pointer"
                >
                  {loading ? "Sending..." : (
                    <>
                      <Send className="size-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-12 border-t border-border/40 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs text-muted-foreground">Quick answers to common inquiries.</p>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/60 bg-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`size-4 text-teal-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
