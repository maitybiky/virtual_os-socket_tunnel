import { KeyBoardThemePack, KeyColor, ThemeConfig } from "@/util/types";

const rgb: ThemeConfig = {
  default: "error",
  alphabet: "success",
  numbers: "primary",
};
const ybr: ThemeConfig = {
  default: "warning",
  alphabet: "info",
  numbers: "error",
};
const blue: ThemeConfig = {
  default: "primary",
  alphabet: "primary",
  numbers: "primary",
};

export const availableThemes: KeyBoardThemePack[] = [
  {
    name: "RGB",
    config: rgb,
  },
  {
    name: "YBR",
    config: ybr,
  },
  {
    name: "Aqua Pulse",
    config: createSingleColorTheme("Aqua Pulse"),
  },
  {
    name: "Crimson Blaze",
    config: createSingleColorTheme("Crimson Blaze"),
  },
  {
    name: "Electric Lemon",
    config: createSingleColorTheme("Electric Lemon"),
  },
  {
    name: "Cyber Wave",
    config: createSingleColorTheme("Cyber Wave"),
  },
  {
    name: "Neon Leaf",
    config: createSingleColorTheme("Neon Leaf"),
  },
  {
    name: "Princess Vibes",
    config: createSingleColorTheme("Princess Vibes"),
  },
];
function createSingleColorTheme(themeName: string): ThemeConfig {
  let allColor: KeyColor;
  switch (themeName) {
    case "Crimson Blaze":
      allColor = "error";

      break;
    case "Electric Lemon":
      allColor = "warning";

      break;
    case "Cyber Wave":
      allColor = "primary";

      break;
    case "Neon Leaf":
      allColor = "success";

      break;
    case "Aqua Pulse":
      allColor = "info";
      break;
      
    case "Princess Vibes":
      allColor = "secondary";

      break;

    default:
      allColor = "secondary";
      break;
  }
  return {
    default: allColor,
    alphabet: allColor,
    numbers: allColor,
  };
}
