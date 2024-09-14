import { createTheme, Theme } from "@mui/material/styles";

const setTypography = (fontSize: number) => ({
  fontSize: fontSize,
  h1: {
    fontSize: `${fontSize * 2.5}px`,
  },
  h2: {
    fontSize: `${fontSize * 2}px`,
  },
  body1: {
    fontSize: `${fontSize}px`,
  },
});

export const getDarkTheme = (fontSize: number): Theme =>
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
    },
    typography: setTypography(fontSize),
  });

export const getLightTheme = (fontSize: number): Theme =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
    },
    typography: setTypography(fontSize),
  });

export const getDefaultTheme = (fontSize: number): Theme =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ff9800",
      },
    },
    typography: setTypography(fontSize),
  });
