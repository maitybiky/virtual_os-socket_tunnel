"use client";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import useEditorSettingStore from "@/util/globalState/editorSetting";
import { KeyBoardThemeNames } from "@/util/types";
import { availableThemes } from "../Keyboard/keyThemes";

import ContrastIcon from "@mui/icons-material/Contrast";
import SettingTitle from "./SettingTitle";
export default function ThemeSelect() {
  const { keyBoardTheme, changeKeyBoardTheme } = useEditorSettingStore();

  return (
    <>
      <SettingTitle title="Themes" icon={<ContrastIcon />}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={keyBoardTheme}
          onChange={(e) =>
            changeKeyBoardTheme(e.target.value as KeyBoardThemeNames)
          }
        >
          {availableThemes.map((theme) => (
            <FormControlLabel
              key={theme.name}
              value={theme.name}
              control={<Radio />}
              label={theme.name}
            />
          ))}
        </RadioGroup>
      </SettingTitle>
    </>
  );
}
