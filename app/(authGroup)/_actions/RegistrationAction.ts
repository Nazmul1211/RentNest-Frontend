"use server";

import { registrationPayloadSchema } from "../_schemas/authSchemas";

export type RegistrationState = {
  success: boolean;
  statusCode: number;
  message: string;
};

const RegistrationAction = async ( _previousState: RegistrationState, formData: FormData,
): Promise<RegistrationState> => {


  const parsed = registrationPayloadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => issue.message)
      .join(" • ");
    return {
      success: false,
      statusCode: 400,
      message: message || "Invalid form data",
    };
  }



  try {
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      },
    );

    const result = await res.json();
    const message = result.message ?? result.errorMessage ?? "Registration failed";

    return {
      success: result.success ?? false,
      statusCode: result.statusCode ?? res.status,
      message,
    };
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Network error. Please try again.",
    };
  }
};

export default RegistrationAction;
