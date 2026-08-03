"use server"
import { cookies } from "next/headers"

export type payloadType = {
    rentalRequestId: string,
    rating: number,
    comment: string,
    tenantId: string
}

export const CreateReview = async (payload: payloadType) => {

    console.log(payload, "payload from create review action")

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
                "Authorization": `Bearer ${token}`,
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

        return result?.data;


    } catch (error: any) {
        console.error("Error creating review:", error);
        return {
            success: false,
            message: error?.message || "An error occurred while creating the review.",
        };
    }
}
