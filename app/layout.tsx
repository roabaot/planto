import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/Core/Header";

export const metadata = {
  title: "Planto",
  description: "Planto – Next 15 + Tailwind 4 + Framer Motion starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-[#1B2316] text-gray-900">
      <body className="min-h-screen antialiased font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
