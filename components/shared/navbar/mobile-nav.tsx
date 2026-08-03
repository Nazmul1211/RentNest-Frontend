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
  LayoutDashboard
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
import { LogoutAction } from "@/app/(authGroup)/_actions/authAction";
import { UserData, normalizeRole } from "@/lib/user-utils";

interface MobileNavProps {
  pathname: string;
  user: UserData | null;
}

const PUBLIC_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Categories", href: "/categories" },
];

const ROLE_NAV_LINKS: Record<string, { label: string; href: string }[]> = {
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

const ROLE_BADGE_META: Record<string, { label: string; className: string }> = {
  tenant: {
    label: "Tenant",
    className: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-400",
  },
  landlord: {
    label: "Landlord",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  admin: {
    label: "Admin",
    className: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400",
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

  const isUserLoggedIn = Boolean(user && (user.id || user.email || user.name));
  const roleKey = isUserLoggedIn ? normalizeRole(user?.role) : "";
  const navLinks = isUserLoggedIn && ROLE_NAV_LINKS[roleKey] ? ROLE_NAV_LINKS[roleKey] : PUBLIC_LINKS;
  const roleMeta = roleKey ? ROLE_BADGE_META[roleKey] : null;

  const dashboardHref =
    roleKey === "admin"
      ? "/dashboard/admin"
      : roleKey === "landlord"
      ? "/dashboard/landlord"
      : "/dashboard/tenant";

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

      <SheetContent side="left" className="w-72 bg-white p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-3">
          <SheetTitle className="flex items-center gap-2 text-left">
            <Home className="size-5 text-cyan-600" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Rent<span className="text-cyan-600">Nest</span>
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* User Card if logged in */}
        {isUserLoggedIn && user ? (
          <div className="px-5 py-3 bg-slate-50 border-y border-slate-200 flex items-center gap-3">
            <Avatar className="size-10 border border-slate-200">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="size-full object-cover rounded-full"
                />
              ) : (
                <AvatarFallback className="bg-cyan-600 text-white text-xs font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 truncate">
                  {user.name}
                </span>
                {roleMeta && (
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-bold ${roleMeta.className}`}>
                    {roleMeta.label}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-slate-500 truncate">
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
                className={`flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-600 font-bold"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons Footer */}
        <div className="px-4 py-4 border-t border-slate-200 bg-white">
          {isUserLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs font-semibold" asChild>
                <Link href={dashboardHref} onClick={() => setOpen(false)}>
                  <LayoutDashboard className="size-4 text-cyan-600" />
                  Dashboard Workspace
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full justify-start gap-2 text-xs font-bold"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full text-xs font-semibold" asChild>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <LogIn className="size-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold" asChild>
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
