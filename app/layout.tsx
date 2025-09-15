import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import SonnerToaster from "@/components/layout/SonnerToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habitarian",
  description: "Your Go To Habit Tracker",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  authors: [{ name: "Sameer Saharan", url: "https://sameersaharan.com" }],
  creator: "Sameer Saharan",
  publisher: "Sameer Saharan",
  category: "technology",
};

async function NavbarWithAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  const authenticated = session !== null;
  return <AppNavbar authenticated={authenticated} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="layout-container px-2">
          <NavbarWithAuth />
        </header>
        <main className="layout-container min-h-screen px-4">
          {children} 
          <SonnerToaster />
        </main>

        <footer className="layout-container px-2">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
