import Link from "next/link";
import { Building2, PlusCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LandlordPropertyCard from "@/app/(dashboardGroup)/_components/LandlordPropertyCard";
import { GetAllLandlordProperties } from "@/app/(dashboardGroup)/_action/LandlordAction";
import DashboardPagination from "@/app/(dashboardGroup)/_components/DashboardPagination";



const PropertiesPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
    const properties = await GetAllLandlordProperties();
    const pageSize = 6;
    const totalPages = Math.max(1, Math.ceil((properties?.length || 0) / pageSize));
    const currentPage = Math.min(Math.max(Number((await searchParams).page) || 1, 1), totalPages);
    const visibleProperties = properties?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-foreground">
                        My Properties
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Manage your property listings, edit information, or delete properties.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Button variant="outline" size="sm" asChild className="text-xs font-semibold">
                        <Link href="/dashboard/landlord">
                            <ArrowLeft className="size-3.5 mr-1" /> Back
                        </Link>
                    </Button>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold gap-1" asChild>
                        <Link href="/dashboard/landlord/create-properties">
                            <PlusCircle className="size-3.5" /> Create Property
                        </Link>
                    </Button>
                </div>
            </div>


            {/* Content Section */}
            {!properties || properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-2xl bg-card/40 text-center space-y-3">
                    <div className="size-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
                        <Building2 className="size-6" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold text-foreground text-sm">No Properties Found</h4>
                        <p className="text-xs text-muted-foreground max-w-sm">
                            You haven't listed any properties yet. Start by publishing your first rental property!
                        </p>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold gap-1" asChild>
                        <Link href="/dashboard/landlord/create-properties">
                            <PlusCircle className="size-3.5" /> Create Your First Property
                        </Link>
                    </Button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {visibleProperties.map((property: any) => (
                            <LandlordPropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                    <DashboardPagination currentPage={currentPage} totalPages={totalPages} totalItems={properties?.length || 0} pageSize={pageSize} unit="properties" />
                </>
            )}
        </div>
    );
};

export default PropertiesPage;
