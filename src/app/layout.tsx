import type { Metadata } from "next";
import { Kanit, Play, Cambay } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavContextProvider } from "@/context";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

const play = Play({
  weight: ["400", "700"],
  subsets: ["cyrillic"],
  variable: "--font-play",
});

const cambay = Cambay({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cambay",
});

export const metadata: Metadata = {
  // metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.shortDesc,
  },
  authors: [
    { name: siteConfig.author, url: siteConfig.url },
    { name: siteConfig.author2, url: siteConfig.url },
  ],
  description: siteConfig.longDesc,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavContextProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "font-kanit antialiased bg-background",
            kanit.variable,
            cambay.variable,
            play.variable
          )}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </NavContextProvider>
  );
}
