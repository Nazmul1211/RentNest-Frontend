
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import GetAllPropertiesOfLandlords from "@/app/(dashboardGroup)/_components/GetAllPropertiesOfLandlords";


export default async function AdminPropertiesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12 space-y-6">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-xs font-semibold text-muted-foreground hover:text-teal-600 mb-1 -ml-2"
          >
            <Link href="/dashboard/admin" className="flex items-center gap-1">
              <ArrowLeft className="size-4" /> Back to Admin Dashboard
            </Link>
          </Button>
          <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Building2 className="size-6 text-teal-600" /> All Landlord Properties
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Overview of all property listings published by landlords across RentNest.
          </p>
        </div>
      </div>


      {/* Properties List */}
      <section>
        <GetAllPropertiesOfLandlords page={Number(page) || 1} />
      </section>
    </div>
  );
}
