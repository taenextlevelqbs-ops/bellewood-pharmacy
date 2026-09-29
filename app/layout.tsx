import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PharmacyAssistant from "@/components/PharmacyAssistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PharmacyAssistant />
      </body>
    </html>
  );
}
