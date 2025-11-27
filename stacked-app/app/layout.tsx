import type { Metadata } from "next";
import { Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "STACKED - Show Your Stack",
  description: "Global net worth leaderboard. Show your stack.",
};

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  weight: ["500", "700"],
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceMono.variable} ${syne.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
