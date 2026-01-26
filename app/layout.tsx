import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { UserProvider, useUser } from "@/context/UserContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://k9hope.vercel.app'),
  title: "K9Hope - Canine Blood Donation Platform",
  description: "India's first AI-powered canine blood donation network connecting verified dog donors with veterinary clinics. Built by RIT Chennai in partnership with Madras Veterinary College.",
  keywords: ["canine blood donation", "dog blood bank", "veterinary blood", "pet blood donation", "K9Hope", "RIT Chennai", "Madras Veterinary College"],
  authors: [{ name: "K9Hope Team - RIT Chennai" }],
  openGraph: {
    title: "K9Hope - Canine Blood Donation Platform",
    description: "India's first AI-powered canine blood donation network",
    url: "https://k9hope.vercel.app",
    siteName: "K9Hope",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "K9Hope Canine Blood Donation Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K9Hope - Canine Blood Donation Platform",
    description: "India's first AI-powered canine blood donation network",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Component to update device type


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <SettingsProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <meta name="theme-color" content="#DC2626" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"></meta>
          </head>

          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </SettingsProvider>
    </UserProvider>
  );
}
