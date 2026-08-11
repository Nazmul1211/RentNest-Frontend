"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export default function PropertyPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
}: PropertyPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    router.push(createPageUrl(pageNumber));
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate list of page numbers to render
  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40 mt-8">
      {/* Item Range Info */}
      <p className="text-xs text-muted-foreground">
        Showing <strong className="text-foreground">{startItem}–{endItem}</strong> of{" "}
        <strong className="text-foreground">{totalItems}</strong> properties
      </p>

      {/* Pagination controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="h-8 px-2 text-xs hover:bg-teal-500/10 hover:text-teal-600 disabled:opacity-40"
        >
          <ChevronLeft className="size-3.5 mr-1" />
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (typeof p === "string") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-xs text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            const isCurrent = p === currentPage;
            return (
              <button
                key={`page-${p}`}
                type="button"
                onClick={() => handlePageChange(p)}
                className={`size-8 rounded-lg text-xs font-semibold transition-all border ${
                  isCurrent
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                    : "bg-background border-border text-muted-foreground hover:bg-teal-500/10 hover:text-teal-600 hover:border-teal-600/30"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="h-8 px-2 text-xs hover:bg-teal-500/10 hover:text-teal-600 disabled:opacity-40"
        >
          Next
          <ChevronRight className="size-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
