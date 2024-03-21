import type { Metadata } from "next";
import { Kanit, Play, Cambay } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavContextProvider } from "@/context";
import { Toaster } from "@/components/ui/toaster";

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
  title: {
    template: `%s | Every Penny`,
    default: "Every Penny",
  },
  description: "Every Penny counts. Save up!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavContextProvider>
      <html lang="en">
        <body
          className={cn(
            "font-kanit antialiased",
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
