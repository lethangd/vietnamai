import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "VietnamAI — AI Chatbot cho doanh nghiệp Việt Nam",
  description: "Giải pháp AI Chatbot hàng đầu cho doanh nghiệp Việt Nam. Tự động hóa chăm sóc khách hàng 24/7, tăng doanh thu, giảm chi phí. Công nghệ AI hiểu tiếng Việt.",
  icons: {
    icon: '/images/logo.png',
  },
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

