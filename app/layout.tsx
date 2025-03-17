import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tip Calculator | Easy and Fast Tip Calculation",
  description: "Calculate tips instantly with our free online tip calculator. Simple, fast, and accurate tip calculations for restaurants, services, and more.",
  keywords: "tip calculator, restaurant tip, service tip, gratuity calculator, tip percentage, bill splitter",
  openGraph: {
    title: "Tip Calculator | Easy and Fast Tip Calculation",
    description: "Calculate tips instantly with our free online tip calculator. Simple, fast, and accurate tip calculations for restaurants, services, and more.",
    type: "website",
    locale: "en_US",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

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
        {children}
      </body>
    </html>
  );
}
