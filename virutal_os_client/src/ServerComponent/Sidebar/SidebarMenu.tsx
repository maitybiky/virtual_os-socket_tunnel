import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import CodeIcon from '@mui/icons-material/Code';
import Link from "next/link";
import React from "react";

const SidebarMenu = () => {
  const lists = [
    { name: "Home", link: "/dashboard", icon: <AccountCircleIcon /> },
    { name: "Setting", link: "/setting", icon: <SettingsApplicationsIcon /> },
    { name: "Code Space", link: "/editor", icon: <CodeIcon /> },
  ];
  return (
    <List>
      {lists.map(({ name, link, icon }, index) => (
        <ListItem
          component={Link}
          href={link}
          sx={{ textDecoration: "none", color: "inherit" }}
          key={name}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarMenu;
