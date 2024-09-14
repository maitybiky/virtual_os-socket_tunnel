"use client";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import useEditorSettingStore from "@/util/globalState/editorSetting";
import { KeyStyles } from "@/util/types";
import SettingTitle from "./SettingTitle";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
export default function ButtonSelect() {
  const keyStyles = [
    {
      name: "Fill",
      value: "contained",
    },
    {
      name: "Border",
      value: "outlined",
    },
    {
      name: "Night",
      value: "text",
    },
  ];
  const { keyStyle, changeKeyStyle } = useEditorSettingStore();
  return (
    <>
      <SettingTitle title="Keys" icon={<SpaceBarIcon />}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={keyStyle}
          onChange={(e) => changeKeyStyle(e.target.value as KeyStyles)}
        >
          {keyStyles.map((theme) => (
            <FormControlLabel
              key={theme.name}
              value={theme.value}
              control={<Radio />}
              label={theme.name}
            />
          ))}
        </RadioGroup>
      </SettingTitle>
    </>
  );
}
