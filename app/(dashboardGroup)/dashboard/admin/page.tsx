import { Button } from "@/components/ui/button";
import getCurrentUser from "@/lib/auth";
import Link from "next/link";
import { Users, Building2, ClipboardList, ArrowRight } from "lucide-react";
import DashboardSidebar from "../../_components/DashboardSidebar";
import DashboardAnalyticsCharts from "../../_components/DashboardAnalyticsCharts";

const AdminDashboardPage = async () => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data || null;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Dashboard Sidebar Navigation */}
        <DashboardSidebar
          userRole={user?.role || "ADMIN"}
          userName={user?.name || "Administrator"}
          userEmail={user?.email || ""}
          userPhoto={user?.profilePhoto}
        />

        {/* Right Section: Analytics Charts & Feature Cards */}
        <section className="flex-1 w-full space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">Admin Workspace</h3>
            <p className="text-xs text-muted-foreground">Control user accounts, landlord listings, applications, and system analytics.</p>
          </div>

          {/* Dynamic Analytics Charts */}
          <DashboardAnalyticsCharts role="ADMIN" />

          <div className="space-y-4">
            <h4 className="text-base font-bold text-foreground">Management Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Feature 1: Registered Platform Users */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
                <div className="space-y-3">
                  <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <Users className="size-6" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">User Management</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    View, filter, and manage all registered tenants, landlords, and administrators.
                  </p>
                </div>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                  <Link href="/dashboard/admin/users" className="flex items-center justify-center gap-2">
                    Manage Users <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              {/* Feature 2: Landlord Properties */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
                <div className="space-y-3">
                  <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <Building2 className="size-6" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">Landlord Properties</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Inspect all landlord property listings, availability statuses, and published details.
                  </p>
                </div>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                  <Link href="/dashboard/admin/properties" className="flex items-center justify-center gap-2">
                    All Properties <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              {/* Feature 3: Rental Requests */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
                <div className="space-y-3">
                  <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <ClipboardList className="size-6" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">Rental Requests</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Track tenant rental applications, lease dates, and payment transaction logs.
                  </p>
                </div>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                  <Link href="/dashboard/admin/rental-requests" className="flex items-center justify-center gap-2">
                    Rental Requests <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;