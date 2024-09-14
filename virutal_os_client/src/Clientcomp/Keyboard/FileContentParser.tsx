"use client";
import useEditorStore from "@/util/globalState/editor";
import React, { useEffect, useRef } from "react";
const FileContentParser = ({ children }: { children: string }) => {
  const { setCursorPosition, cursorPosition } = useEditorStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleCursorPosition = (event: any) => {
    event.preventDefault();
    const position = event.target.selectionStart;
    setCursorPosition(position);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
      inputRef.current.focus()
    }
  }, [children,cursorPosition]);

  return (
    <>
      {/* <span className={styles.blinkingBox}>_</span> */}
      <textarea
        ref={inputRef}
        inputMode="none"
        style={{
          height: "100vh",
          width: "100%",
          background: "none",
          color: "inherit",
          border: "none",
          outline: "none",
          lineHeight: "2",
          padding: "0",
          margin: "0",
          resize: "none",
        }}
        spellCheck="false"
        value={children}
        onClick={handleCursorPosition}
      />
    </>
  );
};

export default FileContentParser;
