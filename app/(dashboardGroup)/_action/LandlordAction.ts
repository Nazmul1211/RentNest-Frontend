"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type LandlordRentalRequest = {
    id: string;
    propertyId: string;
    tenantId: string;
    status: string;
    moveInDate: string;
    moveOutDate: string;
    totalMonths: number;
    monthlyRent: string;
    totalAmount: string;
    tenantMessage: string;
    landlordNote?: string | null;
    approvedAt?: string | null;
    rejectedAt?: string | null;
    paidAt?: string | null;
    completedAt?: string | null;
    createdAt: string;
    updatedAt: string;
    tenant?: {
        id: string;
        name: string;
        email: string;
        phone?: string;
    };
    properties?: {
        id: string;
        title: string;
        rentAmount: string;
        city: string;
        area: string;
    };
    property?: {
        id: string;
        title: string;
        rentAmount: string;
        city: string;
        area: string;
    };
};



export const GetRentalRequestsOfLandlordProperties = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");

    if (!token?.value) {
        return [];
    }

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/landlord/requests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`
            },
            cache: "no-store"
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            console.error("Failed to fetch landlord rental requests:", result);
            return [];
        }

        return result?.data || [];
    } catch (error) {
        console.error("Error fetching landlord rental requests:", error);
        return [];
    }
};



export const UpdateRentalRequestStatus = async (
    requestId: string,
    payload: {
        status: "APPROVED" | "REJECTED";
        landlordNote?: string;
    }
) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");

    if (!token?.value) {
        return {
            success: false,
            message: "Unauthenticated. Please sign in again."
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/landlord/requests/${requestId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`
            },
            body: JSON.stringify(payload),
            cache: "no-store"
        });

        const result = await res.json();

        if (result.success) {
            revalidatePath("/dashboard/landlord/rental-request");
        }

        return result;
    } catch (error: any) {
        console.error("Error updating rental request status:", error);
        return {
            success: false,
            message: error.message || "Failed to update rental request status"
        };
    }
};




