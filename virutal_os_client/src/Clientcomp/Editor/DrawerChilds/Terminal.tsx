"user client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

const TerminalComp = ({
  onTerminalAction,
  terminalScreenType,
  isOpen,
}: {
  onTerminalAction: (data: CloseCallbackData) => void;
  terminalScreenType: "full-screen" | "normal-screen";
  isOpen: boolean;
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
  // const directory = useRef<string>("╭─ 👾 ~ /surajit\r\n");
  // const lineArrow = useRef<string>("╰─❯");
  const socketRef = useRef<Socket | null>(null);

  const onConnect = useCallback(() => {
    setIsConnected(true);

    socketRef.current?.emit("container-id", {
      id: "180b33c37024",
    });
    socketRef.current?.on("exec:output", onOuput);
    socketRef.current?.on("exec:error", onError);
    socketRef.current?.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name);
    });
  }, []);
  const onDisconnect = useCallback(function () {
    console.log("dis-connected");
    setIsConnected(false);
    setTransport("N/A");
  }, []);
  useEffect(() => {
    if (!isOpen) {
      return onTerminalClose();
    }
    const tunnelServerUrl =
      process.env.NEXT_PUBLIC_TUNNEL_SERVER ?? "http://localhost:8000";
    const socketToken = localStorage.getItem("socket-auth");
    if (!socketToken) return alert("un authorized relogin");

    socketRef.current = io(tunnelServerUrl, {
      auth: {
        token: socketToken,
      },
    });
    if (socketRef.current?.connected) {
      onConnect();
    }

    socketRef.current?.on("connect", onConnect);
    socketRef.current?.on("disconnect", onDisconnect);

    return () => {
      onTerminalClose();
    };
  }, [isOpen, onConnect, onTerminalClose]);
  function onTerminalClose() {
    console.log("unmount");
    socketRef.current?.off("connect", onConnect);
    socketRef.current?.off("disconnect", onDisconnect);
    socketRef.current?.off("exec:output", onOuput);
    socketRef.current?.off("exec:error", onError);
    socketRef.current?.io.engine.off("upgrade");
    socketRef.current?.disconnect();
  }

  function onOuput(data: string) {
    terminal.current?.write(data);
  }
  function onError(data: any) {
    console.log(data);
  }
  // side effect when key press for terminal
  useEffect(() => {
    if (!keyPress) return;

    switch (keyPress) {
      case "enter":
        sendKeyPressToServer("\r");
        break;

      case "clear":
        sendKeyPressToServer("\b \b");
        break;

      case "space":
        sendKeyPressToServer(" ");
        break;

      default:
        sendKeyPressToServer(keyPress);
        break;
    }
  }, [keyPress]);

  useEffect(() => {
    if (terminalRef.current) {
      terminal.current = new Terminal();
      terminal.current?.open(terminalRef.current);
    }
    return () => {
      terminal.current?.dispose();
    };
  }, []);

  const sendKeyPressToServer = (command: string) => {
    if (socketRef.current?.connected) {
      socketRef.current?.emit("exec:input", { command });
    } else {
      console.error("Socket is not connected, cannot send command.");
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
      <div id="hello" ref={terminalRef}></div>
      <div ref={scrollRef}></div>
    </>
  );
};

export default TerminalComp;
