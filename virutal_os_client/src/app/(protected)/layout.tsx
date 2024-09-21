"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/ServerComponent/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isAuth = useRef(false);

  useLayoutEffect(() => {
    console.log("cheacking auth");

    isAuth.current = !!localStorage.getItem("auth");
    if (!isAuth.current) {
      router.push("/login"); // Redirect to the login page if not authenticated
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
