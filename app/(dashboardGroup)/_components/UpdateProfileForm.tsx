"use client";

import React, { useActionState, useState, useEffect } from "react";
import { User, Mail, Phone, Camera, ShieldCheck, Lock, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UpdateUserProfileAction, ProfileUpdateState } from "../_action/ProfileAction";

interface UpdateProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profilePhoto?: string | null;
    role: string;
  };
}

const initialState: ProfileUpdateState = {
  success: false,
  message: "",
};

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [state, formAction, isPending] = useActionState(UpdateUserProfileAction, initialState);
  const [photoPreview, setPhotoPreview] = useState(user.profilePhoto || "");

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-xs space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
        <div className="flex items-center gap-4">
          {/* Avatar Preview */}
          <div className="relative size-16 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600 font-extrabold text-xl shrink-0 border-2 border-teal-500/30 overflow-hidden shadow-sm">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt={user.name}
                className="size-full object-cover"
                onError={() => setPhotoPreview("")}
              />
            ) : (
              initials
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-foreground">{user.name}</h3>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30 text-[10px] font-bold capitalize">
              Role: {user.role}
            </Badge>
          </div>
        </div>

        <span className="text-xs text-muted-foreground font-mono bg-muted/40 px-3 py-1.5 rounded-lg border border-border/30">
          Account ID: #{user.id.slice(0, 8)}...
        </span>
      </div>

      {/* Profile Form */}
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <User className="size-3.5 text-teal-600" /> Full Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              required
              placeholder="Your full name"
              className="text-xs font-medium focus-visible:ring-teal-500"
            />
          </div>

          {/* Email Address (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Mail className="size-3.5 text-teal-600" /> Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={user.email}
              disabled
              className="text-xs font-medium bg-muted/50 cursor-not-allowed opacity-80"
            />
            <p className="text-[10px] text-muted-foreground">Email cannot be changed directly for security reasons.</p>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Phone className="size-3.5 text-teal-600" /> Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={user.phone || ""}
              placeholder="+880 1700-000000"
              className="text-xs font-medium focus-visible:ring-teal-500"
            />
          </div>

          {/* Profile Photo URL */}
          <div className="space-y-2">
            <Label htmlFor="profilePhoto" className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Camera className="size-3.5 text-teal-600" /> Profile Photo Image URL
            </Label>
            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="url"
              defaultValue={user.profilePhoto || ""}
              onChange={(e) => setPhotoPreview(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="text-xs font-medium focus-visible:ring-teal-500"
            />
            <p className="text-[10px] text-muted-foreground">Enter a direct image link to update your avatar preview.</p>
          </div>
        </div>

        {/* Security & Account Information Box */}
        <div className="p-4 bg-muted/20 border border-border/40 rounded-xl space-y-2 text-xs">
          <h4 className="font-bold text-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-teal-600" /> Account Security Information
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            Your RentNest account is protected with encrypted authentication. If you need to change your password or security credentials, please contact administrator support or use the reset prompt on login.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs gap-2 px-6 h-10 rounded-xl"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="size-4" /> Save Profile Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
