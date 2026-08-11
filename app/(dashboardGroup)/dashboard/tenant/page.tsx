import { Button } from "@/components/ui/button";
import getCurrentUser from "@/lib/auth";
import Link from "next/link";
import { Building2, ClipboardList, LayoutGrid, ArrowRight, UserCheck } from "lucide-react";
import GetTenantRentalRequest from "../../_components/GetTenantRentalRequest";

const TenantDashboardPage = async () => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data || null;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Left Sidebar: Tenant Profile Card */}
        <section className="w-full lg:w-80 p-6 space-y-4 bg-card rounded-2xl shadow-sm border border-border/50 shrink-0">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 flex items-center gap-1">
              <UserCheck className="size-4" /> Tenant Workspace
            </h3>
            <h2 className="text-2xl font-extrabold text-foreground">
              Welcome back!
            </h2>
            <p className="text-lg font-bold text-teal-600">
              {user?.name || "Tenant"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user?.email}
            </p>
            <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-700 capitalize">
              Role: {user?.role || "TENANT"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
            Manage your rental applications, explore properties, and track payment transactions in one central workspace.
          </p>
        </section>

        {/* Right Section: 3 Main Feature Cards + Quick Requests */}
        <section className="flex-1 w-full space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">Tenant Features</h3>
            <p className="text-xs text-muted-foreground">Select an option below to manage your applications, explore listings, or view categories.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            {/* Feature: My Rental Requests */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
              <div className="space-y-3">
                <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  <ClipboardList className="size-6" />
                </div>
                <h4 className="text-base font-bold text-foreground">My Rental Requests</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Track application status, read landlord notes, and manage lease payments.
                </p>
              </div>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs">
                <Link href="/dashboard/tenant/requests" className="flex items-center justify-center gap-2">
                  My Applications <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>


            {/* Browse Properties */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
              <div className="space-y-3">
                <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  <Building2 className="size-6" />
                </div>
                <h4 className="text-base font-bold text-foreground">Browse Properties</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Discover available rental listings, filter by location or budget, and apply directly.
                </p>
              </div>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs">
                <Link href="/properties" className="flex items-center justify-center gap-2">
                  Explore Homes <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>


            {/* Categories */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
              <div className="space-y-3">
                <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  <LayoutGrid className="size-6" />
                </div>
                <h4 className="text-base font-bold text-foreground">Categories</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Filter property listings by category types, popular neighborhoods, and amenities.
                </p>
              </div>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs">
                <Link href="/categories" className="flex items-center justify-center gap-2">
                  View Categories <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

          </div>


          {/* Quick Rental Requests List */}
          <div className="bg-card rounded-2xl mt-16 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3">
              <div>
                <h3 className="text-lg font-bold text-foreground">Your Recent Applications</h3>
                <p className="text-xs text-muted-foreground">Quick overview of your submitted rental requests.</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-semibold text-teal-600 border-teal-500/30" asChild>
                <Link href="/dashboard/tenant/requests">
                  View All Requests &rarr;
                </Link>
              </Button>
            </div>

            <GetTenantRentalRequest />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TenantDashboardPage;
