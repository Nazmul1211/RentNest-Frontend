import React from "react";
import Link from "next/link";
import { Bed, Bath, Ruler, MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Property {
  id: string;
  landlordId: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  rentAmount: string | number;
  securityDeposit: string | number;
  address: string;
  city: string;
  area: string;
  country: string;
  postalCode: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqft: string | number;
  images: string[];
  amenities: string[];
  status: string;
  isAvailable: boolean;
  availableFrom: string;
  createdAt: string;
  updatedAt: string;
  rentalRequests?: {
    status: string;
  }[];
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images && property.images.length > 0
    ? property.images[0]
    : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";

  const categoryName = property.categoryId === "a2c49963-308b-478c-9f42-262edff5e996"
    ? "Apartment"
    : property.categoryId === "36788eab-f75e-488c-8120-8252fab6c49c"
    ? "House"
    : property.categoryId === "55f0ad3b-fddf-4586-b96d-78eb49c286f9"
    ? "Penthouse"
    : "Property";

  const formattedRent = Number(property.rentAmount).toLocaleString();
  const availableDate = new Date(property.availableFrom);
  const availabilityLabel = !Number.isNaN(availableDate.getTime())
    ? `Available ${availableDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    : "Available now";

  return (
    <Card className="group relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-xl border border-border/35 bg-card pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5">
      
      {/* Property Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <img
          src={mainImage}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <Badge
            variant={property.isAvailable ? "default" : "destructive"}
          className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold shadow-xs ${
              property.isAvailable
                ? "bg-emerald-500/90 hover:bg-emerald-500 text-white border-0"
                : ""
            }`}
          >
            {property.isAvailable ? "Available" : "Rented"}
          </Badge>
          <Badge variant="secondary" className="rounded-md border-0 bg-background/85 px-2.5 py-0.5 text-[11px] font-semibold shadow-xs backdrop-blur-md">
            {categoryName}
          </Badge>
        </div>

        {/* Rent Tag Overlay */}
        <div className="absolute bottom-3 right-3 z-10 flex items-baseline gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-md backdrop-blur-xs">
          ৳{formattedRent} <span className="text-[11px] font-normal opacity-85">/ month</span>
        </div>
      </div>

      {/* Property Info Content */}
      <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5 text-primary shrink-0" />
            <span className="line-clamp-1">
              {property.area}, {property.city}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <CalendarDays className="size-3.5 shrink-0 text-primary" />
            <span>{availabilityLabel}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold leading-snug text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 divide-x divide-border/35 border-t border-border/35 pt-3 text-center text-xs text-muted-foreground">
          <div className="flex flex-col items-center px-1 py-1.5">
            <Bed className="size-4 text-primary mb-1" />
            <span className="font-bold text-foreground">{property.bedrooms}</span>
            <span className="text-[10px] text-muted-foreground">Beds</span>
          </div>
          <div className="flex flex-col items-center px-1 py-1.5">
            <Bath className="size-4 text-primary mb-1" />
            <span className="font-bold text-foreground">{property.bathrooms}</span>
            <span className="text-[10px] text-muted-foreground">Baths</span>
          </div>
          <div className="flex flex-col items-center px-1 py-1.5">
            <Ruler className="size-4 text-primary mb-1" />
            <span className="font-bold text-foreground">{property.sizeSqft}</span>
            <span className="text-[10px] text-muted-foreground">Sqft</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <CardFooter className="border-t border-border/35 bg-card p-5 pt-4">
        <Link
          href={`/properties/${property.id}`}
          className="group/btn flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View Details
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
