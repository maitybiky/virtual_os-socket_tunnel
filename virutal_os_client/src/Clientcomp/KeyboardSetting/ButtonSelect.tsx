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
import { Slider } from "@mui/material";
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
  const keySpaces = [
    {
      name: "0",
      value: 0,
    },
    {
      name: "0.5",
      value: 0.5,
    },
    {
      name: "1",
      value: 1,
    },
    {
      name: "2",
      value: 2,
    },
  ];
  const {
    keyStyle,
    changeKeyStyle,
    setKeySpacing,
    keySpacing,
    keyFontSize,
    setKeyFontSize,
    keyHeight,
    setKeyheight,
    keyWidth,
    setKeyWidth,
  } = useEditorSettingStore();
  return (
    <>
      <SettingTitle title="Keys" icon={<SpaceBarIcon />}>
        <FormLabel component="legend">Style</FormLabel>
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
        </RadioGroup>{" "}
        <FormLabel id="space" component="legend">Space</FormLabel>
        <RadioGroup
          row
          aria-labelledby="space"
          name="row-radio-buttons-group"
          value={keySpacing}
          onChange={(e) => setKeySpacing(Number(e.target.value))}
        >
          {keySpaces.map((theme) => (
            <FormControlLabel
              key={theme.name}
              value={theme.value}
              control={<Radio />}
              label={theme.name}
            />
          ))}
        </RadioGroup>
        <FormLabel id="font-size-range" component="legend">Font size</FormLabel>
        <Slider
          min={0}
          max={10}
          aria-label="font-size-range"
          value={keyFontSize}
          onChange={(e, value) => setKeyFontSize(value as number)}
        />
        <FormLabel id="height-key" component="legend">Height</FormLabel>
        <Slider
          min={10}
          max={30}
          aria-label="height-key"
          value={keyHeight}
          onChange={(e, value) => setKeyheight(value as number)}
        />
        <FormLabel id="width-key" component="legend">Width</FormLabel>
        <Slider
          min={10}
          max={30}
          aria-label="width-key"
          value={keyWidth}
          onChange={(e, value) => setKeyWidth(value as number)}
        />
      </SettingTitle>
    </>
  );
}
