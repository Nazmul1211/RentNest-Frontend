"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bed, Bath, Ruler, MapPin, ArrowRight, Home, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardPagination from "./DashboardPagination";
import DashboardSearchFilter from "./DashboardSearchFilter";

interface PropertyListWithFilterProps {
  properties: any[];
  page?: number;
}

export default function PropertyListWithFilter({ properties = [], page = 1 }: PropertyListWithFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("ALL");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.area?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.id?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAvailability =
      availabilityFilter === "ALL" ||
      (availabilityFilter === "AVAILABLE" && property.isAvailable) ||
      (availabilityFilter === "RENTED" && !property.isAvailable);

    return matchesSearch && matchesAvailability;
  });

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const visibleProperties = filteredProperties.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setSearchQuery("");
    setAvailabilityFilter("ALL");
  };

  return (
    <div className="space-y-4 my-4">
      {/* Live Search & Availability Filter */}
      <DashboardSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search properties by title, city, area..."
        filters={[
          {
            id: "availability",
            label: "Availability",
            value: availabilityFilter,
            onChange: setAvailabilityFilter,
            options: [
              { label: "All Statuses", value: "ALL" },
              { label: "Available", value: "AVAILABLE" },
              { label: "Rented", value: "RENTED" },
            ],
          },
        ]}
        onReset={resetFilters}
      />

      {filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-xl bg-card/40 text-center space-y-3">
          <div className="size-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
            <Building2 className="size-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-foreground text-sm">No Properties Found</h4>
            <p className="text-xs text-muted-foreground max-w-sm">
              No property listings match your search query or availability criteria.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProperties.map((property: any) => {
              const mainImage = property.images?.[0] || "";
              const formattedRent = Number(property.rentAmount || 0).toLocaleString();

              return (
                <div
                  key={property.id}
                  className="p-4 rounded-xl border border-border/50 bg-card hover:border-teal-500/30 transition-all shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="relative w-full sm:w-36 aspect-video sm:aspect-square rounded-lg overflow-hidden bg-muted shrink-0 border border-border/30">
                      {mainImage ? (
                        <img
                          src={mainImage}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted/50">
                          <Home className="size-8 text-muted-foreground" />
                        </div>
                      )}

                      <div className="absolute top-2 left-2">
                        <Badge
                          variant={property.isAvailable ? "default" : "destructive"}
                          className="text-[10px] px-1.5 py-0.5 font-bold shadow-xs"
                        >
                          {property.isAvailable ? "Available" : "Rented"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 space-y-1.5 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          ID: {property.id?.slice(0, 8)}...
                        </span>
                        <span className="text-xs font-extrabold text-teal-600">
                          ৳{formattedRent} <span className="text-[10px] font-normal text-muted-foreground">/ mo</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-foreground line-clamp-1">
                        {property.title}
                      </h4>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 text-teal-600 shrink-0" />
                        <span className="line-clamp-1">{property.area}, {property.city}</span>
                      </div>

                      <div className="flex items-center gap-3 pt-2 text-[11px] text-muted-foreground border-t border-border/30">
                        <span className="flex items-center gap-1">
                          <Bed className="size-3 text-teal-600" /> {property.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="size-3 text-teal-600" /> {property.bathrooms} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Ruler className="size-3 text-teal-600" /> {property.sizeSqft} sqft
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1 border-t border-border/30">
                    <Button variant="ghost" size="sm" className="text-xs font-semibold text-teal-600 hover:text-teal-700 p-0 h-auto" asChild>
                      <Link href={`/properties/${property.id}`}>
                        View Property Details <ArrowRight className="size-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProperties.length}
            pageSize={pageSize}
            unit="properties"
          />
        </>
      )}
    </div>
  );
}
