"use server"

import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import CategoryCard, { categoryType } from "./CategoryCard";
import { GetCategories } from "../_actions/GetCategories";

export default async function CategorySection() {
  let categories: categoryType[] = [];

  try {
    categories = await GetCategories();
  } catch (error) {
    console.error("Error loading categories for homepage:", error);
  }


  if (!categories || categories.length === 0) {
    // Fallback static categories if backend API is offline during SSR
    categories = [
      {
        id: "a2c49963-308b-478c-9f42-262edff5e996",
        name: "Apartment",
        slug: "apartment",
        description: "Modern multi-family units and executive flats in prime city neighborhoods.",
        isActive: true
      },
      {
        id: "36788eab-f75e-488c-8120-8252fab6c49c",
        name: "House",
        slug: "house",
        description: "Spacious independent residential homes and family villas.",
        isActive: true
      },
      {
        id: "55f0ad3b-fddf-4586-b96d-78eb49c286f9",
        name: "Penthouse",
        slug: "penthouse",
        description: "Luxury top-floor residences with panoramic views and premium amenities.",
        isActive: true
      }
    ];
  }


  return (
    <section id="property-categories" className="relative bg-muted/20 py-16 sm:py-20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Layers className="size-3.5" />
              <span>Explore Categories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Find a Space Built for Your Needs
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Browse through curated rental property categories and discover the perfect space for your lifestyle.
            </p>
          </div>

          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            All Categories
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.slice(0, 3).map((category) => (
            <div key={category.id} className="h-full">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
