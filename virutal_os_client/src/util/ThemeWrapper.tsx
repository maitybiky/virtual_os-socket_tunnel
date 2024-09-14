"use client"
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getDefaultTheme, getDarkTheme, getLightTheme } from "@/util/theme";
import { useStore } from "./globalState/appSetting";
const ThemeWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme, fontSize } = useStore();
  const getTheme = () => {
    switch (theme) {
      case "light":
        return getLightTheme(fontSize);
      case "dark":
        return getDarkTheme(fontSize);
      default:
        return getDefaultTheme(fontSize);
    }
  };

  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
