import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Universal font system
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Define universal font classes
const universalFontClasses = `${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`;

export const metadata: Metadata = {
  title: "Sirasit Personal Website",
  description: "Sirasit Tumvijit - Game Developer Personal Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${universalFontClasses} antialiased`}>
        {children}
      </body>
    </html>
  );
}
