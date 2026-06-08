import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ryotarohada.com";
const DESCRIPTION =
  "羽田涼太郎（Ryotaro Hada）— AI業務改善のフルサイクルエンジニア。課題発見から実装、そして改善され続ける仕組みまでを一人で作りきる。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "羽田涼太郎 | AI業務改善のフルサイクルエンジニア",
    template: "%s | 羽田涼太郎",
  },
  description: DESCRIPTION,
  keywords: [
    "羽田涼太郎",
    "Ryotaro Hada",
    "フルサイクルエンジニア",
    "AI業務改善",
    "生成AI",
    "Claude",
    "フルスタックエンジニア",
  ],
  authors: [{ name: "羽田涼太郎" }],
  openGraph: {
    title: "羽田涼太郎 | AI業務改善のフルサイクルエンジニア",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "羽田涼太郎",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "羽田涼太郎 | AI業務改善のフルサイクルエンジニア",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
