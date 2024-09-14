import { Box, Stack } from "@mui/material";
import React from "react";
import RightKeyPad from "./KeyPad";
import { right_coding_keys, right_extra_keys, right_keys } from "./keys";

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

const RightPad = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <RightKeyPad keys={right_coding_keys} />
        <RightKeyPad keys={right_keys} />
        <RightKeyPad keys={right_extra_keys} />
      </Stack>
    </Box>
  );
};

export default RightPad;
