import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Grid2, Typography } from "@mui/material";
import ChooseTheme from "./ChooseTheme";
import { FontSize, Theme, useStore } from "@/util/globalState/appSetting";
import ChoosePreferences from "./ChooseTheme";

export default function Preferences() {
  const { changeFontSize, changeTheme, theme, fontSize } = useStore();
  const changeThemeCallBack = (data: string) => {
    changeTheme(data as Theme);
  };
  const changeFontSizeCallBack = (data: string) => {
    changeFontSize(data as FontSize);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <ChoosePreferences
            onChange={changeThemeCallBack}
            options={["Dark", "Light", "Default"]}
            label={"Select Theme"}
            defaultVal={theme}
          />
        </Grid2>
        <Grid2 size={12}>
          <ChoosePreferences
            onChange={changeFontSizeCallBack}
            options={[ "Small", "Medium", "Large", ]}
            label={"Select Font"}
            defaultVal={"small"}
          />
        </Grid2>{" "}
        <Grid2 size={12}>
          <ChoosePreferences defaultVal="12 H" options={["12 H", "24 H"]} label={"Time Format"} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
