
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bed,
  Bath,
  Ruler,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  CalendarDays,
  Star,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Property } from "../../_components/PropertyCard";
import RentanSubmissionModal from "../../_components/RentanSubmissionModal";
import PropertyGallery from "../../_components/PropertyGallery";
import PropertyCard from "../../_components/PropertyCard";
import { GetProperties, GetSingleProperty } from "../../_actions/GetProperties";
import { GetCategories } from "../../_actions/GetCategories";
import { GetReview } from "@/app/(dashboardGroup)/_action/ManageReview";

interface ReviewRecord {
  id?: string;
  propertyId?: string;
  rentalRequestId?: string;
  rentalRequest?: { propertyId?: string };
  rating?: number;
  comment?: string;
  tenant?: { name?: string };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Fetch Property, Categories, and Reviews in parallel
  const [propertyData, categoriesData, reviewsData, allProperties] = await Promise.all([
    GetSingleProperty(id),
    GetCategories(),
    GetReview(id),
    GetProperties(),
  ]);

  const property: Property | null = propertyData;

  if (!property) {
    notFound();
  }

  // Find Category Name dynamically
  const matchedCategory = Array.isArray(categoriesData)
    ? (categoriesData as { id: string; name?: string }[]).find((c) => c.id === property.categoryId)
    : null;
  const categoryName = matchedCategory?.name || "Property";

  const relatedProperties: Property[] = Array.isArray(allProperties)
    ? allProperties
      .filter((item: Property) =>
        item.id !== property.id &&
        item.categoryId === property.categoryId &&
        item.isAvailable !== false &&
        item.status !== "RENTED" &&
        item.status !== "BOOKED"
      )
      .slice(0, 3)
    : [];

  const formattedRent = Number(property.rentAmount).toLocaleString();
  const formattedDeposit = Number(property.securityDeposit).toLocaleString();

  // Format date readable
  const availableDate = new Date(property.availableFrom).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isAlreadyBooked =
    property.isAvailable === false ||
    property.status === "RENTED" ||
    property.status === "BOOKED" ||
    (Array.isArray(property.rentalRequests)
      ? property.rentalRequests.some((req) => {
        const s = req?.status?.toUpperCase();
        return s === "PAID" || s === "COMPLETED";
      })
      : (() => {
        const request = property.rentalRequests as unknown as { status?: string };
        const s = request.status?.toUpperCase();
        return s === "PAID" || s === "COMPLETED";
      })());

  // Filter reviews for this property
  const propertyReviews: ReviewRecord[] = Array.isArray(reviewsData)
    ? (reviewsData as ReviewRecord[]).filter(
      (r) =>
        r.propertyId === id ||
        r.rentalRequest?.propertyId === id ||
        r.rentalRequestId === id
    )
    : [];

  const averageRating =
    propertyReviews.length > 0
      ? (
        propertyReviews.reduce((acc, cur) => acc + (cur.rating || 5), 0) /
        propertyReviews.length
      ).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 max-w-7xl mx-auto">
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
          {/* Property Image Gallery */}
          <div className="relative">
            <PropertyGallery images={property.images} title={property.title} />
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                {property.title}
              </h1>
              {averageRating && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-600">
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  <span>{averageRating}</span>
                  <span className="text-muted-foreground font-normal">({propertyReviews.length} Reviews)</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-teal-600" />
              <span>{property.address}, {property.area}, {property.city}, {property.country}</span>
            </div>
          </div>

          {/* Quick Specs Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/40 bg-card text-center">
              <Bed className="size-5 text-teal-600 mb-1.5" />
              <span className="text-base font-bold text-foreground">{property.bedrooms}</span>
              <span className="text-xs text-muted-foreground">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/40 bg-card text-center">
              <Bath className="size-5 text-teal-600 mb-1.5" />
              <span className="text-base font-bold text-foreground">{property.bathrooms}</span>
              <span className="text-xs text-muted-foreground">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/40 bg-card text-center">
              <Ruler className="size-5 text-teal-600 mb-1.5" />
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

          {/* Verified Tenant Reviews Section */}
          <div className="space-y-4 pt-6 border-t border-border/40">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="size-5 text-teal-600" />
                Verified Tenant Reviews
              </h2>
              {averageRating && (
                <span className="text-xs font-semibold text-teal-600">
                  ★ {averageRating} average rating
                </span>
              )}
            </div>

            {propertyReviews.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-border/50 rounded-xl bg-card/30 space-y-1">
                <p className="text-xs font-semibold text-foreground">No tenant reviews yet</p>
                <p className="text-[11px] text-muted-foreground">
                  Be the first tenant to leave feedback after booking this property!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {propertyReviews.map((rev, index) => (
                  <div
                    key={rev.id || index}
                    className="p-4 rounded-xl border border-border/40 bg-card space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-teal-500/10 text-teal-600 font-bold flex items-center justify-center text-xs">
                          {rev.tenant?.name ? rev.tenant.name[0] : "T"}
                        </div>
                        <span className="font-bold text-foreground">
                          {rev.tenant?.name || "Verified Tenant"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-3.5 ${star <= (rev.rating || 5)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-600"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-9">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
                  <CalendarDays className="size-3.5 text-teal-600" />
                  Available From
                </span>
                <strong className="text-foreground">{availableDate}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 space-y-3">
              {isAlreadyBooked ? (
                <button
                  disabled
                  className="w-full py-2.5 bg-rose-500/10 text-rose-600 font-bold border border-rose-500/30 rounded-lg cursor-not-allowed text-center text-sm"
                >
                  Already Booked
                </button>
              ) : (
                <RentanSubmissionModal property={property} triggerText="Contact Landlord" buttonVariant="outline" />
              )}
            </div>

            {/* Verification promise */}
            <div className="flex gap-2 p-3 bg-muted/30 rounded-lg text-[10px] leading-normal text-muted-foreground">
              <ShieldCheck className="size-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                RentNest Security Promise: All listings are verified by our team. Never transfer money before visiting the property in person.
              </span>
            </div>
          </div>
        </div>
      </div>

      {relatedProperties.length > 0 && (
        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="mb-8 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Continue exploring</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Similar homes you may like
            </h2>
            <p className="text-sm text-muted-foreground">
              More available {categoryName.toLowerCase()} listings with comparable features.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProperties.map((relatedProperty) => (
              <PropertyCard key={relatedProperty.id} property={relatedProperty} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
