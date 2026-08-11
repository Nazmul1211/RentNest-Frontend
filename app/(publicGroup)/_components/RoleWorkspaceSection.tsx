import Link from "next/link";
import { ArrowRight, Building2, Shield, UserRound } from "lucide-react";

const workspaces = [
  {
    title: "For tenants",
    description:
      "Track your rental requests, review their status, and continue toward a secure tenancy.",
    action: "Explore tenant workspace",
    href: "/dashboard/tenant",
    icon: UserRound,
  },
  {
    title: "For landlords",
    description:
      "Publish properties, review incoming requests, and manage your listings from one dashboard.",
    action: "Explore landlord workspace",
    href: "/dashboard/landlord",
    icon: Building2,
  },
  {
    title: "For administrators",
    description:
      "Oversee users, listings, and rental activity with the platform-management tools you need.",
    action: "Explore admin workspace",
    href: "/dashboard/admin",
    icon: Shield,
  },
];

export default function RoleWorkspaceSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            One platform, three focused workspaces
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            The right tools for every part of the rental journey.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            RentNest changes with your role, keeping the next useful action close at hand instead of making every user work through the same dashboard.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {workspaces.map(({ title, description, action, href, icon: Icon }) => (
            <article key={title} className="group flex min-h-64 flex-col border-t-2 border-border/50 px-1 pt-6 transition-colors hover:border-primary">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="mt-6 space-y-2">
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
              <Link
                href={href}
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-primary transition-colors hover:text-primary/75"
              >
                {action}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
