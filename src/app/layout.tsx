
import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";

import { Providers } from "@/components/providers/providers";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Intelligent Smart Home Automation`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Discover Shreem Controls smart home automation. Experience intelligent lighting, climate, music, curtains and connected living through beautifully designed control systems.",
  applicationName: siteConfig.name,
  keywords: [
    "Shreem Controls",
    "Smart Home Automation",
    "Smart Lighting",
    "Smart Home Control",
    "Smart Remote Controls",
    "Intelligent Living",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full bg-background text-text-primary"
        style={{
          fontFamily: "var(--font-manrope), sans-serif",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
