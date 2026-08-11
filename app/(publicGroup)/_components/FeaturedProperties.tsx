
import Link from "next/link";
import { ArrowRight, Building } from "lucide-react";
import PropertyCard, { Property } from "./PropertyCard";
import { GetProperties } from "../_actions/GetProperties";

function PropertyCardSkeleton() {
  return (
    <div className="min-h-[480px] animate-pulse overflow-hidden rounded-xl border border-border/35 bg-card shadow-sm">
      <div className="aspect-16/10 bg-muted/70" />
      <div className="space-y-4 p-5">
        <div className="h-3 w-2/5 rounded bg-muted" />
        <div className="h-5 w-4/5 rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-3 rounded bg-muted" />
          <div className="h-3 w-3/4 rounded bg-muted" />
        </div>
        <div className="grid grid-cols-3 divide-x divide-border/35 border-y border-border/35 py-3">
          {[0, 1, 2].map((item) => <div key={item} className="mx-auto h-8 w-10 rounded bg-muted" />)}
        </div>
        <div className="h-10 rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export function FeaturedPropertiesSkeleton() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="h-9 w-2/3 max-w-xl animate-pulse rounded bg-muted" />
          <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-muted" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {[0, 1, 2].map((item) => <PropertyCardSkeleton key={item} />)}
        </div>
      </div>
    </section>
  );
}

export default async function FeaturedProperties() {
  let featured: Property[] = [];

  try {
    const properties: Property[] = await GetProperties();

    if (Array.isArray(properties)) {
      featured = properties
        .filter((p) => {
          if (!p) return false;
          if (p.isAvailable === false || p.status === "RENTED" || p.status === "BOOKED") {
            return false;
          }

          const forbiddenStatuses = ["APPROVED", "PAID", "COMPLETED"];

          if (Array.isArray(p.rentalRequests)) {
            return !p.rentalRequests.some((req) => {
              const status = req?.status?.toUpperCase();
              return forbiddenStatuses.includes(status);
            });
          }

          if (p.rentalRequests && typeof p.rentalRequests === "object") {
            const request = p.rentalRequests as unknown as { status?: string };
            const status = request.status?.toUpperCase();
            return status ? !forbiddenStatuses.includes(status) : true;
          }

          return true;
        })
        .slice(0, 3);
    }
  } catch (error) {
    console.error("Error fetching featured properties from database:", error);
  }

  if (!featured || featured.length === 0) {
    return null;
  }

  return (
    <section className="bg-background py-16 sm:py-20">
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
