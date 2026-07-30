"use server";

import { cookies } from "next/headers";

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
};

export const GetAllTenantRentalRequest = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return [];
    }

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/rentals`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return [];
        }

        const data = await res.json();
        // console.log(data?.data, 'tenant data');

        return data?.data;

    } catch (error) {
        console.error("Error fetching tenant rental requests:", error);
        return [];
    }
};

export default GetAllTenantRentalRequest;