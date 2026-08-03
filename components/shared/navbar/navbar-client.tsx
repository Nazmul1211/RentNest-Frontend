"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { UserDropdown } from "./user-dropdown";
import { UserData, normalizeRole } from "@/lib/user-utils";

export interface NavLink {
  label: string;
  href: string;
}

const PUBLIC_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Categories", href: "/categories" },
];

const ROLE_NAV_LINKS: Record<string, NavLink[]> = {
  tenant: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Categories", href: "/categories" },
    { label: "Dashboard", href: "/dashboard/tenant" },
  ],
  landlord: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Dashboard", href: "/dashboard/landlord" },
    { label: "My Properties", href: "/dashboard/landlord/properties" },
    { label: "Rental Requests", href: "/dashboard/landlord/rental-request" },
    { label: "Create Property", href: "/dashboard/landlord/create-properties" },
  ],
  admin: [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard/admin" },
    { label: "Users", href: "/dashboard/admin/users" },
    { label: "Properties", href: "/dashboard/admin/properties" },
    { label: "Requests", href: "/dashboard/admin/rental-requests" },
  ],
};

interface NavbarClientProps {
  user: UserData | null;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();

  const isUserLoggedIn = Boolean(user && (user.id || user.email || user.name));
  const roleKey = isUserLoggedIn ? normalizeRole(user?.role) : "";
  const navLinks = isUserLoggedIn && ROLE_NAV_LINKS[roleKey] ? ROLE_NAV_LINKS[roleKey] : PUBLIC_LINKS;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight shrink-0"
          aria-label="RentNest home"
        >
          <Home className="size-5 text-cyan-600" aria-hidden="true" />
          <span className="text-foreground">
            Rent<span className="text-cyan-600">Nest</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold transition-colors hover:text-cyan-600 ${
                  isActive ? "text-cyan-600 font-bold" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {isUserLoggedIn ? (
            /* Logged in User Profile Dropdown */
            <div className="flex items-center gap-2">
              <UserDropdown user={user!} />
            </div>
          ) : (
            /* Guest auth buttons — desktop */
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="text-xs font-semibold">
                <Link href="/login">
                  <LogIn className="size-4 mr-1.5" />
                  Login
                </Link>
              </Button>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold" asChild>
                <Link href="/register">
                  <UserPlus className="size-4 mr-1.5" />
                  Register
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Hamburger */}
          <MobileNav pathname={pathname} user={user} />
        </div>
      </div>
    </header>
  );
}
