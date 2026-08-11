"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  PlusCircle,
  Building2,
  DollarSign,
  MapPin,
  Layers,
  Sparkles,
  ImageIcon,
  Loader2,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/app/(publicGroup)/_actions/GetCategories";
import { CreateLandlordProperty } from "@/app/(dashboardGroup)/_action/LandlordAction";
import { propertySchema, PropertyFormData } from "@/app/(dashboardGroup)/_schema/createPropertiesSchema";


export default function CreatePropertiesPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<{ id: string; name?: string; title?: string }[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      rentAmount: 0,
      securityDeposit: 0,
      address: "",
      area: "",
      city: "Dhaka",
      postalCode: "1200",
      country: "Bangladesh",
      bedrooms: 1,
      bathrooms: 1,
      sizeSqft: 500,
      categoryId: "",
      type: "UNKNOWN",
      availableFrom: new Date().toISOString().split("T")[0],
      amenities: "WiFi, Balcony, Generator, 24/7 Security",
      images: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
    },
  });

  const selectedCategoryId = watch("categoryId");

  // Prefetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const data = await getCategories();
        if (data && Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0) {
            setValue("categoryId", data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to prefetch categories:", error);
        toast.error("Failed to load categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [setValue]);

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);

    const amenitiesArray = data.amenities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const imagesArray = data.images
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const formattedAvailableFrom = data.availableFrom
      ? new Date(data.availableFrom).toISOString()
      : new Date().toISOString();

    try {
      const res = await CreateLandlordProperty({
        title: data.title,
        description: data.description,
        rentAmount: data.rentAmount,
        securityDeposit: data.securityDeposit,
        address: data.address,
        area: data.area,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sizeSqft: data.sizeSqft,
        categoryId: data.categoryId,
        type: data.type || "UNKNOWN",
        availableFrom: formattedAvailableFrom,
        amenities: amenitiesArray,
        images: imagesArray,
      });

      if (res?.success) {
        toast.success("Property created successfully!");
        router.push("/dashboard/landlord/properties");
      } else {
        toast.error(res?.message || res?.errorMessage || "Failed to create property.");
      }
    } catch (error) {
      console.error("Error submitting property form:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-xs font-semibold text-muted-foreground hover:text-teal-600 mb-1 -ml-2"
          >
            <Link href="/dashboard/landlord" className="flex items-center gap-1">
              <ArrowLeft className="size-4" /> Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <PlusCircle className="size-6 text-teal-600" /> Create Property Listing
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Fill out the details below to add a new property listing to RentNest.
          </p>
        </div>

        {/* Minimalist Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 rounded-xl border border-border bg-card p-6 text-xs shadow-md ring-1 ring-foreground/5 sm:p-8"
        >
          {/* Section 1: Property Category */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
              <Layers className="size-4" /> Category Selection
            </h3>

            {isLoadingCategories ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                <Loader2 className="size-4 animate-spin text-teal-600" /> Prefetching categories...
              </div>
            ) : categories.length === 0 ? (
              <p className="text-xs text-muted-foreground py-1">No categories available.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategoryId === cat.id;
                  return (
                    <label
                      key={cat.id}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${isSelected
                          ? "border-teal-600/80 dark:border-teal-500 bg-teal-500/10 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-bold"
                          : "border-border/40 bg-muted/20 hover:bg-muted/40 text-foreground"
                        }`}
                    >
                      <input
                        type="radio"
                        name="propertyCategory"
                        value={cat.id}
                        checked={isSelected}
                        onChange={() => setValue("categoryId", cat.id)}
                        className="size-3.5 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-xs capitalize">{cat.name || cat.title}</span>
                    </label>
                  );
                })}
              </div>
            )}
            {errors.categoryId && (
              <p className="text-xs font-semibold text-rose-500">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Section 2: Basic Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
              <Building2 className="size-4" /> Basic Details
            </h3>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Property Title *</label>
              <input
                type="text"
                {...register("title")}
                placeholder="e.g. Modern 2 Bedroom Apartment in Dhanmondi"
                className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
              />
              {errors.title && (
                <p className="text-xs font-semibold text-rose-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Description *</label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Describe the property, nearby landmarks..."
                className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
              />
              {errors.description && (
                <p className="text-xs font-semibold text-rose-500">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Section 3: Pricing & Specs */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
              <DollarSign className="size-4" /> Pricing & Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Monthly Rent (৳) *</label>
                <input
                  type="number"
                  {...register("rentAmount", { valueAsNumber: true })}
                  placeholder="25000"
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.rentAmount && (
                  <p className="text-xs font-semibold text-rose-500">{errors.rentAmount.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Security Deposit (৳) *</label>
                <input
                  type="number"
                  {...register("securityDeposit", { valueAsNumber: true })}
                  placeholder="50000"
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.securityDeposit && (
                  <p className="text-xs font-semibold text-rose-500">{errors.securityDeposit.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-1">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Bedrooms *</label>
                <input
                  type="number"
                  {...register("bedrooms", { valueAsNumber: true })}
                  min={1}
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.bedrooms && (
                  <p className="text-xs font-semibold text-rose-500">{errors.bedrooms.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Bathrooms *</label>
                <input
                  type="number"
                  {...register("bathrooms", { valueAsNumber: true })}
                  min={1}
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.bathrooms && (
                  <p className="text-xs font-semibold text-rose-500">{errors.bathrooms.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Size (sqft) *</label>
                <input
                  type="number"
                  {...register("sizeSqft", { valueAsNumber: true })}
                  placeholder="1200"
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.sizeSqft && (
                  <p className="text-xs font-semibold text-rose-500">{errors.sizeSqft.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Location Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
              <MapPin className="size-4" /> Location Details
            </h3>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Street Address *</label>
              <input
                type="text"
                {...register("address")}
                placeholder="House 14, Road 12"
                className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
              />
              {errors.address && (
                <p className="text-xs font-semibold text-rose-500">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Area *</label>
                <input
                  type="text"
                  {...register("area")}
                  placeholder="Dhanmondi"
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.area && (
                  <p className="text-xs font-semibold text-rose-500">{errors.area.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">City *</label>
                <input
                  type="text"
                  {...register("city")}
                  placeholder="Dhaka"
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.city && (
                  <p className="text-xs font-semibold text-rose-500">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Postal Code *</label>
                <input
                  type="text"
                  {...register("postalCode")}
                  placeholder="1209"
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.postalCode && (
                  <p className="text-xs font-semibold text-rose-500">{errors.postalCode.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Country *</label>
                <input
                  type="text"
                  {...register("country")}
                  placeholder="Bangladesh"
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.country && (
                  <p className="text-xs font-semibold text-rose-500">{errors.country.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Amenities, Availability & Media */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
              <Sparkles className="size-4" /> Amenities & Media
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-foreground">
                  Amenities <span className="font-normal text-muted-foreground">(comma separated) *</span>
                </label>
                <input
                  type="text"
                  {...register("amenities")}
                  placeholder="WiFi, Lift, Generator, Parking, 24/7 Security"
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
                {errors.amenities && (
                  <p className="text-xs font-semibold text-rose-500">{errors.amenities.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground flex items-center gap-1">
                  <Calendar className="size-3.5 text-teal-600" /> Available From Date
                </label>
                <input
                  type="date"
                  {...register("availableFrom")}
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground flex items-center gap-1">
                <ImageIcon className="size-3.5 text-teal-600" /> Image URLs <span className="font-normal text-muted-foreground">(one URL per line) *</span>
              </label>
              <textarea
                {...register("images")}
                rows={3}
                placeholder="https://images.unsplash.com/photo-1567496898669-ee935f5f647a"
                className="w-full p-2.5 rounded-xl border border-border/60 bg-background focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none font-mono text-[11px] transition-all"
              />
              {errors.images && (
                <p className="text-xs font-semibold text-rose-500">{errors.images.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/dashboard/landlord/properties")}
              disabled={isSubmitting}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1.5" /> Publishing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4 mr-1.5" /> Publish Property
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
