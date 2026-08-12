"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export type GoogleAuthState = {
  success: boolean;
  message: string;
  redirectTo?: string;
};

const GoogleAuthAction = async (
  accessToken: string,
  refreshToken: string,
): Promise<GoogleAuthState> => {
  if (!accessToken || !refreshToken) {
    return {
      success: false,
      message: "Invalid Google authentication response",
    };
  }

  try {
    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
    };

    cookieStore.set("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    const token = jwt.decode(accessToken) as JwtPayload;

    const dashboardByRole = {
      TENANT: "/dashboard/tenant",
      LANDLORD: "/dashboard/landlord",
      ADMIN: "/dashboard/admin",
    } as const;

    const destination = dashboardByRole[token?.role as keyof typeof dashboardByRole];

    if (!destination) {
      return {
        success: false,
        message: "Your account role is not supported",
      };
    }

    return {
      success: true,
      message: "Signed in with Google successfully",
      redirectTo: destination,
    };
  } catch {
    return {
      success: false,
      message: "Unable to complete Google authentication",
    };
  }
};

export default GoogleAuthAction;
