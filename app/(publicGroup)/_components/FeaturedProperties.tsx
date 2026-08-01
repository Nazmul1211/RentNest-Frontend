import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import PropertyCard, { Property } from "./PropertyCard";

export default async function FeaturedProperties() {
  let featured: Property[] = [];

  try {
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/properties`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60, // cache for 1 hour
      },
    });
    
    if (res.ok) {
      const result = await res.json();
      const properties: Property[] = result.data || [];
      // Take the top 3 available & unpaid properties as featured
      featured = properties
        .filter((p) => {
          if (p.isAvailable === false) return false;
          if (Array.isArray(p.rentalRequests)) {
            return !p.rentalRequests.some((req: any) => {
              const s = req?.status?.toUpperCase();
              return s === "PAID" || s === "COMPLETED";
            });
          }
          return true;
        })
        .slice(0, 3);
    }
  } catch (error) {
    console.error("Error fetching featured properties:", error);
  }

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-border/40 mt-10">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Star className="size-4 fill-primary text-primary" />
            <span>Featured Listings</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Explore Handpicked Properties
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Take a look at some of our top rated and newly available properties in premium locations.
          </p>
        </div>

        <Link
          href="/properties"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors mt-4 md:mt-0"
        >
          View All Properties
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featured.map((property) => (
          <div key={property.id} className="h-full">
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </section>
  );
}