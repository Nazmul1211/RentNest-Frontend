"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loginSchema } from "../_schemas/authSchemas";

export type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  redirectTo?: string;
};


const LoginAction = async ( _previousState: LoginState, formData: FormData ): Promise<LoginState> => {

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      statusCode: 400,
      message: parsed.error.issues[0]?.message ?? "Invalid login details",
    };
  }


  try {
    const response = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const result = await response.json();

    if (!result.success || !result.data?.accessToken || !result.data?.refreshToken) {
      return {
        success: false,
        statusCode: result.statusCode ?? response.status,
        message: result.message ?? result.errorMessage ?? "Unable to sign in",
      };
    }


    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
    };

    cookieStore.set("accessToken", result.data.accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });



    const token = jwt.decode(result.data.accessToken) as JwtPayload;

    const dashboardByRole = {
      TENANT: "/dashboard/tenant",
      LANDLORD: "/dashboard/landlord",
      ADMIN: "/dashboard/admin",
    } as const;


    const destination = dashboardByRole[token?.role as keyof typeof dashboardByRole];

    if (!destination) {
      return {
        success: false,
        statusCode: 400,
        message: "Your account role is not supported",
      };
    }

    return {
      success: true,
      statusCode: response.status,
      message: "Signed in successfully",
      redirectTo: destination,
    };

  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Unable to reach the server. Please try again.",
    };
  }
};


export default LoginAction;
