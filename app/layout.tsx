import type { Metadata } from "next";
import { Epilogue, Work_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-head",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mma-digital-labs.vercel.app"
  ),
  title: {
    default: "MMA Digital Labs — Production-ready software systems",
    template: "%s · MMA Digital Labs",
  },
  description:
    "License production-ready platforms (AI business development, online casino, CRM, telecom compliance) or commission a custom build. Live demos available.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} ${workSans.variable} font-sans`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
