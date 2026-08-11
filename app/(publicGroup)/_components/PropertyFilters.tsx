"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, RotateCcw, SlidersHorizontal, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
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
  const [isOpenMobile, setIsOpenMobile] = useState(false);

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

  const activeCount = [
    Boolean(searchParams.get("searchTerm")),
    Boolean(searchParams.get("categoryId")),
    Boolean(searchParams.get("minRent")),
    Boolean(searchParams.get("maxRent")),
    Boolean(searchParams.get("bedrooms")),
    searchParams.get("sort") && searchParams.get("sort") !== "newest",
  ].filter(Boolean).length;

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
    <div className="rounded-xl border border-border/50 bg-card/75 backdrop-blur-md shadow-xs p-4 sm:p-5 lg:p-6 transition-all">
      {/* Header & Mobile/Tablet Toggle Button */}
      <div className={`flex items-center justify-between ${isOpenMobile ? "pb-3 border-b border-border/40 mb-4" : "lg:pb-4 lg:border-b lg:border-border/40 lg:mb-5"}`}>
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="flex items-center justify-between w-full text-left focus:outline-none group cursor-pointer lg:cursor-default"
          aria-expanded={isOpenMobile}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <h2 className="text-sm font-bold text-foreground">Filter Properties</h2>
            {activeCount > 0 && (
              <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-teal-600/10 text-teal-600 dark:text-teal-400 font-semibold border border-teal-600/20">
                {activeCount} active
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="h-7 text-[11px] px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <RotateCcw className="size-3 mr-1" />
                Reset
              </Button>
            )}
            <span className="lg:hidden p-1 rounded-md text-muted-foreground group-hover:text-foreground group-hover:bg-muted/60 transition-colors">
              {isOpenMobile ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </span>
          </div>
        </button>
      </div>

      {/* Main Filter Form (Collapsible on mobile/tablet, always visible on desktop) */}
      <div className={`${isOpenMobile ? "block" : "hidden lg:block"}`}>
        <form onSubmit={handleApplyTextAndPriceFilters} className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-4 lg:block lg:space-y-5">
          {/* Keyword Search */}
          <div className="space-y-1.5 md:col-span-1">
            <label htmlFor="search" className="text-xs font-semibold text-foreground block">
              Search Keyword
            </label>
            <div className="relative">
              <Input
                id="search"
                placeholder="e.g. Uttara, Modern..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 text-xs h-9"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            </div>
          </div>

          {/* Sort Order */}
          <div className="space-y-1.5 md:col-span-1">
            <label htmlFor="sort" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <ArrowUpDown className="size-3 text-teal-600 dark:text-teal-400" />
              Sort By
            </label>
            <select
              id="sort"
              value={activeSort}
              onChange={(e) => updateUrlParam("sort", e.target.value)}
              className="w-full h-9 text-xs rounded-lg border border-input bg-card px-2.5 py-1 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-foreground"
            >
              <option value="newest">Newest Listed</option>
              <option value="price-asc">Rent: Low to High</option>
              <option value="price-desc">Rent: High to Low</option>
            </select>
          </div>

          {/* Categories */}
          <div className="space-y-1.5 md:col-span-2">
            <span className="text-xs font-semibold text-foreground block">
              Category
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Badge
                variant={!activeCategory ? "default" : "outline"}
                className={`cursor-pointer text-xs font-medium transition-all py-1 px-2.5 ${!activeCategory
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
                    className={`cursor-pointer text-xs font-medium transition-all py-1 px-2.5 ${isActive
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
          <div className="space-y-1.5 md:col-span-1">
            <span className="text-xs font-semibold text-foreground block">
              Rent Range (৳/month)
            </span>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
                className="w-full text-center text-xs h-9"
              />
              <span className="text-muted-foreground text-xs font-medium">to</span>
              <Input
                placeholder="Max"
                type="number"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
                className="w-full text-center text-xs h-9"
              />
            </div>
          </div>

          {/* Bedrooms Filter */}
          <div className="space-y-1.5 md:col-span-1">
            <span className="text-xs font-semibold text-foreground block">
              Bedrooms
            </span>
            <div className="grid grid-cols-6 sm:grid-cols-6 lg:grid-cols-3 gap-1">
              {["", "1", "2", "3", "4", "5"].map((num) => {
                const label = num === "" ? "Any" : num === "5" ? "5+" : `${num}`;
                const isSelected = activeBedrooms === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => updateUrlParam("bedrooms", num || null)}
                    className={`w-full py-1 px-1.5 rounded-md text-xs font-medium border text-center transition-all ${isSelected
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

          {/* Apply Button */}
          <div className="pt-2 md:pt-0 md:col-span-2">
            <Button type="submit" className="w-full h-9 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-xs">
              Apply Filters
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

