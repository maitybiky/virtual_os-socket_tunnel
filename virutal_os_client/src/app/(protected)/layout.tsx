"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/ServerComponent/Sidebar/Sidebar";
import Loading from "@/ServerComponent/Global/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage rendering
  const isAuth = useRef(false);

  useLayoutEffect(() => {
    console.log("checking auth");

    isAuth.current = !!sessionStorage.getItem("auth");

    if (!isAuth.current) {
      router.push("/login"); // Redirect to login page if not authenticated
    } else {
      setIsLoading(false); // Authenticated, stop loading
    }
  }, [router]);

  if (isLoading) {
    return <Loading />; // Prevent rendering until auth check is done
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
