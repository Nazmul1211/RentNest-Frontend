"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type RentalRequest = {
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
    payments?: any[];
    property?: any;
};



export const GetAllTenantRentalRequests = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return [];

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/admin/rentals`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        const data = await res.json();
        if (!data.success) return [];
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching tenant rental requests:", error);
        return [];
    }
};



export const GetAllLandlordProperties = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return [];

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/admin/properties`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        const data = await res.json();
        if (!data.success) return [];
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching landlord properties:", error);
        return [];
    }
};



export const GetAllUsersData = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return [];

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/admin/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        const data = await res.json();
        if (!data.success) return [];
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};



export const GetSingleUser = async (id: string) => {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/admin/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!data.success) return null;
        return data?.data || null;
    } catch (error) {
        console.error("Error fetching single user:", error);
        return null;
    }
};



export const UpdateUserData = async (payload: { status?: string; role?: string }, id: string) => {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return {
            success: false,
            message: "Unauthorized"
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/admin/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
            revalidatePath("/dashboard/admin");
        }

        return data;
    } catch (error) {
        console.error("Error updating user status:", error);
        return {
            success: false,
            message: "Failed to update user status"
        };
    }
};