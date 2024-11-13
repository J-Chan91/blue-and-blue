import type { Metadata } from "next";
import { Noto_Sans as NotoSans } from "next/font/google";

import "./globals.css";

const openSans = NotoSans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "피랑파랑",
  description: "이것저것 시도해봅니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="ko">
      <body className={`h-full antialiased ${openSans.className}`}>
        {children}
      </body>
    </html>
  );
}
