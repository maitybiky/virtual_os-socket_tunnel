import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

const SettingTitle = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <ListItemButton onClick={() => setOpen((pre) => !pre)}>
        <ListItemIcon>{icon}</ListItemIcon>

        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};

export default SettingTitle;
