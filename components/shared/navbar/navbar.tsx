import getCurrentUser from "@/lib/auth";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data || null;

  return <NavbarClient user={user} />;
}
