"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const MakeRentalPayment = async (payload: { rentalRequestId: string }) => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || null;
    console.log(accessToken, "from payment route")

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/payments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Cookie: `accessToken=${accessToken}`
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    console.log(result, "result from the Payment Action")

    if (result.success && result.data.checkoutUrl) {
        redirect(result.data.checkoutUrl);
    }
    else {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }

    return result;
}
