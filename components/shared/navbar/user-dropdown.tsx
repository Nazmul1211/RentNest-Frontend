"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, User } from "lucide-react";
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

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePhoto?: string | null;
  role: string;
}

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
    className: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  },
  landlord: {
    label: "Landlord",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
  },
  admin: {
    label: "Admin",
    className: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
  },
};

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const roleKey = user.role?.toLowerCase() || "tenant";
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
        <button className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:scale-105">
          <Avatar className="size-9 cursor-pointer border border-border shadow-xs">
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
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 p-2 shadow-lg">
        {/* User Info Label */}
        <DropdownMenuLabel className="flex flex-col gap-1.5 p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-foreground truncate text-sm">
              {user.name}
            </span>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-bold ${roleMeta.className}`}>
              {roleMeta.label}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground font-normal truncate">
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Links */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={dashboardHref} className="cursor-pointer flex items-center gap-2">
              <LayoutDashboard className="size-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer flex items-center gap-2">
              <User className="size-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout Action */}
        <DropdownMenuItem
          onSelect={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 flex items-center gap-2"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
