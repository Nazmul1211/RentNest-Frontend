"use server";

import getCurrentUser from "@/lib/auth";

export type OAuthSuccessState = {
  success: boolean;
  redirectTo?: string;
};

const OAuthSuccessAction = async (): Promise<OAuthSuccessState> => {
  const userResponse = await getCurrentUser();

  if (!userResponse) {
    return { success: false };
  }

  const dashboardByRole = {
    TENANT: "/dashboard/tenant",
    LANDLORD: "/dashboard/landlord",
    ADMIN: "/dashboard/admin",
  } as const;

  const destination =
    dashboardByRole[userResponse.data.role as keyof typeof dashboardByRole];

  if (!destination) {
    return { success: false };
  }

  return { success: true, redirectTo: destination };
};

export default OAuthSuccessAction;
