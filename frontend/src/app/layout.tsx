
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Providers from "./providers";
import React from "react";
import { cookies } from "next/headers";

// @ts-expect-error
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}



export default async function RootLayout({ children }: RootLayoutProps) {
const Cookies = await cookies();
  const theme = Cookies.get("theme")?.value;
  const isDark = theme === "dark";

  return (
    <html lang="en" className={isDark ? "dark" : ""}>
      <body className="no-scrollbar">
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
