import type { Metadata } from "next";
import { Navbar } from "./components/Nav/navBar";
import ClientLayout from "./components/clientLayout";
import localFont from "next/font/local";
import "./globals.css";
import { Web3AuthProvider } from './contexts/Web3AuthContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "BlockBounties",
  description: "Create and manage blockchain bounties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3AuthProvider>
          {children}
        </Web3AuthProvider>
      </body>
    </html>
  );
}