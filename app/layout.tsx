import { Footer } from "@/components/shared/footer/footer";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}


