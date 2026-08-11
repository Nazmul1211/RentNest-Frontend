"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
  PlusCircle,
  User,
  Menu,
  X,
  Compass,
  LayoutGrid,
  ShieldCheck,
  UserCheck,
  Building
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  userRole?: string;
  userName?: string;
  userEmail?: string;
  userPhoto?: string | null;
}

export default function DashboardSidebar({
  userRole = "TENANT",
  userName = "User",
  userEmail = "",
  userPhoto = null,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const role = userRole?.toUpperCase() || "TENANT";

  // Build menu items depending on role
  let menuItems: { href: string; label: string; icon: React.ElementType; badge?: string }[] = [];

  if (role === "ADMIN") {
    menuItems = [
      { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/admin/users", label: "Manage Users", icon: Users, badge: "Admin" },
      { href: "/dashboard/admin/properties", label: "Manage Properties", icon: Building2 },
      { href: "/dashboard/admin/rental-requests", label: "Rental Requests", icon: ClipboardList },
      { href: "/dashboard/profile", label: "My Profile", icon: User },
      { href: "/properties", label: "Browse Properties", icon: Compass },
    ];
  } else if (role === "LANDLORD") {
    menuItems = [
      { href: "/dashboard/landlord", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/landlord/properties", label: "My Properties", icon: Building2 },
      { href: "/dashboard/landlord/rental-request", label: "Rental Requests", icon: ClipboardList },
      { href: "/dashboard/landlord/create-properties", label: "Create Property", icon: PlusCircle },
      { href: "/dashboard/profile", label: "My Profile", icon: User },
    ];
  } else {
    // Tenant
    menuItems = [
      { href: "/dashboard/tenant", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/tenant/requests", label: "My Applications", icon: ClipboardList },
      { href: "/properties", label: "Explore Homes", icon: Compass },
      { href: "/categories", label: "Categories", icon: LayoutGrid },
      { href: "/dashboard/profile", label: "My Profile", icon: User },
    ];
  }

  const getRoleIcon = () => {
    if (role === "ADMIN") return <ShieldCheck className="size-4 text-amber-500" />;
    if (role === "LANDLORD") return <Building className="size-4 text-teal-600" />;
    return <UserCheck className="size-4 text-teal-600" />;
  };

  const getRoleBadge = () => {
    if (role === "ADMIN") return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 text-[10px] font-bold">Admin Workspace</Badge>;
    if (role === "LANDLORD") return <Badge variant="outline" className="bg-teal-500/10 text-teal-600 border-teal-500/30 text-[10px] font-bold">Landlord Workspace</Badge>;
    return <Badge variant="outline" className="bg-teal-500/10 text-teal-600 border-teal-500/30 text-[10px] font-bold">Tenant Workspace</Badge>;
  };

  return (
    <>
      {/* Mobile Menu Bar Toggle */}
      <div className="lg:hidden w-full mb-4 flex items-center justify-between p-3 bg-card rounded-xl border border-border/60 shadow-xs">
        <div className="flex items-center gap-2">
          {getRoleIcon()}
          <span className="font-bold text-xs text-foreground uppercase tracking-wider">{role} Navigation</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="text-xs font-semibold gap-1.5 h-8 border-teal-500/30 text-teal-600 hover:bg-teal-500/10"
        >
          <Menu className="size-4" />
          <span>Open Menu</span>
        </Button>
      </div>

      {/* Mobile Slide-Out Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Out Drawer Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-card p-5 border-r border-border shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              {getRoleIcon()}
              <span className="font-bold text-xs text-foreground uppercase tracking-wider">{role} Workspace</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="size-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* User Profile Card */}
          <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-2">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600 font-extrabold text-sm border border-teal-500/30 shrink-0">
                {userPhoto ? (
                  <img src={userPhoto} alt={userName} className="size-full rounded-full object-cover" />
                ) : (
                  userName.slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">{userName}</h4>
                <p className="text-[11px] text-muted-foreground truncate">{userEmail}</p>
              </div>
            </div>
            <div className="pt-1 border-t border-border/30 flex justify-between items-center">
              {getRoleBadge()}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1" aria-label="Mobile Navigation Menu">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Navigation Menu
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-teal-600 text-white shadow-xs"
                      : "text-muted-foreground hover:bg-teal-500/10 hover:text-teal-600"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`size-4 ${isActive ? "text-white" : "text-teal-600"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && !isActive && (
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-bold bg-muted text-muted-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {role === "LANDLORD" && (
          <div className="pt-4 border-t border-border/40">
            <Button
              asChild
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs h-10 rounded-xl"
            >
              <Link href="/dashboard/landlord/create-properties" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-1.5">
                <PlusCircle className="size-4" />
                <span>Create Property</span>
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Sidebar Navigation Panel */}
      <aside className="hidden lg:block w-64 shrink-0 bg-card rounded-2xl border border-border/60 p-4 shadow-sm space-y-6">
        {/* User Workspace Header Card */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600 font-extrabold text-sm border border-teal-500/30 shrink-0">
              {userPhoto ? (
                <img src={userPhoto} alt={userName} className="size-full rounded-full object-cover" />
              ) : (
                userName.slice(0, 2).toUpperCase()
              )}
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-xs font-bold text-foreground truncate">{userName}</h4>
              <p className="text-[11px] text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
          <div className="pt-1 border-t border-border/30 flex justify-between items-center">
            {getRoleBadge()}
          </div>
        </div>

        {/* Navigation Items List */}
        <nav className="space-y-1" aria-label="Dashboard Desktop Sidebar">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Navigation Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-muted-foreground hover:bg-teal-500/10 hover:text-teal-600"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`size-4 ${isActive ? "text-white" : "text-teal-600"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-bold bg-muted text-muted-foreground">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Action Footer */}
        {role === "LANDLORD" && (
          <div className="pt-2 border-t border-border/40">
            <Button
              asChild
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs h-9 rounded-xl"
            >
              <Link href="/dashboard/landlord/create-properties" className="flex items-center justify-center gap-1.5">
                <PlusCircle className="size-4" />
                <span>Create Property</span>
              </Link>
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
