import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalNavigation } from "@/components/conditional-navigation";
import { ConditionalFooter } from "@/components/conditional-footer";
import ServiceWorkerRegistration from "@/components/service-worker-registration";
import AnalyticsTracker from "@/components/analytics-tracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Servecta UG (haftungsbeschränkt) i.G. - Datenschutz & IT-Dienstleistungen aus einer Hand",
    template: "%s | Servecta UG (haftungsbeschränkt) i.G."
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
  authors: [{ name: "Servecta UG (haftungsbeschränkt) i.G." }],
  creator: "Servecta UG (haftungsbeschränkt) i.G.",
  publisher: "Servecta UG (haftungsbeschränkt) i.G.",
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
    siteName: "Servecta UG (haftungsbeschränkt) i.G.",
    title: "Servecta UG (haftungsbeschränkt) i.G. - Datenschutz & IT-Dienstleistungen aus einer Hand",
    description: "Professionelle Datenschutz- und IT-Dienstleistungen für mittelständische Unternehmen und Start-ups. DSGVO-konform, sicher und maßgeschneidert.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Servecta UG (haftungsbeschränkt) i.G. - Datenschutz & IT-Dienstleistungen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servecta UG (haftungsbeschränkt) i.G. - Datenschutz & IT-Dienstleistungen aus einer Hand",
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
        <ConditionalNavigation />
        <main className="pt-16">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
