
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, ShieldCheck, Home } from "lucide-react";
import LoginForm from "../_components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-6">
      <div className="mx-auto w-full max-w-[780px] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl lg:grid lg:grid-cols-2">
        {/* Left Hero Graphic Section */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 p-6 text-white lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_50%)]" />
          
          {/* Brand header */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 backdrop-blur-md border border-teal-500/30">
              <Home className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">RentNest</span>
          </div>

          {/* Graphic Illustration */}
          <div className="relative z-10 my-auto py-3">
            <div className="relative mx-auto aspect-square w-full max-w-[215px] overflow-hidden rounded-xl border border-teal-500/20 shadow-xl backdrop-blur-xl">
              <Image
                src="/images/auth-hero.png"
                alt="RentNest Digital Key & House"
                fill
                priority
                className="object-cover"
              />
            </div>
            
            <div className="mt-4 space-y-1 text-center">
              <h2 className="text-base font-semibold tracking-tight text-white">
                Seamless Rental Experience
              </h2>
              <p className="text-[11px] text-slate-300">
                Connect directly with verified landlords & find your home in seconds.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="relative z-10 space-y-1.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[11px] font-medium text-teal-300">
              <CheckCircle2 className="size-3.5 text-teal-400" />
              <span>Verified Listings & Direct Renting</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-teal-300">
              <ShieldCheck className="size-3.5 text-teal-400" />
              <span>Secure Role-Based Portals</span>
            </div>
          </div>
        </div>

        {/* Right Form Section (Compact 340px width) */}
        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div className="w-full max-w-[340px] mx-auto">
            {/* Top Navigation */}
            <div className="mb-4 flex items-center justify-between">
              <Link
                href="/"
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* Header Text */}
            <div className="space-y-1 text-left mb-4">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Welcome Back!</h1>
              <p className="text-xs text-muted-foreground">
                Enter your credentials to access your account.
              </p>
            </div>

            {/* Form */}
            <LoginForm />
          </div>

          {/* Footer Note */}
          <div className="mt-5 text-center text-[11px] text-muted-foreground">
            Protected by RentNest security.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

