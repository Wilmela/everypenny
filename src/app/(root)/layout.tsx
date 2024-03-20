import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
