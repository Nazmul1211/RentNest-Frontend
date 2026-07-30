import React from "react";
import getCurrentUser from "@/lib/auth";
import GetTenantRentalRequest from "../../_components/GetTenantRentalRequest";

export default async function TenantDashboardPage() {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data || null;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* User Profile Card */}
        <section className="w-full lg:w-80 p-6 space-y-4 bg-card rounded-2xl shadow-sm border border-border/50 shrink-0">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-600">
              Tenant Dashboard
            </h3>
            <h2 className="text-2xl font-extrabold text-foreground">
              Welcome back!
            </h2>
            <p className="text-lg font-bold text-cyan-600">
              {user?.name}
            </p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
            Manage all your rental requests, applications, and lease agreements in one central workspace.
          </p>
        </section>

        {/* Tenant Rental Requests */}
        <section className="flex-1 w-full rounded-2xl shadow-sm bg-card border border-border/50 p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
              Your Rental Requests
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Track the status of your applications and contact landlords directly.
            </p>
          </div>

          {/* Tenant Rental Requests */}
          <GetTenantRentalRequest />
        </section>
      </div>
    </div>
  );
}