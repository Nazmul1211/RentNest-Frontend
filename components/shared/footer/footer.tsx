"use client";

import Link from "next/link";
import { Home, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
          
          {/* Brand Column */}
          <div className="space-y-3 max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground w-fit"
              aria-label="RentNest home"
            >
              <Home className="size-5 text-cyan-600" aria-hidden="true" />
              <span>
                Rent<span className="text-cyan-600">Nest</span>
              </span>
            </Link>
            
            <p className="text-xs text-muted-foreground leading-relaxed">
              Connecting tenants and landlords with modern property listings and simple rental management.
            </p>

            <div className="flex flex-col gap-1.5 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-cyan-600" />
                <a href="mailto:support@rentnest.com" className="hover:text-foreground transition-colors">
                  support@rentnest.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-cyan-600" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="flex gap-12 sm:gap-16">
            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Explore
              </h3>
              <ul className="space-y-2 text-xs">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-cyan-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-2 text-xs">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-cyan-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <Separator className="my-8" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RentNest. All rights reserved.</p>
          <p className="text-[11px]">Designed for modern home rentals.</p>
        </div>
      </div>
    </footer>
  );
}
