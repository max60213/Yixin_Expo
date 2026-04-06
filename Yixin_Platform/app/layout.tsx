import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import 'material-symbols';
import { routing } from "@/i18n/routing";
import "./globals.css";
import "./typography.css"

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "藝信",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon/Yixin_Symbol_Dark.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon/Yixin_Symbol_Light.svg',
      },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body
        className={`${notoSerifTC.variable} ${notoSansTC.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
