import { Button } from '@/components/ui/button';
import getCurrentUser from '@/lib/auth';
import Link from 'next/link';
import { PlusCircle, Building2, ClipboardList, ArrowRight } from 'lucide-react';

const AuthorDashboardPage = async () => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data || null;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Left Sidebar: Landlord Profile Card */}
        <section className="w-full lg:w-80 p-6 space-y-4 bg-card rounded-2xl shadow-sm border border-border/50 shrink-0">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Landlord Workspace
            </h3>
            <h2 className="text-2xl font-extrabold text-foreground">
              Welcome back!
            </h2>
            <p className="text-lg font-bold text-teal-600">
              {user?.name || "Landlord"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user?.email}
            </p>
            <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-700 capitalize">
              Role: {user?.role || "LANDLORD"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
            Manage your properties, handle tenant rental applications, and control all listings in one central dashboard.
          </p>
        </section>

        {/* Right Section: 3 Main Feature Cards */}
        <section className="flex-1 w-full space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">Landlord Features</h3>
            <p className="text-xs text-muted-foreground">Select a category below to manage your property listings and tenant requests.</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Feature 1: Create Property */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
              <div className="space-y-3">
                <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  <PlusCircle className="size-6" />
                </div>
                <h4 className="text-base font-bold text-foreground">Create Property</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Publish a new property listing with rental details, location, and photos.
                </p>
              </div>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                <Link href="/dashboard/landlord/create-properties" className="flex items-center justify-center gap-2">
                  Create Property <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>


            {/* Feature 2: Manage Properties (Property Cards with Delete Confirmation) */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
              <div className="space-y-3">
                <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  <Building2 className="size-6" />
                </div>
                <h4 className="text-base font-bold text-foreground">My Properties</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  View your property listings, update details, or delete properties with modal confirmation.
                </p>
              </div>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                <Link href="/dashboard/landlord/properties" className="flex items-center justify-center gap-2">
                  Manage Properties <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>


            {/* Feature 3: Rental Requests (Requests with Approve & Reject buttons) */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xs transition-all">
              <div className="space-y-3">
                <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  <ClipboardList className="size-6" />
                </div>
                <h4 className="text-base font-bold text-foreground">Rental Requests</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Review tenant applications, approve or reject rental requests directly.
                </p>
              </div>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                <Link href="/dashboard/landlord/rental-request" className="flex items-center justify-center gap-2">
                  Rental Requests <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorDashboardPage;

