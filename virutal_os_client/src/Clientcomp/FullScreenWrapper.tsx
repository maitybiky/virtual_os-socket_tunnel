"use client";
import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { CommonHorizontalAppBar } from "./SideBarDrawer";
import LogoutIcon from "@mui/icons-material/Logout";
import EditorDrawer from "./EditorDrawer";
export default function FullScreen({
  children,
  fullScreenSuccess,
  fullScreenError,
  start,
  setStart,
}: {
  children: React.ReactNode;
  start: boolean;
  fullScreenSuccess: () => void;
  fullScreenError: (err: Error) => void;
  setStart: (data: boolean) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setStart(false);
      });
    } else if (containerRef.current) {
      containerRef.current.requestFullscreen().then(() => setStart(true));
    }
  };
  useEffect(() => {
    if (!start) return;
    if (containerRef.current) {
      containerRef.current
        .requestFullscreen()
        .then(() => {
          fullScreenSuccess();
        })
        .catch((err) => {
          console.log("err", err);
          fullScreenError(err);
        });
    }
  }, [start, fullScreenError, fullScreenSuccess]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        display: "block",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {start && (
        <Toolbar sx={{ color: "theme.palette.type" }}>
          <EditorDrawer  containerRef={containerRef.current} />

          <Button onClick={handleFullscreen}>
            {" "}
            <LogoutIcon />
            Exit{" "}
          </Button>

          <CommonHorizontalAppBar />
        </Toolbar>
      )}

      {children}
    </Box>
  );
}
