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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RegistrationAction, {
  type RegistrationState,
} from "../_actions/RegistrationAction";
import {
  registrationSchema,
  type RegistrationValues,
} from "../_schemas/authSchemas";


const initialState: RegistrationState = {
  success: false,
  statusCode: 0,
  message: "",
};


const RegistrationForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, action, pending] = useActionState(
    RegistrationAction,
    initialState,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "TENANT",
    },
  });


  useEffect(() => {
    if (!state.statusCode) return;
    if (state.success) {
      toast.success(state.message || "Account created. Please sign in.");
      router.push("/login");
      return;
    }
    toast.error(state.message || "Registration failed. Please try again.");
  }, [router, state]);


  const onSubmit = (values: RegistrationValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value),
    );
    startTransition(() => action(formData));
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5" noValidate>
      <div className="space-y-1">
          <Label htmlFor="name" className="text-xs font-medium">Full name</Label>
          <Input id="name" autoComplete="name" className="h-9 text-sm" {...register("name")} />
          {errors.name && (
            <p className="text-[11px] text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-medium">Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="h-9 text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[11px] text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs font-medium">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="h-9 text-sm pr-9"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-xs font-medium">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                className="h-9 text-sm pr-9"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone" className="text-xs font-medium">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            className="h-9 text-sm"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-[11px] text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1 pt-1">
          <Label className="text-xs font-medium">I am a</Label>
          <RadioGroup
            defaultValue="TENANT"
            onValueChange={(role) =>
              setValue("role", role as RegistrationValues["role"], {
                shouldValidate: true,
              })
            }
            className="flex gap-6 pt-0.5"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="TENANT" id="tenant" />
              <Label htmlFor="tenant" className="text-xs cursor-pointer">Tenant</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="LANDLORD" id="landlord" />
              <Label htmlFor="landlord" className="text-xs cursor-pointer">Landlord</Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          type="submit"
          className="w-full h-9 bg-teal-500 hover:bg-teal-600 mt-2 text-sm cursor-pointer"
          disabled={!isValid || pending}
        >
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>
  );
};

export default RegistrationForm;
