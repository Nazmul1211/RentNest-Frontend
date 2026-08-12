"use server";

export type ContactState = {
  success: boolean;
  message: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
};

const ContactAction = async (payload: ContactPayload): Promise<ContactState> => {
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim()) {
    return {
      success: false,
      message: "Name, email and message are required",
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_APP_URL}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message ?? result.errorMessage ?? "Failed to send message. Please try again.",
      };
    }

    return {
      success: true,
      message: result.message ?? "Message sent successfully!",
    };
  } catch (error) {
    console.error("Error sending contact message:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export default ContactAction;