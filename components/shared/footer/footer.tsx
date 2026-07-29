"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

// Social icons as inline SVG components (removed from lucide-react)
function IconTwitterX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const FOOTER_LINKS = {
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
    ],
  },
  renters: {
    title: "For Renters",
    links: [
      { label: "Browse Properties", href: "/properties" },
      { label: "Categories", href: "/categories" },
      { label: "Rental Guide", href: "/guide/renters" },
      { label: "Payment Options", href: "/payments" },
      { label: "Tenant FAQ", href: "/faq/tenant" },
    ],
  },
  landlords: {
    title: "For Landlords",
    links: [
      { label: "List a Property", href: "/landlord/create" },
      { label: "Pricing", href: "/pricing" },
      { label: "Landlord Guide", href: "/guide/landlords" },
      { label: "Rental Management", href: "/landlord/listings" },
      { label: "Landlord FAQ", href: "/faq/landlord" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
};

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://twitter.com", icon: IconTwitterX },
  { label: "LinkedIn", href: "https://linkedin.com", icon: IconLinkedin },
  { label: "Instagram", href: "https://instagram.com", icon: IconInstagram },
  { label: "Facebook", href: "https://facebook.com", icon: IconFacebook },
];

const CONTACT_ITEMS = [
  { icon: Mail, text: "support@rentnest.com", href: "mailto:support@rentnest.com" },
  { icon: Phone, text: "+1 (800) 736-8637", href: "tel:+18007368637" },
  { icon: MapPin, text: "San Francisco, CA", href: null },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Top strip — newsletter / CTA */}
      <div className="bg-primary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Get new listings in your inbox
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Stay ahead of the market — new properties delivered weekly.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full sm:w-auto gap-2"
          >
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Email address for newsletter"
              className="h-9 flex-1 sm:w-64 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            />
            <button
              type="submit"
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main link columns */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link
              href="/"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors w-fit"
            >
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Building2 className="size-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">RentNest</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              The modern rental marketplace connecting tenants and landlords
              with smart search and seamless management.
            </p>

            {/* Contact */}
            <ul className="flex flex-col gap-2.5">
              {CONTACT_ITEMS.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center gap-2.5">
                  <Icon className="size-3.5 text-muted-foreground shrink-0" />
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{text}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`RentNest on ${label}`}
                  className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <Separator />
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} RentNest, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
