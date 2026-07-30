"use server";

import { cookies } from "next/headers";

export type TRentanSubmissionModal = {
  propertyId: string;
  moveInDate: string;
  moveOutDate: string;
  totalMonths: number;
  tenantMessage: string;
  monthlyRent: string;
  totalAmount: string;
};

export async function createRentalAction(payload: TRentanSubmissionModal) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      message: "Please sign in to your account before submitting a rental request.",
    };
  }

  try {
    const baseUrl = process.env.BACKEND_APP_URL?.replace(/\/$/, "") || "";
    const res = await fetch(`${baseUrl}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || result.errorMessage || "Failed to submit rental request.",
      };
    }

    return {
      success: true,
      message: result.message || "Rental request submitted successfully!",
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred while connecting to server.",
    };
  }
}
