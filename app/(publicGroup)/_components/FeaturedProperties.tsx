"use server"

import Link from "next/link";
import { ArrowRight, Building } from "lucide-react";
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
    <section className="py-20 bg-background border-t border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Building className="size-3.5" />
              <span>Explore Homes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Handpicked Featured Places to Live
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Explore newly available, verified homes ready for immediate move-in across top locations.
            </p>
          </div>

          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            Browse All Properties
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((property) => (
            <div key={property.id} className="h-full">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}