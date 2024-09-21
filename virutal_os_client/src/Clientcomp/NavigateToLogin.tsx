"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const NavigateToLogin = () => {
  const router = useRouter();
  router.push("/login");
  return <div></div>;
};

export default NavigateToLogin;
