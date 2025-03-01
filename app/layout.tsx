import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "@/components/nav";
import "./globals.css";

const fontGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: "400",
});

const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
});

const fontPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Xcribe",
  description: "Xcribe generates tweets for fun, memes, and chaos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${fontGrotesk.variable} ${fontPoppins.variable} ${fontInter.variable} font-grotesk antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
