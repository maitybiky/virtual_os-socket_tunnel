"user client";
import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import useTerminalStore, { IO } from "@/util/globalState/terminal";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { CloseCallbackData } from "@/Clientcomp/EditorDrawer";
import { io, Socket } from "socket.io-client";
import { v4 as uuid } from "uuid";

const TerminalComp = ({
  onTerminalAction,
  terminalScreenType,
}: {
  onTerminalAction: (data: CloseCallbackData) => void;
  terminalScreenType: "full-screen" | "normal-screen";
  onStdout?: (mresult: string) => void;
}) => {
  const {
    commandHistory,
    lastCommand,
    keyPress,
    pushToCommandHistory,
    clearTerminal,
  } = useTerminalStore();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const terminal = useRef<Terminal | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const directory = useRef<string>("╭─ 👾 ~ /surajit\r\n");
  const lineArrow = useRef<string>("╰─❯");
  const socketRef = useRef<Socket | null>(null);
  const writeInfo = () => {
    terminal.current?.write("\r\n");
    terminal.current?.write(directory.current);
    terminal.current?.write(lineArrow.current);
  };
  useEffect(() => {
    console.log("mounted");
    socketRef.current = io("http://localhost:3000");
    if (socketRef.current?.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);

      socketRef.current?.on("exec:output", (data) => {
        console.log("data", data);
        // handleOutPutRecive()
      });
      socketRef.current?.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      console.log("dis-connected");
      setIsConnected(false);
      setTransport("N/A");
    }

    socketRef.current?.on("connect", onConnect);
    socketRef.current?.on("disconnect", onDisconnect);

    return () => {
      console.log("unmount");
      socketRef.current?.off("connect", onConnect);
      socketRef.current?.off("disconnect", onDisconnect);
      socketRef.current?.off("exec:output");
      socketRef.current?.io.engine.off("upgrade");
      socketRef.current?.disconnect();
    };
  }, []);
  // side effect when key press for terminal
  useEffect(() => {
    if (!keyPress) return;
    if (keyPress === "enter") {
      handleEnter();
    } else if (keyPress === "clear") {
    } else {
      handleTerminalInput(keyPress);
    }
  }, [keyPress]);

  useEffect(() => {
    if (terminalRef.current) {
      terminal.current = new Terminal();
      terminal.current?.open(terminalRef.current);
      terminal.current?.write(
        commandHistory
          .map((cmd) => `\x1B[1;32m❯\x1B[0m ${cmd.command}\r\n${cmd.output}`)
          .join("\r\n")
      );
      writeInfo();
    }
    return () => {
      terminal.current?.dispose();
    };
  }, []);
  const sendCommandToServer = (commandInstance: IO) => {
    if (socketRef.current?.connected) {
      console.log("commandInstance", commandInstance);
      console.log("Emitting exec:input from client", socketRef.current?.id);
      socketRef.current?.emit("exec:input", commandInstance);
    } else {
      console.error("Socket is not connected, cannot send command.");
    }
  };

  const handleEnter = async () => {
    const line = terminal.current?.buffer.active
      .getLine(terminal.current?.buffer.active.cursorY)
      ?.translateToString();

    const command = line?.substring(lineArrow?.current?.length).trim();
    console.log(command);
    const commandInstance: IO = {
      command: command ?? "",
      output: "",
      id: uuid(),
    };
    if (command === "clear") {
      terminal.current?.clear();
      terminal.current?.reset();
      return clearTerminal();
    }
    if (command) sendCommandToServer(commandInstance); // result will be in handleOutPutRecive
  };

  const handleOutPutRecive = (commandInstance: IO) => {
    let _commands_history: IO[] = [...commandHistory, commandInstance];
    terminal.current?.clear();
    terminal.current?.reset();

    terminal.current?.write(
      _commands_history
        .map((cmd) => `\x1B[1;32m❯\x1B[0m ${cmd.command}\r\n${cmd.output}`)
        .join("\r\n")
    );

    writeInfo();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleTerminalInput = (data: string) => {
    const charCode = data.charCodeAt(0);

    if (charCode === 13) {
      // Enter key
      handleEnter();
    } else if (charCode === 127) {
      // Backspace key
      terminal.current?.write("\b \b");
    } else {
      terminal.current?.write(data);
    }
  };
  return (
    <>
      <div
        style={{
          minHeight: "2rem",
          borderRadius: "50px 50px 0 0",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 5,
        }}
      >
        <IconButton>{isConnected ? "online" : "offline"}</IconButton>
        <IconButton onClick={() => onTerminalAction({ type: "minimize" })}>
          <MinimizeIcon />
        </IconButton>
        {terminalScreenType === "full-screen" && (
          <IconButton
            onClick={() => onTerminalAction({ type: "normal-screen" })}
          >
            <FullscreenExitIcon />
          </IconButton>
        )}
        {terminalScreenType === "normal-screen" && (
          <IconButton onClick={() => onTerminalAction({ type: "full-screen" })}>
            <FullscreenIcon />
          </IconButton>
        )}

        <IconButton onClick={() => onTerminalAction({ type: "close" })}>
          <ClearIcon />
        </IconButton>
      </div>
      <div ref={terminalRef}></div>
      <div ref={scrollRef}></div>
    </>
  );
};

export default TerminalComp;
