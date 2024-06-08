import { GeistSans } from 'geist/font/sans';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat With RAG LABIRA",
  description: "Try chat to RAG LABIRA",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
