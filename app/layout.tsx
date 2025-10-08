import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/Core/Header";
// Direct import of client component; allowed inside server layout.
import LoadingScreen from "@/components/Core/LoadingScreen";
import AppContentGate from "@/components/Core/AppContentGate";

export const metadata = {
  title: "Planto",
  description: "Planto – Next 15 + Tailwind 4 + Framer Motion starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-[#1B2316] text-gray-900">
      <body className="min-h-screen bg-[#1B2316] antialiased font-sans">
        <LoadingScreen />
        <AppContentGate>
          <div className="app-content">
            <Header />
            {children}
          </div>
        </AppContentGate>
      </body>
    </html>
  );
}
