"use client";
import useEditorStore from "@/util/globalState/editor";
import { Button, Grid2 } from "@mui/material";
import React, { useState } from "react";
import { dynamicKeyColor } from "./keys";
import useEditorSettingStore from "@/util/globalState/editorSetting";
import useTerminalStore from "@/util/globalState/terminal";

const KeyPad = ({ keys }: { keys: string[][] }) => {
  const { writeToFile, currentKeyBoardFor } = useEditorStore();
  const { keySpacing, keyFontSize, keyHeight, keyWidth } =
    useEditorSettingStore();
  const { writeToTerminal } = useTerminalStore();
  const {
    keyBoardTheme,
    keyStyle,
    vibration,
    toogleKeyLayout,
    whichKeyLayout,
  } = useEditorSettingStore();
  // whichKeyLayout determine the index of key . example key =["a","A"]. so keyTpe =0 refer small and whichKeyLayout = 1 refer Caps value

  return (
    <Grid2
      sx={{
        justifyContent: "space-around",
        alignItems: "center",
      }}
      container
      spacing={keySpacing}
      columns={4}
    >
      {keys.map((key, index) => (
        <Grid2 key={index}>
          <Button
            onClick={() => {
              if ("vibrate" in navigator) {
                if (!vibration) return;
                navigator.vibrate(vibration > 100 ? 100 : vibration);
              }
              if (key[whichKeyLayout] === "change") return toogleKeyLayout();
              if (currentKeyBoardFor === "terminal")
                writeToTerminal(key[whichKeyLayout]);
              else writeToFile(key[whichKeyLayout]);
            }}
            sx={{
              padding: "5px",
              height: `${keyHeight / 10}rem`,
              minWidth:
                key[whichKeyLayout] === "space"
                  ? `${keyWidth / 10 + 4}rem`
                  : `${keyWidth / 10}rem`,
              textTransform: "none",
              fontSize: `${keyFontSize / 10}rem`,
              // padding: "0 1rem",
              "&:hover": {
                // fontSize: "1.5rem",
                transform: "scale(1.1)",
              },
            }}
            variant={keyStyle}
            color={dynamicKeyColor(key[whichKeyLayout], keyBoardTheme)}
          >
            {key[whichKeyLayout] === "clear"
              ? "⌫"
              : key[whichKeyLayout] === "change"
              ? "^"
              : key[whichKeyLayout]}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};
export default KeyPad;
