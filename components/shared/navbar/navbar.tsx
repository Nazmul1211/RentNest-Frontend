import getCurrentUser from "@/lib/auth";
import { NavbarClient } from "./navbar-client";
import { extractUserData, UserData } from "@/lib/user-utils";

interface NavbarProps {
  user?: UserData | null;
}

export async function Navbar({ user: propUser }: NavbarProps = {}) {
  let user = propUser;

  if (user === undefined) {
    const userResponse = await getCurrentUser();
    user = extractUserData(userResponse);
  }

  return <NavbarClient user={user} />;
}
