"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LoginAction, { type LoginState } from "../_actions/authAction";
import OAuthSuccessAction from "../_actions/oAuthSuccessAction";
import { loginSchema, type LoginValues } from "../_schemas/authSchemas";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(LoginAction, {
    success: false,
    statusCode: 0,
    message: "",
  } satisfies LoginState);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  // Bridge client-side RHF validation with the Server Action.
  const onSubmit = (values: LoginValues) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    startTransition(() => action(formData));
  };

  useEffect(() => {
    if (!state.statusCode) return;

    if (state.success && state.redirectTo) {
      router.replace(state.redirectTo);
      return;
    }

    toast.error(state.message);
  }, [router, state]);

  // Google OAuth handoff: backend sets httpOnly cookies and redirects here
  // as /login?oauth=success. Read the cookie role, then route to the dashboard.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (!params.has("oauth")) return;

    window.history.replaceState(null, "", window.location.pathname);

    startTransition(async () => {
      const result = await OAuthSuccessAction();

      if (result.success && result.redirectTo) {
        toast.success("Signed in with Google successfully");
        router.replace(result.redirectTo);
      } else {
        toast.error("Google authentication failed. Please try again.");
      }
    });
  }, [router]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        <div className="space-y-1">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 cursor-pointer"
          disabled={!isValid || pending}
        >
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3 text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full cursor-pointer hover:border-teal-500/50 hover:bg-teal-500/5 transition-all"
      >
        <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`} className="flex items-center justify-center gap-2.5">
          <svg className="size-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </a>
      </Button>
    </>
  );
};

export default LoginForm;
