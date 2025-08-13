import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const avenirNext = localFont({
  src: [
    {
      path: "../../public/fonts/AvenirNextCyr-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNextCyr-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-avenir-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "Your go-to lending app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${avenirNext.variable}`}>
        {children}
      </body>
    </html>
  );
}
