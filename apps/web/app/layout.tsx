import type { Metadata } from "next";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "GW2Boost",
  description: "Boost your GW2 project's visibility while supporting the community",
};