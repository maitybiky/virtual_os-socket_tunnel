import { Box, FormLabel, Slider } from "@mui/material";
import React from "react";
import VibrationIcon from "@mui/icons-material/Vibration";
import useEditorSettingStore from "@/util/globalState/editorSetting";
import SettingTitle from "./SettingTitle";
const VibrateSelect = () => {
  const { vibration, setVibration } = useEditorSettingStore();

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVibration(newValue as number);
  };
  return (
    <>
      <SettingTitle title="Vibration" icon={<VibrationIcon />}>
        <Slider
          min={0}
          max={100}
          aria-label="Volume"
          value={vibration}
          onChange={handleChange}
        />
      </SettingTitle>
    </>
  );
};

export default VibrateSelect;
