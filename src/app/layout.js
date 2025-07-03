import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Homepage/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Soy Sauce Bottle Cafe",
    template: "%s | Soy Sauce Bottle Cafe",
  },
  description:
    "Soy Sauce Bottle menyajikan kopi terbaik dan suasana nyaman di tengah kota.",
  keywords: [
    "cafe",
    "kopi",
    "cafe Jakarta",
    "tempat nongkrong",
    "menu cafe",
    "cafe asik",
    "cafe modern",
  ],
  openGraph: {
    title: "Soy Sauce Bottle",
    description: "Nikmati kopi terbaik di tempat ternyaman!",
    metadataBase: new URL("http://127.0.0.1:3000"),
    siteName: "Soy Sauce Bottle",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soy Sauce Bottle Suasana",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soy Sauce Bottle",
    description: "Tempat terbaik untuk ngopi dan bersantai!",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
