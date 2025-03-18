import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tips-calculator.vercel.app'),
  title: "Tip Calculator | Easy and Fast Tip Calculation",
  description: "Calculate tips instantly with our free online tip calculator. Simple, fast, and accurate tip calculations for restaurants, services, and more.",
  keywords: "tip calculator, restaurant tip, service tip, gratuity calculator, tip percentage, bill splitter",
  openGraph: {
    title: "Tip Calculator | Easy and Fast Tip Calculation",
    description: "Calculate tips instantly with our free online tip calculator. Simple, fast, and accurate tip calculations for restaurants, services, and more.",
    type: "website",
    locale: "en_US",
    siteName: "Tip Calculator",
    url: "https://tips-calculator.vercel.app",
    images: [
      {
        url: "https://tips-calculator.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tip Calculator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip Calculator | Easy and Fast Tip Calculation",
    description: "Calculate tips instantly with our free online tip calculator. Simple, fast, and accurate tip calculations for restaurants, services, and more.",
    images: ["https://tips-calculator.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "sVyQfiUOJH5yXVnmOxTsJrirTFijsTVAr7GzEctgVpY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Tip Calculator',
              description: 'Calculate tips instantly with our free online tip calculator. Simple, fast, and accurate tip calculations for restaurants, services, and more.',
              url: 'https://tips-calculator.vercel.app',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              author: {
                '@type': 'Person',
                name: 'Weizhen Wang'
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
