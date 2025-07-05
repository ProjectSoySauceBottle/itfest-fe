import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import Navbar from "@/components/Homepage/Navbar/Navbar";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
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
    url: "http://localhost:3000",
    siteName: "Soy Sauce Bottle",
    images: [
      {
        url: "https://nextjs.org/og.png",
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
    images: ["/assets/images/hero-section.jpg"],
  },
  icons: {
    // icon: "/favicon.ico",
    icon: "/assets/images/Coffee1.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <ModalsProvider>
            <Notifications position="top-right" />
            <Navbar />
            <main>{children}</main>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
