"use client";
import React, { useCallback, useEffect, useState } from "react";
import FullScreen from "@/Clientcomp/FullScreenWrapper";
import Keyboard from "@/Clientcomp/Keyboard/Keyboard";
import useEditorStore from "@/util/globalState/editor";
import FileContentParser from "@/Clientcomp/Keyboard/FileContentParser";
import { Box, Button, Typography } from "@mui/material";


const Editor = () => {
  const { currentFile } = useEditorStore();
  const [start, setStart] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [editorFlag, setEditorFlag] = useState(false);
  const handleOrientationChange = () => {
    const or: any = window.screen.orientation;
    if (window.screen.orientation && or.lock) {
      or.lock("landscape").catch((err: Error) => {
        console.error("Orientation lock failed:", err);
      });
    } else {
      console.warn(
        "Screen orientation lock API is not supported on this device."
      );
    }
  };

  const fullScreenError = useCallback(
    (err: Error) => {
      setStart(false);
      alert(err.message);
      alert(err.name);
    },
    [setStart]
  );

  const fullScreenSuccess = useCallback(() => {
    handleOrientationChange();
    setEditorFlag(true);
  }, []);

  const onOrientationChange = () => {
    setEditorFlag(!(window.screen.orientation.type === "portrait-primary"));
  };
  useEffect(() => {
    window.addEventListener("orientationchange", onOrientationChange);
    setHydrated(true);
    return () => {
      window.removeEventListener("orientationchange", onOrientationChange);
    };
  }, []);


  return (
    <>
      <FullScreen
        start={start}
        fullScreenError={fullScreenError}
        fullScreenSuccess={fullScreenSuccess}
        setStart={setStart}
      >
        {start && editorFlag ? (
          <Keyboard>
            <FileContentParser>{currentFile.content}</FileContentParser>
          </Keyboard>
        ) : (
          <>
            <Box marginX={3}>
              <Button onClick={() => setStart(true)}>Continue Coding</Button>
              {hydrated && (
                <Typography>{currentFile.content.slice(0, 100)}...</Typography>
              )}
            </Box>
          </>
        )}
      </FullScreen>
    </>
  );
};

export default Editor;
