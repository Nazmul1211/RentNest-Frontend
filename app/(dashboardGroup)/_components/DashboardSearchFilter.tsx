"use client";

import React from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FilterOption {
  label: string;
  value: string;
}

interface DashboardSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  filters?: {
    id: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  onReset?: () => void;
}

export default function DashboardSearchFilter({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search records...",
  filters = [],
  onReset,
}: DashboardSearchFilterProps) {
  const hasActiveFilters = searchQuery !== "" || filters.some((f) => f.value !== "ALL" && f.value !== "");

  return (
    <div className="bg-card rounded-2xl border border-border/60 p-4 shadow-xs space-y-3 mb-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10 h-10 text-xs font-medium focus-visible:ring-teal-500 bg-background/80"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center gap-1.5 min-w-[130px] flex-1 sm:flex-initial">
              <Filter className="size-3.5 text-teal-600 shrink-0" />
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground transition hover:border-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Reset Filters Button */}
          {hasActiveFilters && onReset && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-10 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-1 px-3"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
