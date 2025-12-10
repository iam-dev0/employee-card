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

export const metadata = {
  title: "MeCard - Professional Employee Card Templates",
  description: "Create stunning digital employee cards with MeCard. Choose from professional templates including dark mode, glassmorphism, and modern designs. Perfect for business cards and team profiles.",
  keywords: ["employee card", "digital business card", "card templates", "professional cards", "team profiles"],
  authors: [{ name: "MeCard" }],
  openGraph: {
    title: "MeCard - Professional Employee Card Templates",
    description: "Create stunning digital employee cards with beautiful templates",
    type: "website",
    siteName: "MeCard",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeCard - Professional Employee Card Templates",
    description: "Create stunning digital employee cards with beautiful templates",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} theme-scaled bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
