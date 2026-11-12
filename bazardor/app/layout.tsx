
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "আপনার প্রতিদিনের বাজারের সঠিক দাম জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
