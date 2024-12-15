import type { Metadata } from "next";
import "./variables.css";
import "./globals.css";
import styles from './layout.module.css';
import Link from "next/link";
import { Suspense } from "react";
import { UserButton } from "@/components/UserButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <Link href="/" className={styles.title}>GW2 Boost</Link>
          <div className={styles.headerActions}>
            <Suspense><UserButton/></Suspense>
          </div>
        </header>
        <main className={styles.content}>
          {children}
        </main>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "GW2Boost",
  description: "Boost your GW2 project's visibility while supporting the community",
};
