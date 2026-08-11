"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, DollarSign, Clock, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HandleMakeRentalRequestByOnClick from "./HandleMakeRentalRequestByOnClick";
import PaymentDetailsModal from "./PaymentDetailsModal";
import GetStatusBadge from "./GetStatusBadge";
import CreateReviewModal from "./CreateReviewModal";
import DashboardPagination from "./DashboardPagination";
import DashboardSearchFilter from "./DashboardSearchFilter";

interface TenantRequestListWithFilterProps {
  rentalRequests: any[];
  reviewsList: any[];
  page?: number;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function TenantRequestListWithFilter({
  rentalRequests = [],
  reviewsList = [],
  page = 1,
}: TenantRequestListWithFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredRequests = rentalRequests.filter((req) => {
    const matchesSearch =
      req.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.propertyId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.property?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.tenantMessage?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || req.status?.toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const visibleRequests = filteredRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
  };

  return (
    <div className="space-y-4 my-4">
      {/* Live Search & Status Filter */}
      <DashboardSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search your requests by property title or ID..."
        filters={[
          {
            id: "status",
            label: "Request Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Statuses", value: "ALL" },
              { label: "Pending", value: "PENDING" },
              { label: "Approved", value: "APPROVED" },
              { label: "Rejected", value: "REJECTED" },
              { label: "Paid", value: "PAID" },
            ],
          },
        ]}
        onReset={resetFilters}
      />

      {filteredRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-xl bg-card/40 text-center space-y-3">
          <div className="size-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
            <FileText className="size-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-foreground text-sm">No Rental Requests Found</h4>
            <p className="text-xs text-muted-foreground max-w-sm">
              No submitted requests match your search query or status criteria.
            </p>
          </div>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-bold" asChild>
            <Link href="/properties">
              Browse Properties <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleRequests.map((req) => {
              const existingReview = reviewsList.find(
                (r) =>
                  r.rentalRequestId === req.id ||
                  (r.tenantId === req.tenantId && r.propertyId === req.propertyId)
              );

              return (
                <div
                  key={req.id}
                  className="p-5 rounded-xl border border-border/50 bg-card hover:border-teal-500/30 transition-all shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/40">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        Request #{req.id?.slice(0, 8)}...
                      </span>
                      <h4 className="text-base font-bold text-foreground">
                        {req.property?.title || `Property ID: ${req.propertyId}`}
                      </h4>
                    </div>

                    <div className="flex gap-4 items-center">
                      <GetStatusBadge status={req.status} />
                      <HandleMakeRentalRequestByOnClick req={req} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1 bg-muted/30 p-2.5 rounded-lg">
                      <span className="text-muted-foreground flex items-center gap-1 font-medium">
                        <Calendar className="size-3.5 text-teal-600" /> Lease Duration
                      </span>
                      <p className="font-semibold text-foreground">
                        {formatDate(req.moveInDate)} &rarr; {formatDate(req.moveOutDate)}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        ({req.totalMonths} Month{req.totalMonths > 1 ? "s" : ""})
                      </p>
                    </div>

                    <div className="space-y-1 bg-muted/30 p-2.5 rounded-lg">
                      <span className="text-muted-foreground flex items-center gap-1 font-medium">
                        <DollarSign className="size-3.5 text-teal-600" /> Rent & Total
                      </span>
                      <p className="font-semibold text-foreground">
                        ৳{Number(req.monthlyRent || 0).toLocaleString()} / mo
                      </p>
                      <p className="text-[11px] text-teal-600 font-bold">
                        Total: ৳{Number(req.totalAmount || 0).toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-1 bg-muted/30 p-2.5 rounded-lg">
                      <span className="text-muted-foreground flex items-center gap-1 font-medium">
                        <Clock className="size-3.5 text-teal-600" /> Submitted On
                      </span>
                      <p className="font-semibold text-foreground">{formatDate(req.createdAt)}</p>
                      <p className="text-[11px] text-muted-foreground">Status: {req.status}</p>
                    </div>
                  </div>

                  {req.tenantMessage && (
                    <div className="p-3 bg-muted/20 rounded-lg text-xs space-y-1 border border-border/30">
                      <span className="font-bold text-foreground text-[11px] uppercase tracking-wide">
                        Your Message:
                      </span>
                      <p className="text-muted-foreground leading-relaxed">{req.tenantMessage}</p>
                    </div>
                  )}

                  {req.landlordNote && (
                    <div className="p-3 bg-amber-500/10 rounded-lg text-xs space-y-1 border border-amber-500/20 text-amber-700 dark:text-amber-400">
                      <span className="font-bold text-[11px] uppercase tracking-wide flex items-center gap-1">
                        <AlertCircle className="size-3" /> Landlord Note:
                      </span>
                      <p className="leading-relaxed">{req.landlordNote}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
                    <div className="flex items-center gap-2">
                      <PaymentDetailsModal payments={req.payments} />
                      {(req.status === "PAID" || req.status === "COMPLETED") && (
                        <CreateReviewModal
                          rentalRequestId={req.id}
                          tenantId={req.tenantId}
                          propertyTitle={req.property?.title}
                          existingReview={existingReview}
                        />
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-semibold text-teal-600 hover:text-teal-700 p-0 h-auto"
                      asChild
                    >
                      <Link href={`/properties/${req.propertyId}`}>
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
            totalItems={filteredRequests.length}
            pageSize={pageSize}
            unit="requests"
          />
        </>
      )}
    </div>
  );
}
