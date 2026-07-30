import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bed, Bath, Ruler, MapPin, Calendar, CheckCircle2, ShieldCheck, Mail, Phone, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Property } from "../../_components/PropertyCard";
import RentanSubmissionModal from "../../_components/RentanSubmissionModal";



export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let property: Property | null = null;

  try {
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/properties/${id}`, {
      cache: "no-store", // Fetch fresh status/details
    });

    if (res.ok) {
      const data = await res.json();
      // console.log(data, 'data');
      property = data.data || null;
    }
  } catch (error) {
    console.error("Error fetching property detail:", error);
  }

  if (!property) {
    notFound();
  }

  const mainImage = property.images && property.images.length > 0 ? property.images[0] : "";
  const categoryName = property.categoryId === "a2c49963-308b-478c-9f42-262edff5e996"
    ? "Apartment"
    : property.categoryId === "36788eab-f75e-488c-8120-8252fab6c49c"
      ? "House"
      : property.categoryId === "55f0ad3b-fddf-4586-b96d-78eb49c286f9"
        ? "Penthouse"
        : "Property";
  const formattedRent = Number(property.rentAmount).toLocaleString();
  const formattedDeposit = Number(property.securityDeposit).toLocaleString();

  // Format date readable
  const availableDate = new Date(property.availableFrom).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 px-4 sm:px-6 lg:px-8 py-12 mt-16 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Listings
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left column: Image & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/40 bg-muted shadow-sm">
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10 flex gap-2">
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
          </div>

          {/* Title & Location Header */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              <span>{property.address}, {property.area}, {property.city}, {property.country}</span>
            </div>
          </div>

          {/* Quick Specs Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/40 bg-card text-center">
              <Bed className="size-5 text-primary mb-1.5" />
              <span className="text-base font-bold text-foreground">{property.bedrooms}</span>
              <span className="text-xs text-muted-foreground">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/40 bg-card text-center">
              <Bath className="size-5 text-primary mb-1.5" />
              <span className="text-base font-bold text-foreground">{property.bathrooms}</span>
              <span className="text-xs text-muted-foreground">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/40 bg-card text-center">
              <Ruler className="size-5 text-primary mb-1.5" />
              <span className="text-base font-bold text-foreground">{property.sizeSqft}</span>
              <span className="text-xs text-muted-foreground">Sq. Ft.</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">About this property</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/30 bg-card/50 text-xs text-foreground/90"
                >
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Right column: Sticky Checkout Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl border border-border/40 bg-card shadow-md space-y-6">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Monthly Rent
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-foreground">৳{formattedRent}</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 space-y-3 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Security Deposit</span>
                <strong className="text-foreground">৳{formattedDeposit}</strong>
              </div>
              <div className="flex justify-between">
                <span>Category</span>
                <strong className="text-foreground">{categoryName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Postcode</span>
                <strong className="text-foreground">{property.postalCode}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3.5 text-primary" />
                  Available From
                </span>
                <strong className="text-foreground">{availableDate}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 space-y-3">
              <RentanSubmissionModal property={property} triggerText="Contact Landlord" buttonVariant="outline" />
            </div>


            {/* Verification promise */}
            <div className="flex gap-2 p-3 bg-muted/30 rounded-lg text-[10px] leading-normal text-muted-foreground">
              <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
              <span>
                RentNest Security Promise: All listings are verified by our team. Never transfer money before visiting the property in person.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
