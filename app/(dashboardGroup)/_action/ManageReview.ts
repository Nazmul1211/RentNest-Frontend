"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type payloadType = {
    rentalRequestId: string;
    rating: number;
    comment: string;
    tenantId: string;
};

export type updatePayloadType = {
    rating?: number;
    comment?: string;
};


export const CreateReview = async (payload: payloadType) => {

    // console.log(payload, "payload from create review action")

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return {
            success: false,
            message: "Unauthorized Access: You are not logged in!",
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        if (!res.ok) {
            const result = await res.json();
            return {
                success: false,
                message: result?.message || "Failed to create review.",
            };
        }

        const result = await res.json();

        revalidatePath("/dashboard/tenant/requests");
        revalidatePath("/dashboard/tenant");

        return result?.data;


    } catch (error: any) {
        console.error("Error creating review:", error);
        return {
            success: false,
            message: error?.message || "An error occurred while creating the review.",
        };
    }
};




export const GetReview = async (id: string) => {

    // console.log("GetReview server hits");

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/reviews`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return [];
        }

        const result = await res.json();

        // console.log(result?.data, "result from get review action");

        return result?.data;

    } catch (error: any) {
        console.error("Error fetching reviews:", error);
        return [];
    }
};




export const UpdateReview = async (reviewId: string, payload: updatePayloadType) => {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return {
            success: false,
            message: "Unauthorized Access: You are not logged in!",
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/reviews/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        if (!res.ok) {
            const result = await res.json();
            return {
                success: false,
                message: result?.message || "Failed to update review.",
            };
        }

        const result = await res.json();

        revalidatePath("/dashboard/tenant/requests");
        revalidatePath("/dashboard/tenant");

        return result?.data;

    } catch (error: any) {
        console.error("Error updating review:", error);
        return {
            success: false,
            message: error?.message || "An error occurred while updating the review.",
        };
    }
};




export const DeleteReview = async (reviewId: string) => {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return {
            success: false,
            message: "Unauthorized Access: You are not logged in!",
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/reviews/${reviewId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const result = await res.json();
            return {
                success: false,
                message: result?.message || "Failed to delete review.",
            };
        }

        const result = await res.json();

        revalidatePath("/dashboard/tenant/requests");
        revalidatePath("/dashboard/tenant");

        return result?.data;

    } catch (error: any) {
        console.error("Error deleting review:", error);
        return {
            success: false,
            message: error?.message || "An error occurred while deleting the review.",
        };
    }
};