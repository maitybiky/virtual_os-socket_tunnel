import { KeyBoardThemeNames, KeyColor } from "@/util/types";
import { availableThemes } from "./keyThemes";

export const left_keys = [
  ["q", "Q"],
  ["w", "W"],
  ["e", "E"],
  ["r", "R"],
  ["a", "A"],
  ["s", "S"],
  ["d", "D"],
  ["f", "F"],
  ["z", "Z"],
  ["x", "X"],
  ["c", "C"],
  ["v", "V"],
];

export const right_keys = [
  ["u", "U"],
  ["i", "I"],
  ["o", "O"],
  ["p", "P"],
  ["g", "G"],
  ["h", "H"],
  ["j", "J"],
  ["k", "K"],
  ["l", "L"],
  ["b", "B"],
  ["n", "N"],
  ["m", "M"],
];

export const left_extra_keys = [
  ["1", "!"],
  ["2", "@"],
  ["3", "#"],
  ["4", "$"],
  ["5", "<-"],
  ["change", "change"],
  ["paste", "paste"],
  ["space", "space"],
];
export const right_extra_keys = [
  ["6", "^"],
  ["7", "&"],
  ["8", "*"],
  ["9", "("],
  ["0", "->"],
  ["clear", "clear"],
  ["enter", "enter"],
  ["space", "space"],
];
export const left_coding_keys = [
  ["{", "_"],
  [";", "="],
  ["(", "/"],
  ["/", "`"],
  ["<", "%"],
  ["]", "|"],
  ["[", "]"],
  ["t", "T"],
];
export const right_coding_keys = [
  ["}", "-"],
  [".", "+"],
  [")", "?"],
  [`"\"`, "~"],
  ["y", "Y"],
  ["]", "]"],
  [":", ":"],
  [">", ">"],
];

export const dynamicKeyColor = (
  key: string,
  theme: KeyBoardThemeNames
): KeyColor => {
  const selectedTheme =
    availableThemes.find((it) => it.name === theme) ?? availableThemes[0];
  const config = selectedTheme.config;
  const default_theme = config.default;

  // cheack a->z
  if (/^[a-z]$/i.test(key)) {
    return config.alphabet;
  }
  //cheack numbers
  if (/^\d+$/.test(key)) return config.numbers;

  // other key
  return default_theme;
};
