import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GetRentalRequestsOfLandlordProperties, LandlordRentalRequest } from '@/app/(dashboardGroup)/_action/LandlordAction';
import LandlordRentalRequestCard from '@/app/(dashboardGroup)/_components/LandlordRentalRequestCard';

const PropertiesRentalRequest = async () => {
    const rentalRequests: LandlordRentalRequest[] = await GetRentalRequestsOfLandlordProperties();

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-foreground">
                        Property Rental Requests
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Review, approve, or reject incoming tenant rental applications for your properties.
                    </p>
                </div>

                <Button variant="outline" size="sm" asChild className="shrink-0 text-xs font-semibold">
                    <Link href="/dashboard/landlord">
                        <ArrowLeft className="size-3.5 mr-1" /> Back to Dashboard
                    </Link>
                </Button>
            </div>


            {/* Requests List or Empty State */}
            {!rentalRequests || rentalRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-2xl bg-card/40 text-center space-y-3">
                    <div className="size-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600">
                        <FileText className="size-6" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold text-foreground text-sm">No Rental Requests Found</h4>
                        <p className="text-xs text-muted-foreground max-w-sm">
                            There are currently no tenant rental applications for your properties.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rentalRequests.map((req) => (
                        <LandlordRentalRequestCard key={req.id} req={req} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertiesRentalRequest;


