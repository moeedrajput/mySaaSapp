import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ViraLoom — AI-Powered Video & Marketing Platform",
  description:
    "Create stunning AI videos with realistic avatars and automate your entire digital marketing workflow. SEO, social media, content — all powered by AI.",
  keywords: [
    "AI video generator",
    "AI marketing",
    "SEO automation",
    "digital marketing platform",
    "AI avatars",
    "content generation",
  ],
  openGraph: {
    title: "ViraLoom — AI-Powered Video & Marketing Platform",
    description:
      "Create stunning AI videos with realistic avatars and automate your entire digital marketing workflow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
