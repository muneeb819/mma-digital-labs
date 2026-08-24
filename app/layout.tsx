import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
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
      <body>
        <Nav />
        <main className="mx-auto min-h-[70vh] max-w-6xl px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
