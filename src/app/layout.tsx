import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verkefni 4",
  description: "Spurningalistasíðan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
