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
import { ThemeToggle } from "@/components/shared/theme-toggle";
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
  { label: "About Us", href: "/about" },
];

const ROLE_NAV_LINKS: Record<string, { label: string; href: string }[]> = {
  tenant: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
    { label: "Dashboard", href: "/dashboard/tenant" },
    { label: "My Requests", href: "/dashboard/tenant/requests" },
  ],
  landlord: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Categories", href: "/categories" },
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
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
  ],
};

const ROLE_BADGE_META: Record<string, { label: string; className: string }> = {
  tenant: {
    label: "Tenant",
    className: "bg-teal-500/10 text-teal-600 border-teal-500/20 dark:bg-teal-950/60 dark:text-teal-400",
  },
  landlord: {
    label: "Landlord",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  admin: {
    label: "Admin",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-950/60 dark:text-amber-400",
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
          className="md:hidden text-foreground hover:bg-muted"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 max-w-[85vw] bg-white dark:bg-[#182630] text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 p-0 flex flex-col shadow-2xl opacity-100">
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#182630]">
          <SheetTitle className="flex items-center gap-2 text-left">
            <Home className="size-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Rent<span className="text-teal-600 dark:text-teal-400">Nest</span>
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* User Card if logged in */}
        {isUserLoggedIn && user ? (
          <div className="px-5 py-3.5 bg-slate-50 dark:bg-[#22333f] border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Avatar className="size-10 border border-slate-200 dark:border-slate-700">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="size-full object-cover rounded-full"
                />
              ) : (
                <AvatarFallback className="bg-teal-600 text-white text-xs font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {user.name}
                </span>
                {roleMeta && (
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-bold ${roleMeta.className}`}>
                    {roleMeta.label}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user.email}
              </span>
            </div>
          </div>
        ) : (
          <Separator className="opacity-50" />
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto bg-white dark:bg-[#182630]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-l-4 border-teal-600"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#22333f] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons Footer */}
        <div className="px-5 py-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#1d2d39]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>
          {isUserLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs font-semibold border-slate-200 dark:border-slate-700 bg-white dark:bg-[#22333f]" asChild>
                <Link href={dashboardHref} onClick={() => setOpen(false)}>
                  <LayoutDashboard className="size-4 text-teal-600 dark:text-teal-400" />
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
              <Button variant="outline" className="w-full text-xs font-semibold border-slate-200 dark:border-slate-700 bg-white dark:bg-[#22333f]" asChild>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <LogIn className="size-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs" asChild>
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
