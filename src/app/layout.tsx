import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import SearchModal from "@/components/SearchModal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "A Netflix clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // پراپرتی suppressHydrationWarning برای جلوگیری از خطای افزونه‌های مرورگر اضافه شده است
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <SearchModal />
      </body>
    </html>
  );
}
