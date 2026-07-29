"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";

export interface NavLink {
  label: string;
  href: string;
}

const PUBLIC_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navlink = {
  tenant: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "My Requests", href: "/tenant/requests" },
    { label: "Payments", href: "/tenant/payments" },
  ],
  landlord: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "My Listings", href: "/landlord/listings" },
    { label: "Rental Requests", href: "/landlord/requests" },
    { label: "Create Property", href: "/landlord/create" },
  ],
  admin: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Users", href: "/admin/users" },
    { label: "Properties", href: "/admin/properties" },
    { label: "Rentals", href: "/admin/rentals" },
    { label: "Categories", href: "/admin/categories" },
  ],
};

const ROLE_BADGE_VARIANT = {
  tenant: {
    label: "Tenant",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  landlord: {
    label: "Landlord",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  admin: {
    label: "Admin",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
};

export function Navbar() {
  const pathname = usePathname();
  //   const { user } = useAuth();

  console.log(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight shrink-0"
            aria-label="RentNest home"
          >
            <Home className="size-5 text-primary" aria-hidden="true" />
            <span className="text-foreground">
              Rent<span className="text-primary">Nest</span>
            </span>
          </Link>



          <nav className="hidden md:flex items-center gap-6">
            {PUBLIC_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </nav>


        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Guest auth buttons — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">
                <LogIn data-icon="inline-start" />
                Login
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">
                <UserPlus data-icon="inline-start" />
                Register
              </Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
