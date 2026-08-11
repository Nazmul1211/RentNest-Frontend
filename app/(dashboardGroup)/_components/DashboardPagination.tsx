"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DashboardPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  unit?: string;
}

export default function DashboardPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  unit = "items",
}: DashboardPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalItems <= 0) return null;

  const updatePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipsis
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    pages.push(1);
    if (currentPage > 3) {
      pages.push("...");
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Dashboard Pagination"
      className="mt-8 w-full bg-card border border-border/70 rounded-2xl p-3.5 sm:px-6 shadow-xs transition-all"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Item Counter Info */}
        <div className="text-muted-foreground font-medium text-center sm:text-left">
          Showing <strong className="text-foreground font-bold">{firstItem}–{lastItem}</strong> of{" "}
          <strong className="text-foreground font-bold">{totalItems}</strong> {unit}
        </div>

        {/* Controls - Only render buttons if totalPages > 1 */}
        {totalPages > 1 ? (
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {/* First Page Button (Desktop) */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => updatePage(1)}
              title="First Page"
              className="hidden sm:inline-flex size-8 rounded-lg border-border hover:bg-teal-500/10 hover:text-teal-600 hover:border-teal-500/30 disabled:opacity-40"
            >
              <ChevronsLeft className="size-3.5" />
            </Button>

            {/* Previous Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => updatePage(currentPage - 1)}
              className="h-8 px-2.5 rounded-lg border-border text-xs font-semibold hover:bg-teal-500/10 hover:text-teal-600 hover:border-teal-500/30 disabled:opacity-40 gap-1"
            >
              <ChevronLeft className="size-3.5" />
              <span className="hidden xs:inline">Prev</span>
            </Button>

            {/* Page Number Pills (Desktop/Tablet) */}
            <div className="hidden md:flex items-center gap-1">
              {pages.map((p, idx) => {
                if (typeof p === "string") {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-1 text-muted-foreground font-medium">
                      ...
                    </span>
                  );
                }
                const isCurrent = p === currentPage;
                return (
                  <button
                    key={`page-${p}`}
                    type="button"
                    onClick={() => updatePage(p)}
                    className={`size-8 rounded-lg text-xs font-bold transition-all border ${
                      isCurrent
                        ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                        : "bg-background border-border text-muted-foreground hover:bg-teal-500/10 hover:text-teal-600 hover:border-teal-500/30"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            {/* Compact Page Indicator (Mobile) */}
            <span className="md:hidden px-2 text-xs font-semibold text-muted-foreground">
              {currentPage} / {totalPages}
            </span>

            {/* Next Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => updatePage(currentPage + 1)}
              className="h-8 px-2.5 rounded-lg border-border text-xs font-semibold hover:bg-teal-500/10 hover:text-teal-600 hover:border-teal-500/30 disabled:opacity-40 gap-1"
            >
              <span className="hidden xs:inline">Next</span>
              <ChevronRight className="size-3.5" />
            </Button>

            {/* Last Page Button (Desktop) */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => updatePage(totalPages)}
              title="Last Page"
              className="hidden sm:inline-flex size-8 rounded-lg border-border hover:bg-teal-500/10 hover:text-teal-600 hover:border-teal-500/30 disabled:opacity-40"
            >
              <ChevronsRight className="size-3.5" />
            </Button>
          </div>
        ) : (
          <span className="text-[11px] font-semibold text-teal-600/80 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
            Page 1 of 1
          </span>
        )}
      </div>
    </nav>
  );
}

