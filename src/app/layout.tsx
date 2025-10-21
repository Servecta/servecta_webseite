import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import ServiceWorkerRegistration from "@/components/service-worker-registration";
import AnalyticsTracker from "@/components/analytics-tracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Servecta GmbH - Datenschutz & IT-Dienstleistungen aus einer Hand",
    template: "%s | Servecta GmbH"
  },
  description: "Professionelle Datenschutz- und IT-Dienstleistungen für mittelständische Unternehmen und Start-ups. DSGVO-konform, sicher und maßgeschneidert.",
  keywords: [
    "Datenschutz",
    "DSGVO", 
    "IT-Security",
    "IT-Infrastruktur",
    "IT-Beratung",
    "Servecta",
    "Compliance",
    "Cybersecurity",
    "Datenschutzberatung",
    "IT-Dienstleistungen"
  ],
  authors: [{ name: "Servecta GmbH" }],
  creator: "Servecta GmbH",
  publisher: "Servecta GmbH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://servecta.de"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  manifest: "/manifest.json",
  themeColor: "#0070F3",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Servecta",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://servecta.de",
    siteName: "Servecta GmbH",
    title: "Servecta GmbH - Datenschutz & IT-Dienstleistungen aus einer Hand",
    description: "Professionelle Datenschutz- und IT-Dienstleistungen für mittelständische Unternehmen und Start-ups. DSGVO-konform, sicher und maßgeschneidert.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Servecta GmbH - Datenschutz & IT-Dienstleistungen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servecta GmbH - Datenschutz & IT-Dienstleistungen aus einer Hand",
    description: "Professionelle Datenschutz- und IT-Dienstleistungen für mittelständische Unternehmen und Start-ups.",
    images: ["/assets/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans antialiased">
        <AnalyticsTracker />
        <ServiceWorkerRegistration />
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
