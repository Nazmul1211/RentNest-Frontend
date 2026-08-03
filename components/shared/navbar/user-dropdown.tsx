"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Building2,
  PlusCircle,
  ClipboardList,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogoutAction } from "@/app/(authGroup)/_actions/authAction";
import { UserData, normalizeRole } from "@/lib/user-utils";

interface UserDropdownProps {
  user: UserData;
}

function getInitials(name: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const ROLE_META: Record<
  string,
  { label: string; className: string }
> = {
  tenant: {
    label: "Tenant",
    className: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-400",
  },
  landlord: {
    label: "Landlord",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  admin: {
    label: "Admin",
    className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400",
  },
};

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const roleKey = normalizeRole(user?.role);
  const roleMeta = ROLE_META[roleKey] || {
    label: user.role,
    className: "bg-muted text-muted-foreground",
  };

  const dashboardHref =
    roleKey === "admin"
      ? "/dashboard/admin"
      : roleKey === "landlord"
      ? "/dashboard/landlord"
      : "/dashboard/tenant";

  const handleLogout = async () => {
    await LogoutAction();
    router.push("/login");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 transition-all hover:opacity-90">
          <Avatar className="size-9 cursor-pointer border border-border shadow-xs">
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
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-2 shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl z-50"
      >
        {/* User Info Label */}
        <DropdownMenuLabel className="flex flex-col gap-1.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 truncate text-sm">
              {user.name}
            </span>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-bold ${roleMeta.className}`}>
              {roleMeta.label}
            </Badge>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
            {user.email}
          </span>
        </DropdownMenuLabel>

        {/* Links */}
        <DropdownMenuGroup className="space-y-0.5">
          <DropdownMenuItem asChild>
            <Link href={dashboardHref} className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <LayoutDashboard className="size-4 text-cyan-600" />
              <span>Dashboard Workspace</span>
            </Link>
          </DropdownMenuItem>

          {roleKey === "landlord" && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/landlord/properties" className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Building2 className="size-4 text-cyan-600" />
                  <span>My Properties</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/landlord/rental-request" className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <ClipboardList className="size-4 text-cyan-600" />
                  <span>Rental Requests</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/landlord/create-properties" className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <PlusCircle className="size-4 text-cyan-600" />
                  <span>Create Property</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {roleKey === "admin" && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/admin/users" className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Users className="size-4 text-purple-600" />
                  <span>User Management</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/admin/properties" className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Building2 className="size-4 text-cyan-600" />
                  <span>All Properties</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/admin/rental-requests" className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <ClipboardList className="size-4 text-amber-600" />
                  <span>Rental Requests</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {roleKey === "tenant" && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/tenant/requests" className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <ClipboardList className="size-4 text-cyan-600" />
                  <span>My Rental Requests</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/properties" className="cursor-pointer flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Building2 className="size-4 text-cyan-600" />
                  <span>Browse Properties</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        {/* Logout Action */}
        <DropdownMenuItem
          onSelect={handleLogout}
          className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30 flex items-center gap-2 px-2.5 py-2 text-xs font-bold rounded-lg"
        >
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
