import React from "react";
import Link from "next/link";
import { Bed, Bath, Ruler, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
  const mainImage = property.images && property.images.length > 0 ? property.images[0] : "";
  const categoryName = property.categoryId === "a2c49963-308b-478c-9f42-262edff5e996"
    ? "Apartment"
    : property.categoryId === "36788eab-f75e-488c-8120-8252fab6c49c"
    ? "House"
    : property.categoryId === "55f0ad3b-fddf-4586-b96d-78eb49c286f9"
    ? "Penthouse"
    : "Property";
  const formattedRent = Number(property.rentAmount).toLocaleString();

  return (
    <Card className="group relative flex flex-col h-full bg-card overflow-hidden rounded-xl border border-border/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 pt-0">
      {/* Property Image with overlays */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={mainImage}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <Badge
            variant={property.isAvailable ? "default" : "destructive"}
            className="font-semibold shadow-sm"
          >
            {property.isAvailable ? "Available" : "Rented"}
          </Badge>
          <Badge variant="secondary" className="font-semibold shadow-sm backdrop-blur-md bg-background/80">
            {categoryName}
          </Badge>
        </div>

        {/* Rent tag overlay */}
        <div className="absolute bottom-3 right-3 z-10 bg-primary/95 text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm backdrop-blur-xs">
          ৳{formattedRent} <span className="text-xs font-normal opacity-85">/ month</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="flex-1 flex flex-col justify-between p-5">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3 text-primary" />
            <span>
              {property.area}, {property.city}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold leading-snug text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Property Specs Checklist */}
        <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30">
            <Bed className="size-4 text-primary/80 mb-1" />
            <span className="font-medium text-foreground">{property.bedrooms}</span>
            <span className="text-[10px] text-muted-foreground">Beds</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30">
            <Bath className="size-4 text-primary/80 mb-1" />
            <span className="font-medium text-foreground">{property.bathrooms}</span>
            <span className="text-[10px] text-muted-foreground">Baths</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30">
            <Ruler className="size-4 text-primary/80 mb-1" />
            <span className="font-medium text-foreground">{property.sizeSqft}</span>
            <span className="text-[10px] text-muted-foreground">Sqft</span>
          </div>
        </div>
      </div>

      {/* Card Footer Link */}
      <CardFooter className="p-5 pt-0">
        <Link
          href={`/properties/${property.id}`}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          View Details
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
