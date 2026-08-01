import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cyberlearnhub.example.com"),
  title: {
    default: "CyberLearn Hub — Learn Cybersecurity from Zero to Professional",
    template: "%s | CyberLearn Hub",
  },
  description:
    "Hands-on cybersecurity courses, labs, and challenges covering networking, Linux, web security, ethical hacking, and incident response — built for beginners, priced for everyone.",
  openGraph: {
    title: "CyberLearn Hub",
    description: "Learn Cybersecurity from Zero to Professional",
    type: "website",
    url: "https://cyberlearnhub.example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberLearn Hub",
    description: "Learn Cybersecurity from Zero to Professional",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-green focus:text-bg focus:px-4 focus:py-2 focus:rounded-md focus:font-mono"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
