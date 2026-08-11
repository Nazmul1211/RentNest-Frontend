"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Thank you! Your message has been received. Our team will contact you shortly.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-teal-500/20 selection:text-teal-600">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-b from-background via-teal-500/5 to-background border-b border-border/40">
        <div className="pointer-events-none absolute -top-24 left-1/3 size-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
            <MessageSquare className="size-3.5 shrink-0" />
            <span>We&apos;re Here to Help</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Get in touch with <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">RentNest</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have questions about listing a property, submitting a rental application, or technical support? Our team is available 7 days a week.
          </p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Contact Information Cards */}
          <div className="space-y-6 lg:col-span-1">
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-foreground">Contact Details</h3>
              <p className="text-xs text-muted-foreground">Reach out to us directly or drop by our central office.</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-xs flex items-start gap-4">
                <div className="size-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 shrink-0 border border-teal-500/20">
                  <Mail className="size-5" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <h4 className="font-bold text-foreground">Email Us</h4>
                  <p className="text-muted-foreground">support@rentnest.com</p>
                  <p className="text-[11px] text-teal-600 font-medium">Response within 2 hours</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-xs flex items-start gap-4">
                <div className="size-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 shrink-0 border border-teal-500/20">
                  <Phone className="size-5" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <h4 className="font-bold text-foreground">Call Us Hotline</h4>
                  <p className="text-muted-foreground">+880 1700-000000</p>
                  <p className="text-[11px] text-muted-foreground">Sun - Thu: 9:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-xs flex items-start gap-4">
                <div className="size-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 shrink-0 border border-teal-500/20">
                  <MapPin className="size-5" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <h4 className="font-bold text-foreground">Head Office</h4>
                  <p className="text-muted-foreground">Gulshan Avenue, Block C, Dhaka 1212</p>
                  <p className="text-[11px] text-muted-foreground">Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/40 rounded-2xl border border-border/40 space-y-2 text-xs">
              <h4 className="font-bold text-foreground flex items-center gap-1.5">
                <Clock className="size-4 text-teal-600" /> Business Working Hours
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Our automated rental application system is online 24/7. Customer support teams monitor inquiries daily.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1 pb-4 border-b border-border/40">
              <h3 className="text-xl font-bold text-foreground">Send Us a Message</h3>
              <p className="text-xs text-muted-foreground">Fill out the form below and our team will get back to you promptly.</p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl">
                <CheckCircle className="size-12 text-teal-600 mx-auto" />
                <h4 className="text-lg font-bold text-foreground">Message Sent Successfully!</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Thank you for reaching out to RentNest. One of our support representatives will respond to your inquiry at your provided email address.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold border-teal-500/30 text-teal-600"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="font-bold text-foreground">Your Full Name <span className="text-rose-500">*</span></Label>
                    <Input id="contact-name" type="text" required placeholder="John Doe" className="h-10 text-xs focus-visible:ring-teal-500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="font-bold text-foreground">Email Address <span className="text-rose-500">*</span></Label>
                    <Input id="contact-email" type="email" required placeholder="john@example.com" className="h-10 text-xs focus-visible:ring-teal-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone" className="font-bold text-foreground">Phone Number</Label>
                    <Input id="contact-phone" type="tel" placeholder="+880 1700-000000" className="h-10 text-xs focus-visible:ring-teal-500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-category" className="font-bold text-foreground">Inquiry Category</Label>
                    <select id="contact-category" className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground focus:ring-2 focus:ring-teal-500">
                      <option value="general">General Question</option>
                      <option value="tenant">Tenant Application Help</option>
                      <option value="landlord">Landlord Property Listing</option>
                      <option value="billing">Payment & Deposit Issue</option>
                      <option value="partnership">Business Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="font-bold text-foreground">Message / Details <span className="text-rose-500">*</span></Label>
                  <Textarea id="contact-message" rows={5} required placeholder="How can we assist you today?" className="text-xs focus-visible:ring-teal-500" />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs h-10 px-8 rounded-xl gap-2 w-full sm:w-auto"
                >
                  {loading ? "Sending Message..." : (
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
    </div>
  );
}
