"use client";
import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Collapse, IconButton, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import KeyboardSetting from "@/Clientcomp/KeyboardSetting/Index";

const SettingList = [
  {
    text: "Keyboard",
    icon: <KeyboardIcon />,
  },
];
const Setting = ({
  onSettingAction,
}: {
  onSettingAction: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [keyboardSettingOpen, setKeyboardSettingOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <ListItem disablePadding>
        <ListItemButton
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon sx={{ alignItems: "center" }}>
            <SettingsIcon />
            <Typography variant="h6" paddingX={2}>
              Settings
            </Typography>
          </ListItemIcon>
          <IconButton onClick={onSettingAction}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </ListItemButton>
      </ListItem>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {SettingList.map(({ text, icon }, index) => (
          <ListItem sx={{ display: "block" }} key={text} disablePadding>
            <ListItemButton
              onClick={() => setKeyboardSettingOpen((pre) => !pre)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
              {keyboardSettingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={keyboardSettingOpen} timeout="auto" unmountOnExit>
              <KeyboardSetting />
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Setting;
