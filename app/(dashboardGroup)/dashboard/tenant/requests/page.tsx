import GetTenantRentalRequest from "@/app/(dashboardGroup)/_components/GetTenantRentalRequest";
import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

const TenantRequestsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const { page } = await searchParams;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12 space-y-6">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-8 rounded-full" asChild>
              <Link href="/dashboard/tenant">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              <ClipboardList className="size-6 text-teal-600" /> My Rental Requests
            </h1>
          </div>
          <p className="text-xs text-muted-foreground pl-10">
            Track the status of your applications, read landlord feedback, and manage rental payments.
          </p>
        </div>

        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs" asChild>
          <Link href="/properties">
            Explore More Properties
          </Link>
        </Button>
      </div>

      {/* Main List */}
      <div>
        <GetTenantRentalRequest page={Number(page) || 1} />
      </div>
    </div>
  );
};

export default TenantRequestsPage;
