"use server"

import { cookies } from 'next/headers';

type UserResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        phone: string;
        profilePhoto: string | null;
        role: string;
        status: string;
        stripeCustomerId: string | null;
        hasCompletedPayment: boolean;
        createdAt: string;
        updatedAt: string;
    };
};

const getCurrentUser = async (): Promise<UserResponse | null> => {
   const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    });

    const result: UserResponse = await res.json();

    console.log(result, "user info from the auth.ts")

    return result;
}

export default getCurrentUser


