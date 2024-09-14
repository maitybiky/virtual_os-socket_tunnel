import { Box, Stack } from "@mui/material";
import React from "react";
import LeftKeyPad from "./KeyPad";
import { left_coding_keys, left_extra_keys, left_keys } from "./keys";

const Bg = () => (
  <div
    style={{
      backgroundColor: "grey",
      height: "30vh",
      width: "100%",
      borderRadius: 5,
    }}
  >
    .
  </div>
);
const LeftPad = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        
        <LeftKeyPad keys={left_coding_keys} />
        <LeftKeyPad keys={left_keys} />
        <LeftKeyPad keys={left_extra_keys} />
      </Stack>
    </Box>
  );
};

export default LeftPad;
