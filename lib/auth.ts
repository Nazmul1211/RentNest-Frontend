"use server";

import { cookies } from "next/headers";
import { jwtUtils } from "@/utils/jwt";
import type { JwtPayload } from "jsonwebtoken";

export type UserResponse = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profilePhoto?: string | null;
    role: string;
};

const getCurrentUser = async (): Promise<{ data: UserResponse } | null> => {
    const cookieStore = await cookies();
    const accessToken =
        cookieStore.get("accessToken")?.value ||
        cookieStore.get("token")?.value;

    if (!accessToken) return null;

    // Decode the JWT directly — same as the proxy.ts middleware does.
    // This avoids a network round-trip and works reliably during SSR.
    const decoded = jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_SECRET as string
    );

    if (!decoded.success || !decoded.data) return null;

    const payload = decoded.data as JwtPayload;

    if (!payload.id && !payload.email && !payload.userId) return null;

    return {
        data: {
            id: String(payload.id || payload.userId || ""),
            name: String(payload.name || payload.username || "User"),
            email: String(payload.email || ""),
            phone: payload.phone ? String(payload.phone) : undefined,
            profilePhoto: payload.profilePhoto || null,
            role: String(payload.role || "TENANT"),
        },
    };
};

export default getCurrentUser;
