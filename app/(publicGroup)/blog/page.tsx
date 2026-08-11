import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, User, Clock, ArrowRight, Sparkles, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "RentNest Insights & Blog - Tenant & Landlord Rental Guides",
  description:
    "Expert tips, real estate trends, neighborhood spotlights, and rental advice for property owners and tenants.",
};

const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Crucial Things to Check Before Signing a Rental Agreement in Dhaka",
    slug: "tips-before-signing-rental-agreement",
    category: "Tenant Guide",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    author: "Nafis Rahman",
    summary:
      "Avoid hidden utility charges and deposit disputes. Here are the 5 non-negotiable clauses every tenant must review before making an advance payment.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "How Landlords Can Maximize Property Rental Yield in 2026",
    slug: "landlord-maximize-rental-yield",
    category: "Landlord Tips",
    date: "Aug 04, 2026",
    readTime: "7 min read",
    author: "Farhana Ahmed",
    summary:
      "Simple renovations, high-speed connectivity, and verified tenant screening can increase your monthly rental valuation by up to 25%.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Neighborhood Spotlight: Why Gulshan & Banani Remain Top Choices",
    slug: "neighborhood-spotlight-gulshan-banani",
    category: "Area Insights",
    date: "Jul 28, 2026",
    readTime: "4 min read",
    author: "Tanvir Hossain",
    summary:
      "An in-depth look at amenities, security levels, transit links, and average rental rates across Dhaka's premier residential hubs.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Understanding Direct P2P Renting vs. Traditional Brokerage",
    slug: "p2p-renting-vs-traditional-brokerage",
    category: "Platform",
    date: "Jul 18, 2026",
    readTime: "6 min read",
    author: "RentNest Editorial",
    summary:
      "Learn how direct communication between tenants and property managers reduces transaction friction, eliminates broker fees, and builds long-term trust.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-teal-500/20 selection:text-teal-600">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-b from-background via-teal-500/5 to-background border-b border-border/40">
        <div className="pointer-events-none absolute -top-24 left-1/3 size-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
            <BookOpen className="size-3.5 shrink-0" />
            <span>RentNest Knowledge Base</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Rental Insights & <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">Market Guides</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Stay updated with real estate trends, renter rights, landlord management tips, and neighborhood breakdowns across Bangladesh.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-card rounded-2xl border border-border/60 overflow-hidden shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image Cover */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-md font-bold text-xs">
                      <Tag className="size-3 mr-1 text-teal-600" /> {post.category}
                    </Badge>
                  </div>
                </div>

                {/* Article Content */}
                <div className="px-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5 text-teal-600" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5 text-teal-600" /> {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="size-3.5 text-teal-600" /> {post.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-teal-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-border/40 mt-4">
                <Button variant="ghost" size="sm" className="text-xs font-bold text-teal-600 hover:text-teal-700 p-0 h-auto gap-1" asChild>
                  <Link href="/properties">
                    Read Article <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Callout */}
        <div className="p-8 bg-card border border-border/60 rounded-2xl text-center max-w-3xl mx-auto space-y-4 shadow-xs">
          <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 mx-auto">
            <Sparkles className="size-6" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Subscribe to Rental Market Trends</h3>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            Get the latest property listings, legal rental updates, and landlord advice delivered straight to your inbox once a month.
          </p>
        </div>
      </section>
    </div>
  );
}
