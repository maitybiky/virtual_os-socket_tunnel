import React from "react";
import ThemeSelect from "./ThemeSelect";
import { Divider, FormControl } from "@mui/material";
import ButtonSelect from "./ButtonSelect";
import VibrateSelect from "./VibrateSelect";

const KeyboardSetting = () => {
  return (
    <FormControl sx={{ paddingX: 2 }}>
      <ThemeSelect />
      <Divider />
      <ButtonSelect />
      <Divider />
      <VibrateSelect />
    </FormControl>
  );
};

export default KeyboardSetting;
