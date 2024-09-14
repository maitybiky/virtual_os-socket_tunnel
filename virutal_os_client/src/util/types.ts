export interface BarChartInitPropsType {
  dataX: any[];
  dataY: any[];
}
export interface LineChartInitPropsType {
  dataX: any[];
  dataY: any[];
  error?: unknown;
}
export interface PieChartInitPropsType {
  data: any[];
}
export interface ScatterChartInitPropsType {
  data: any[];
}
export type allPageInitProps = {
  props: {
    barChartInitProps: BarChartInitPropsType;
  };
};

export type KeyStyles = "contained" | "outlined" | "text";
export type ThemeConfig = {
  default: KeyColor;
  alphabet: KeyColor;
  numbers: KeyColor;
};
export type KeyColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
export type KeyBoardThemeNames =
  | "Crimson Blaze"
  | "Electric Lemon"
  | "Cyber Wave"
  | "Neon Leaf"
  | "Aqua Pulse"
  | "Princess Vibes"
  | "RGB"
  | "YBR";
export type KeyBoardThemePack = {
  name: KeyBoardThemeNames;
  config: ThemeConfig;
};
