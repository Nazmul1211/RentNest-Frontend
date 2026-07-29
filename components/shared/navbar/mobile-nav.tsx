"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Home,
  LogIn,
  UserPlus,
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

interface MobileNavProps {
  pathname: string;
}

export function MobileNav({ pathname }: MobileNavProps) {
  const [open, setOpen] = useState(false);

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
        <SheetHeader className="px-5 pt-5 pb-3">
          <SheetTitle className="flex items-center gap-2 text-left">
            <Home className="size-5 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Rent<span className="text-primary">Nest</span>
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* {user && user.role !== "guest" && roleMeta && ( */}
        <div className="px-5 pb-3 flex items-center gap-2">
          <Badge variant="outline"></Badge>
        </div>
        {/* )} */}

        <Separator />

        <nav className="flex-1 px-3 py-3 overflow-y-auto"></nav>

        <div className="px-4 py-4 border-t border-border">
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login" onClick={() => setOpen(false)}>
                <LogIn data-icon="inline-start" />
                Login
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/register" onClick={() => setOpen(false)}>
                <UserPlus data-icon="inline-start" />
                Register
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
