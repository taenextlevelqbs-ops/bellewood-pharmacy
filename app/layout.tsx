import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PharmacyAssistant from "@/components/PharmacyAssistant";
import SupabaseRecoveryRedirect from "@/components/SupabaseRecoveryRedirect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bellewoodpharmacy.com"),
  title: {
    default: "Bellewood Pharmacy | Leesburg, VA",
    template: "%s | Bellewood Pharmacy",
  },
  description:
    "Bellewood Pharmacy provides personalized prescription services, vaccines, wellness support, medication transfers, compounding inquiries, and local pharmacy care in Leesburg, Virginia.",
  keywords: [
    "Bellewood Pharmacy",
    "Leesburg pharmacy",
    "Leesburg VA pharmacy",
    "prescription pharmacy Leesburg",
    "prescription transfer",
    "vaccines Leesburg VA",
    "compounding pharmacy Leesburg",
    "local pharmacy Leesburg",
  ],
  openGraph: {
    title: "Bellewood Pharmacy | Leesburg, VA",
    description:
      "Personalized prescription services, vaccines, wellness support, transfers, and local pharmacy care in Leesburg, Virginia.",
    type: "website",
    locale: "en_US",
    url: "https://bellewoodpharmacy.com",
    siteName: "Bellewood Pharmacy",
    images: [
      {
        url: "/comanylogo.png",
        width: 1200,
        height: 630,
        alt: "Bellewood Pharmacy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellewood Pharmacy | Leesburg, VA",
    description:
      "Personalized prescription services, vaccines, wellness support, transfers, and local pharmacy care in Leesburg, Virginia.",
    images: ["/comanylogo.png"],
  },
  icons: {
    icon: "/comanylogo.png",
    apple: "/comanylogo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SupabaseRecoveryRedirect />
        {children}
        <PharmacyAssistant />
      </body>
    </html>
  );
}
