"use server";

import { cookies } from "next/headers";
import getCurrentUser from "@/lib/auth";

export type ProfileUpdateState = {
  success: boolean;
  message: string;
};

export const UpdateUserProfileAction = async (
  _previousState: ProfileUpdateState,
  formData: FormData
): Promise<ProfileUpdateState> => {
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const profilePhoto = formData.get("profilePhoto")?.toString().trim();

  if (!name || name.length < 2) {
    return {
      success: false,
      message: "Name must be at least 2 characters long.",
    };
  }

  try {
    const userResponse = await getCurrentUser();
    const currentUser = userResponse?.data;

    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in to update your profile.",
      };
    }

    const cookieStore = await cookies();
    const accessToken =
      cookieStore.get("accessToken")?.value ||
      cookieStore.get("token")?.value;

    // Send update request to backend API
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/user/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        phone: phone || undefined,
        profilePhoto: profilePhoto || undefined,
      }),
    });

    const data = await res.json();

    if (!res.ok && !data.success) {
      return {
        success: false,
        message: data.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while updating profile.",
    };
  }
};
