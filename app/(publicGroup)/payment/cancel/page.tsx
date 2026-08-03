import Link from "next/link";
import { XCircle, LayoutDashboard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background text-foreground text-center">
      <div className="max-w-sm w-full mx-auto space-y-6">

        <div className="flex justify-center">
          <XCircle className="size-16 text-red-600 dark:text-red-500 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Payment Cancelled
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your payment session was cancelled. No charges were made to your account.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link href="/dashboard/tenant/requests" className="block w-full">
            <Button size="lg" className="w-full font-semibold rounded-xl cursor-pointer">
              <LayoutDashboard className="size-4 mr-2" />
              Return to Dashboard
            </Button>
          </Link>
          <Link href="/" className="block w-full">
            <Button size="lg" variant="outline" className="w-full font-semibold rounded-xl cursor-pointer">
              <Home className="size-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
