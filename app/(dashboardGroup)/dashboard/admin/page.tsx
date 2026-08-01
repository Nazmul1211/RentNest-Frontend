
import getCurrentUser from "@/lib/auth";
import GetAllTenantRentalRequest from "../../_components/GetAllTenantRentalRequest";
import GetAllPropertiesOfLandlords from "../../_components/GetAllPropertiesOfLandlords";
import GetAllUsers from "../../_components/GetAllUsers";



const AdminDashboardPage = async () => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data || null;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* LeftSidebar: User Profile Card */}
        <section className="w-full lg:w-80 p-6 space-y-4 bg-card rounded-2xl shadow-sm border border-border/50 shrink-0">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-600">
              Admin Dashboard
            </h3>
            <h2 className="text-2xl font-extrabold text-foreground">
              Welcome back!
            </h2>
            <p className="text-lg font-bold text-cyan-600">
              {user?.name}
            </p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
            Control all rental requests, applications, and lease agreements in one central workspace.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tenant Rental Requests */}
          <section className="w-full rounded-2xl shadow-sm bg-card border border-border/50 p-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                All Rental Requests From Tenants
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Review and respond to all rental applications from tenants.
              </p>
            </div>

            {/* Tenant Rental Requests */}
            <GetAllTenantRentalRequest />
          </section>

          {/* Get All Properties Of Landlords */}
          <section className="w-full lg:w-96 p-6 space-y-4 bg-card rounded-2xl shadow-sm border border-border/50 shrink-0">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                All Properties For Landlords
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage all properties and bookings
              </p>
            </div>
            <GetAllPropertiesOfLandlords />
          </section>

          {/* Get All Users */}
          <section className="w-full rounded-2xl shadow-sm bg-card border border-border/50 p-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Registered Platform Users
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                View and manage all registered tenants, landlords, and administrators.
              </p>
            </div>
            <GetAllUsers />
          </section>
        </section>
      </div>
    </div>
  );
}


export default AdminDashboardPage