import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "VietnamAI — AI Chatbot cho doanh nghiệp Việt",
  description: "Bán AI chatbot, quản lý đơn hàng và vận hành nhanh gọn trên Supabase."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}

