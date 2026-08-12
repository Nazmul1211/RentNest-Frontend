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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Card className="space-y-5 p-6">
        <div className="space-y-1.5">
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

        <div className="space-y-1.5">
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
      </Card>
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
      className="w-full cursor-pointer"
    >
      <a href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/auth/google`}>
        Continue with Google
      </a>
    </Button>

    <Button
      type="button"
      variant="ghost"
      asChild
      className="w-full cursor-pointer text-muted-foreground"
    >
      <a href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/auth/google?role=LANDLORD`}>
        Are you a Landlord? Continue with Google as Landlord
      </a>
    </Button>
    </>
  );
};

export default LoginForm;
