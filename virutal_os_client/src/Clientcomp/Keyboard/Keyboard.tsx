"use client"
import * as React from "react";

import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LeftPad from "./LeftPad";
import RightPad from "./RightPad";

interface KeyBoardProps {
  children: React.ReactNode;

}

const Keyboard = ({ children }: KeyBoardProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        sx={{ height: "100vh" }}
        container
        rowSpacing={1}
        columnSpacing={1}
        columns={12}
      >
        <Grid size={3}>
          <LeftPad />
        </Grid>
        <Grid size={6}>{children}</Grid>
        <Grid size={3}>
          <RightPad />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Keyboard;
