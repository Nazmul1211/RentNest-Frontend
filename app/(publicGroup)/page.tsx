
// import { RoleSwitcher } from "@/components/shared/navbar/role-switcher";
import { Home, Building2, Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-16 text-center">
      {/* Hero */}
      <div className="flex flex-col items-center gap-6 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center size-14 rounded-2xl bg-primary/10">
            <Home className="size-7 text-primary" aria-hidden="true" />
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">
            Rent<span className="text-primary">Nest</span>
          </h1>
        </div>

        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
          A modern rental marketplace connecting tenants and landlords.
          Search properties, manage listings, and track rentals — all in one place.
        </p>
      </div>

    </div>
  );
}
