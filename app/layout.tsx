import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rent Car",
  description: "Rent your car easely",
    openGraph: {
    type: 'website',
    title: 'Rent Car',
    description: 'Rent your car easely',
    url: '',
    images: [{ url: "" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <TanstackProvider>
          <Header/>
        {children}
        <ReactQueryDevtools/>
        </TanstackProvider>
        </body>
    </html>
  );
}
