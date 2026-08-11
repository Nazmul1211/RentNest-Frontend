import React from "react";
import Link from "next/link";
import { ArrowLeft, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import getCurrentUser from "@/lib/auth";
import DashboardSidebar from "../../_components/DashboardSidebar";
import UpdateProfileForm from "../../_components/UpdateProfileForm";

export default async function DashboardProfilePage() {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data;

  if (!user) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12 flex items-center justify-center">
        <div className="text-center space-y-4 bg-card p-8 rounded-2xl border border-border/60 shadow-sm max-w-md w-full">
          <h2 className="text-xl font-bold text-foreground">Access Denied</h2>
          <p className="text-xs text-muted-foreground">Please sign in to view and update your profile.</p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="text-xs font-semibold text-muted-foreground hover:text-teal-600 -ml-2">
              <Link href={`/dashboard/${user.role.toLowerCase()}`} className="flex items-center gap-1">
                <ArrowLeft className="size-4" /> Back to Workspace Overview
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <UserCheck className="size-6 text-teal-600" /> Account Profile & Settings
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage your personal profile details, contact information, and account settings.
          </p>
        </div>
      </div>

      {/* Main Layout: Sidebar + Profile Form */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <DashboardSidebar
          userRole={user.role}
          userName={user.name}
          userEmail={user.email}
          userPhoto={user.profilePhoto}
        />

        <div className="flex-1 w-full space-y-6">
          <UpdateProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
