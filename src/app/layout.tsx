import type { Metadata } from "next";
import { Anton, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Preloader from "@/components/Preloader/Preloader";

/* §4 Typography — Display: Anton, Subhead/Labels: Space Grotesk, Body: Inter */
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bloodnexusstudio.in"),
  title: {
    default: "BloodNexus Studio — Immersive Games, Cinematics & Real-Time 3D",
    template: "%s",
  },
  description:
    "BloodNexus is a Thane-based game development studio building immersive games with narrative depth — powered by Unreal Engine and Unity.",
  openGraph: {
    type: "website",
    siteName: "BloodNexus Studio",
    title: "BloodNexus Studio — Immersive Games, Cinematics & Real-Time 3D",
    description:
      "A Thane-based AAA game studio building immersive games with narrative depth — Unreal Engine, Unity, cinematics, VR & real-time 3D.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BloodNexus Studio",
    description:
      "Immersive games with narrative depth — Unreal Engine, Unity, cinematics, VR & real-time 3D.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        <Preloader />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
