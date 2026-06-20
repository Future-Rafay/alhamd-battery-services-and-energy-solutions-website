import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

import { getSiteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Alhamd Battery Services and Energy Solutions",
  description: "Authorized distributor of branded batteries (AGS, Osaka, Daewoo, Exide) and solar equipment in Karachi.",
  openGraph: {
    title: "Alhamd Battery Services and Energy Solutions",
    description: "Authorized distributor of branded batteries (AGS, Osaka, Daewoo, Exide) and solar equipment in Karachi.",
    url: getSiteUrl(),
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alhamd Battery Services and Energy Solutions",
    description: "Authorized distributor of branded batteries and solar equipment.",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={cn(plusJakartaSans.variable, "font-sans", geist.variable)}>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
        {children}
        {modal}
      </body>
    </html>
  );
}
