import Link from "next/link";
import { Home, Building2, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-background relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden my-auto">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-xl w-full text-center space-y-6 z-10 my-auto">
        {/* Glassmorphic Container */}
        <div className="bg-card/90 backdrop-blur-xl border border-border/40 rounded-3xl p-8 sm:p-10 shadow-lg space-y-5">
          
          {/* Badge & Icon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-bold border border-cyan-500/20">
            <Compass className="size-4 animate-spin-slow" />
            <span>404 ERROR</span>
          </div>

          {/* Simplified Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-6xl sm:text-7xl font-black tracking-tight bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              asChild
              className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-xs"
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="size-4" /> Go Home
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto border-border/60 font-semibold px-6 py-2.5 rounded-xl text-xs"
            >
              <Link href="/properties" className="flex items-center justify-center gap-2">
                <Building2 className="size-4 text-cyan-600" /> Browse Properties
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}