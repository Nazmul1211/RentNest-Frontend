import getCurrentUser from "@/lib/auth";
import { Footer } from "@/components/shared/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar user={user} />
          {children}
          <Footer user={user} />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
