"use client";

import Link from "next/link";
import { Home, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserData, normalizeRole } from "@/lib/user-utils";

interface FooterProps {
  user?: UserData | null;
}

export function Footer({ user }: FooterProps) {
  const roleKey = user ? normalizeRole(user.role) : "";

  // Dynamic quick links based on user role
  const getQuickLinks = () => {
    if (roleKey === "landlord") {
      return [
        { label: "Home", href: "/" },
        { label: "Browse Properties", href: "/properties" },
        { label: "My Properties", href: "/dashboard/landlord/properties" },
        { label: "Rental Requests", href: "/dashboard/landlord/rental-request" },
        { label: "Create Property", href: "/dashboard/landlord/create-properties" },
      ];
    }

    if (roleKey === "admin") {
      return [
        { label: "Home", href: "/" },
        { label: "Admin Workspace", href: "/dashboard/admin" },
        { label: "User Management", href: "/dashboard/admin/users" },
        { label: "All Properties", href: "/dashboard/admin/properties" },
        { label: "Rental Requests", href: "/dashboard/admin/rental-requests" },
      ];
    }

    if (roleKey === "tenant") {
      return [
        { label: "Home", href: "/" },
        { label: "Browse Properties", href: "/properties" },
        { label: "Categories", href: "/categories" },
        { label: "Tenant Dashboard", href: "/dashboard/tenant" },
      ];
    }

    return [
      { label: "Home", href: "/" },
      { label: "Properties", href: "/properties" },
      { label: "Categories", href: "/categories" },
      { label: "Sign In", href: "/login" },
      { label: "Register", href: "/register" },
    ];
  };

  const quickLinks = getQuickLinks();

  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-start">

          {/* Brand Column */}
          <div className="space-y-3 max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground w-fit"
              aria-label="RentNest home"
            >
              <Home className="size-5 text-teal-600" aria-hidden="true" />
              <span>
                Rent<span className="text-teal-600">Nest</span>
              </span>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Connecting tenants and landlords with modern property listings and simplified rental management workflows.
            </p>

            <div className="flex flex-col gap-1.5 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-teal-600" />
                <a href="mailto:support@rentnest.com" className="hover:text-foreground transition-colors">
                  support@rentnest.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-teal-600" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-teal-600 transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-teal-600 transition-colors font-medium">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-teal-600 transition-colors font-medium">
                    Blog & Insights
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-teal-600 transition-colors font-medium">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform & Legal */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/properties" className="text-muted-foreground hover:text-teal-600 transition-colors font-medium">
                    All Listings
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-muted-foreground hover:text-teal-600 transition-colors font-medium">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-teal-600 transition-colors font-medium">
                    Terms & Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <Separator className="my-8 opacity-60" />

        {/* Bottom copyright and legal quicklinks */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RentNest. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-medium">
            <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-teal-600 transition-colors">Blog</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-teal-600 transition-colors">Terms & Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
