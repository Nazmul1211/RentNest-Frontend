import React from "react";
import { Star, Quote, CheckCircle2, Building, UserCheck } from "lucide-react";

const REVIEWS = [
  {
    name: "Tanvir Ahmed",
    role: "Tenant in Gulshan, Dhaka",
    badge: "Verified Tenant",
    type: "TENANT",
    comment:
      "Saved over ৳20,000 in agent fees! I found a verified 2-bedroom apartment directly from the owner within 3 days. The process was super smooth.",
    rating: 5,
    location: "Gulshan 2, Dhaka",
  },
  {
    name: "Dr. Farhana Yasmin",
    role: "Landlord in Dhanmondi",
    badge: "Verified Host",
    type: "LANDLORD",
    comment:
      "Listing my property on RentNest was completely free of subscription pressure. I received inquiries from verified tenants and finalized a lease within a week.",
    rating: 5,
    location: "Dhanmondi, Dhaka",
  },
  {
    name: "Sajid Hasan",
    role: "Tenant in Banani",
    badge: "Verified Tenant",
    type: "TENANT",
    comment:
      "The role-based dashboard makes tracking my rental application status crystal clear. Zero hidden terms and genuine apartment photos!",
    rating: 5,
    location: "Banani, Dhaka",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-background border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
            <span>✦ Community Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Loved by Renters & Landlords
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            See how RentNest is transforming property renting across Bangladesh.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-border/60 bg-card p-7 shadow-xs hover:border-teal-500/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="size-6 text-teal-500/30 group-hover:text-teal-500/60 transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* User Details */}
              <div className="pt-5 mt-6 border-t border-border/40 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="size-3.5 text-teal-500 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-muted-foreground">{rev.role}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-[10px] font-bold text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  {rev.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
