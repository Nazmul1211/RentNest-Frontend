"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Home,
  LogIn,
  UserPlus,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserData } from "./user-dropdown";
import { LogoutAction } from "@/app/(authGroup)/_actions/authAction";

interface MobileNavProps {
  pathname: string;
  user: UserData | null;
}

const PUBLIC_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const ROLE_NAV_LINKS: Record<string, { label: string; href: string }[]> = {
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

const ROLE_BADGE_META: Record<string, { label: string; className: string }> = {
  tenant: {
    label: "Tenant",
    className: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400",
  },
  landlord: {
    label: "Landlord",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  admin: {
    label: "Admin",
    className: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400",
  },
};

function getInitials(name: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function MobileNav({ pathname, user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const roleKey = user?.role?.toLowerCase() || "";
  const navLinks = user && ROLE_NAV_LINKS[roleKey] ? ROLE_NAV_LINKS[roleKey] : PUBLIC_LINKS;
  const roleMeta = roleKey ? ROLE_BADGE_META[roleKey] : null;

  const handleLogout = async () => {
    setOpen(false);
    await LogoutAction();
    router.push("/login");
    router.refresh();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-3">
          <SheetTitle className="flex items-center gap-2 text-left">
            <Home className="size-5 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Rent<span className="text-primary">Nest</span>
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* User Card if logged in */}
        {user ? (
          <div className="px-5 py-3 bg-muted/40 border-y border-border/40 flex items-center gap-3">
            <Avatar className="size-10 border border-border">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="size-full object-cover rounded-full"
                />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground truncate">
                  {user.name}
                </span>
                {roleMeta && (
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-bold ${roleMeta.className}`}>
                    {roleMeta.label}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground truncate">
                {user.email}
              </span>
            </div>
          </div>
        ) : (
          <Separator />
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons Footer */}
        <div className="px-4 py-4 border-t border-border bg-card">
          {user ? (
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2" asChild>
                <Link href="/profile" onClick={() => setOpen(false)}>
                  <UserIcon className="size-4" />
                  Profile
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <LogIn className="size-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" asChild>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <UserPlus className="size-4 mr-2" />
                  Register
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
