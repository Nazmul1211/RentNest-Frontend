export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePhoto?: string | null;
  role: string;
}

export function extractUserData(userResponse: any): UserData | null {
  if (!userResponse) return null;

  // Handle { data: {...} } wrapper or direct UserData object
  const raw = userResponse.data ?? userResponse;

  if (!raw || typeof raw !== "object") return null;

  const id = raw.id ?? raw.userId ?? "";
  const email = raw.email ?? "";
  const name = raw.name ?? raw.username ?? "";

  if (!id && !email && !name) return null;

  return {
    id: String(id),
    name: String(name || "User"),
    email: String(email),
    phone: raw.phone ? String(raw.phone) : undefined,
    profilePhoto: raw.profilePhoto ?? null,
    role: String(raw.role ?? "TENANT"),
  };
}

export function normalizeRole(role?: string): "admin" | "landlord" | "tenant" {
  if (!role) return "tenant";
  const r = String(role).toLowerCase().trim();
  if (r.includes("admin")) return "admin";
  if (r.includes("landlord")) return "landlord";
  if (r.includes("tenant")) return "tenant";
  return "tenant";
}
