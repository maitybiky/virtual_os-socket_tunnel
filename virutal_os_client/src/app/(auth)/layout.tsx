"use client";

import ThemeWrapper from "@/util/ThemeWrapper";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuth = useRef(false);
  useLayoutEffect(() => {
    isAuth.current = !!sessionStorage.getItem("auth");
    if (isAuth.current) {
      router.push("/dashboard"); // Redirect to the login page if not authenticated
    }
  }, [isAuth.current, router]);
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>{children} </ThemeWrapper>
      </body>
    </html>
  );
}
