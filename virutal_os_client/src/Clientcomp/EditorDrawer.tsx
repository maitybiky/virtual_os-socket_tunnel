import * as React from "react";
import Drawer from "@mui/material/Drawer";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import TerminalIcon from "@mui/icons-material/Terminal";
import Setting from "./Editor/DrawerChilds/Setting";
import { IconButton } from "@mui/material";
import TerminalComp from "./Editor/DrawerChilds/Terminal";
import useEditorStore from "@/util/globalState/editor";
import { useState, useEffect } from "react";
import useTerminalStore from "@/util/globalState/terminal";

export type CloseCallbackData = {
  type: "close" | "minimize" | "full-screen" | "normal-screen";
};
type Position = "top" | "left" | "bottom" | "right";
type DrawerSoul = {
  position: Position;
  button: string | React.ReactNode;
  child: React.ReactNode;
};

export default function EditorDrawer({
  containerRef,
}: {
  containerRef: HTMLDivElement | null;
}) {
  //global keyboard state
  const { setCurrentKeyBoardFor, currentKeyBoardFor } = useEditorStore(); // wheter keyboard write keys to file or terminal

  //terminal state
  const { clearTerminal } = useTerminalStore();
  // drawer close open state
  const [state, setState] = useState<{ [key in Position]: boolean }>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [keepMounted, setKeepMounted] = useState<0 | 1 | 2>(1); //default 1,minimize 2 , close 0
  const [terminalScreenType, setTerminalScreenType] = useState<
    "full-screen" | "normal-screen"
  >("normal-screen");
const onSettingAction=()=>{
  setState((prevState) => ({
    ...prevState,
    right: false, 
  }));
}
  // handle either terminla close or open or minimize
  const onTerminalAction = ({ type }: CloseCallbackData) => {
    if (type === "close") {
      clearTerminal();
      setCurrentKeyBoardFor("file"); // now keyboard will write to files

      setKeepMounted(0); // Update keepMounted state
      setState((prevState) => ({
        ...prevState,
        bottom: false, // Close the terminal drawer immediately
      }));
    }

    if (type === "full-screen" || type === "normal-screen") {
      return setTerminalScreenType(type);
    }

    if (type === "minimize") {
      setCurrentKeyBoardFor("file"); // now keyboard will write to files
      setKeepMounted(2); // Keep drawer mounted but minimized
      setState((prevState) => ({
        ...prevState,
        bottom: false, // Close the terminal drawer immediately
      }));
    }
  };

  const drawers: DrawerSoul[] = [
    {
      position: "left",
      child: <>upcomming...</>,
      button: <FolderIcon />,
    },
    {
      position: "right",
      child: <Setting onSettingAction={onSettingAction} />,
      button: <SettingsIcon />,
    },
    {
      position: "bottom",
      child: (
        <TerminalComp
          isOpen={state["bottom"]}
          terminalScreenType={terminalScreenType}
          onTerminalAction={onTerminalAction}
        />
      ),
      button: <TerminalIcon />,
    },
  ];
  const toggleDrawer =
    (anchor: Position, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  //this will determine on where keyboard wirte to [either terminal or file]
  useEffect(() => {
    if (currentKeyBoardFor === "file" && state.bottom) {
      setCurrentKeyBoardFor("terminal");
    } else if (currentKeyBoardFor === "terminal" && !state.bottom) {
      setCurrentKeyBoardFor("file");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKeyBoardFor, state.bottom]);

  return (
    <div>
      {drawers.map(({ position, button, child }) => (
        <React.Fragment key={position}>
          <IconButton onClick={toggleDrawer(position, true)}>
            {button}
          </IconButton>
          <Drawer
            container={containerRef}
            anchor={position}
            open={state[position]}
            ModalProps={{
              hideBackdrop: true,
              slots: {
                backdrop: "div",
              },
              slotProps: {
                root: {
                  //override the fixed position + the size of backdrop
                  style: {
                    position: "absolute",
                    top: "unset",
                    bottom: "unset",
                    left: "unset",
                    right: "unset",
                  },
                },
              },
            }}
            keepMounted={!!keepMounted}
            onClose={
              position === "bottom" ? undefined : toggleDrawer(position, false)
            }
            PaperProps={{
              sx:
                position === "bottom"
                  ? {
                      width: "50%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      borderRadius: "5px 5px 0 0",
                      height:
                        terminalScreenType === "full-screen" ? "950vh" : "30vh",
                    }
                  : {},
            }}
          >
            {child}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
