"user client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import useTerminalStore, { IO } from "@/util/globalState/terminal";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { IconButton, Snackbar } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { CloseCallbackData } from "@/Clientcomp/EditorDrawer";
import { io, Socket } from "socket.io-client";
import CloseIcon from "@mui/icons-material/Close";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
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
  const { keyPress, timestamp } = useTerminalStore();
  const [isConnected, setIsConnected] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState("...");
  const [transport, setTransport] = useState("N/A");
  const terminal = useRef<Terminal | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const socketRef = useRef<Socket | null>(null);

  const onConnect = useCallback(() => {
    setIsConnected(true);
    console.log(isOpen, "isopen");

    socketRef.current?.on("exec:output", onOuput);
    socketRef.current?.on("exec:error", onError);
    socketRef.current?.on("exec:info", onInfo);
    socketRef.current?.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name);
    });
  }, []);
  const onDisconnect = useCallback(function () {
    console.log("dis-connected");
    setIsConnected(false);
    setTransport("N/A");
  }, []);
  const onConnectError = useCallback(function (err: Error) {
    console.log("Connection Error : ", err.message);

    setErrMsg(err.message);
    setOpen(true);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    if (socketRef.current) return;
    const tunnelServerUrl =
      process.env.NEXT_PUBLIC_TUNNEL_SERVER ?? "http://localhost:8000";

    const socketToken = sessionStorage.getItem("socket-auth");

    if (!socketToken) return alert("un authorized relogin");

    socketRef.current = io(tunnelServerUrl, {
      auth: {
        token: socketToken,
      },
      query: {
        agent: "web",
        containerId: "host",
      },
    });
    console.log(socketRef.current);

    socketRef.current?.on("connect", onConnect);
    socketRef.current?.on("disconnect", onDisconnect);
    socketRef.current?.on("connect_error", onConnectError);
  }, [isOpen]);
  function onTerminalClose() {
    if (!socketRef.current) return;
    socketRef.current?.off("connect", onConnect);
    socketRef.current?.off("connect_error", onConnectError);
    socketRef.current?.off("disconnect", onDisconnect);
    socketRef.current?.off("exec:output", onOuput);
    socketRef.current?.off("exec:info", onInfo);
    socketRef.current?.off("exec:error", onError);
    socketRef.current?.io.engine.off("upgrade");
    socketRef.current?.disconnect();
    socketRef.current = null;
  }

  function onOuput(data: string) {
    terminal.current?.write(data);

  }
  function onError(data: any) {
    setErrMsg(data.msg);
    setOpen(true);
    console.log(data.msg);
  }
  function onInfo(data: any) {
    sendKeyPressToServer("uname -a\n");
    setInfo(data.msg);
    setErrMsg(data.msg);
    setOpen(true);
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
  }, [keyPress, timestamp]);

  useEffect(() => {
    if (terminalRef.current) {
      terminal.current = new Terminal({
        cursorBlink: true,
        cursorStyle: "block",
      })
      terminal.current?.open(terminalRef.current);
      const textarea = document.getElementsByClassName('xterm-helper-textarea')[0];
      console.log(textarea)
      textarea?.setAttribute('inputMode', "none");
    }
    return () => {
      onTerminalClose();
      terminal.current?.dispose();
    };
  }, []);

  const sendKeyPressToServer = (command: string) => {
    console.log(command, socketRef);
    if (socketRef.current) {
      socketRef.current?.emit("exec:input", { command });
    } else {
      console.error("Socket is not connected, cannot send command.");
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
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
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false);
            setErrMsg("");
          }}
          message={errMsg}
          action={action}
        />

        <IconButton>
          {info.includes("online") && isConnected ? (
            <PhonelinkIcon sx={{ color: "green" }} />
          ) : (
            <PhonelinkIcon sx={{ color: "red" }} />
          )}
        </IconButton>

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
