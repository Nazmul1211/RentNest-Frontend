import getCurrentUser from "@/lib/auth";
import { Footer } from "@/components/shared/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar/navbar";
import { extractUserData } from "@/lib/user-utils";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userResponse = await getCurrentUser();
  const user = extractUserData(userResponse);

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar user={user} />
        {children}
        <Footer user={user} />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
