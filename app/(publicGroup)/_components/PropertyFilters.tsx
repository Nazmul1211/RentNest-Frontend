"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, RotateCcw, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PropertyFiltersProps {
  categories: Category[];
}

export default function PropertyFilters({ categories }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state initialized from search params
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [minRent, setMinRent] = useState(searchParams.get("minRent") || "");
  const [maxRent, setMaxRent] = useState(searchParams.get("maxRent") || "");

  // Update local inputs when URL search params change (e.g. on Reset)
  useEffect(() => {
    setSearchTerm(searchParams.get("searchTerm") || "");
    setMinRent(searchParams.get("minRent") || "");
    setMaxRent(searchParams.get("maxRent") || "");
  }, [searchParams]);

  // Read current active URL states
  const activeCategory = searchParams.get("categoryId") || "";
  const activeBedrooms = searchParams.get("bedrooms") || "";
  const activeSort = searchParams.get("sort") || "newest";

  // Updates a single search parameter in the URL and pushes the change
  const updateUrlParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Submits the search text and price range inputs
  const handleApplyTextAndPriceFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) params.set("searchTerm", searchTerm);
    else params.delete("searchTerm");

    if (minRent) params.set("minRent", minRent);
    else params.delete("minRent");

    if (maxRent) params.set("maxRent", maxRent);
    else params.delete("maxRent");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinRent("");
    setMaxRent("");
    router.push(pathname);
  };

  return (
    <div className="space-y-6 p-6 rounded-xl border border-border/40 bg-card/65 backdrop-blur-md shadow-sm h-fit">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">Filters</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <RotateCcw className="size-3 mr-1" />
          Reset
        </Button>
      </div>

      {/* Main Form for Text Inputs (search term and price range) */}
      <form onSubmit={handleApplyTextAndPriceFilters} className="space-y-5">
        {/* Keyword Search */}
        <div className="space-y-2">
          <label htmlFor="search" className="text-xs font-semibold text-foreground">
            Search Keyword
          </label>
          <div className="relative">
            <Input
              id="search"
              placeholder="e.g. Uttara, Modern, Penthouse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-foreground block">
            Category
          </span>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!activeCategory ? "default" : "outline"}
              className={`cursor-pointer font-medium transition-all py-1 px-3 ${!activeCategory
                ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700"
                : "hover:bg-teal-500/10 hover:text-teal-600"
                }`}
              onClick={() => updateUrlParam("categoryId", null)}
            >
              All
            </Badge>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <Badge
                  key={cat.id}
                  variant={isActive ? "default" : "outline"}
                  className={`cursor-pointer font-medium transition-all py-1 px-3 ${isActive
                    ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700"
                    : "hover:bg-teal-500/10 hover:text-teal-600"
                    }`}
                  onClick={() => updateUrlParam("categoryId", cat.id)}
                >
                  {cat.name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-foreground block">
            Rent Range (৳/month)
          </span>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
              className="w-full text-center"
            />
            <span className="text-muted-foreground text-xs font-medium">to</span>
            <Input
              placeholder="Max"
              type="number"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              className="w-full text-center"
            />
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-foreground block">
            Bedrooms
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-1.5">
            {["", "1", "2", "3", "4", "5"].map((num) => {
              const label = num === "" ? "Any" : num === "5" ? "5+ BHK" : `${num} BHK`;
              const isSelected = activeBedrooms === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateUrlParam("bedrooms", num || null)}
                  className={`w-full py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${isSelected
                    ? "bg-teal-600 border-teal-600 text-white font-semibold shadow-xs"
                    : "bg-background border-border hover:bg-teal-500/10 hover:text-teal-600 text-muted-foreground"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <label htmlFor="sort" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <ArrowUpDown className="size-3 text-primary" />
            Sort By
          </label>
          <select
            id="sort"
            value={activeSort}
            onChange={(e) => updateUrlParam("sort", e.target.value)}
            className="w-full h-8 text-xs rounded-lg border border-input bg-card px-2 py-1 outline-none focus:border-ring focus:ring-1 focus:ring-ring"
          >
            <option value="newest">Newest Listed</option>
            <option value="price-asc">Rent: Low to High</option>
            <option value="price-desc">Rent: High to Low</option>
          </select>
        </div>

        {/* Apply Button */}
        <Button type="submit" className="w-full h-9 text-xs font-semibold mt-2 bg-teal-600 hover:bg-teal-700 text-white shadow-xs">
          Apply Filters
        </Button>
      </form>
    </div>
  );
}
