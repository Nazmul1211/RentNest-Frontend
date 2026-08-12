import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import GetAllContactMessagesWrapper from "@/app/(dashboardGroup)/_components/GetAllContactMessages";

export default async function AdminContactMessagesPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12 space-y-6">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-xs font-semibold text-muted-foreground hover:text-teal-600 mb-1 -ml-2"
          >
            <Link href="/dashboard/admin" className="flex items-center gap-1">
              <ArrowLeft className="size-4" /> Back to Admin Dashboard
            </Link>
          </Button>
          <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <MessageSquare className="size-6 text-teal-600" /> Contact Messages
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Messages submitted through the public contact form.
          </p>
        </div>
      </div>

      {/* Messages List */}
      <section>
        <GetAllContactMessagesWrapper />
      </section>
    </div>
  );
}