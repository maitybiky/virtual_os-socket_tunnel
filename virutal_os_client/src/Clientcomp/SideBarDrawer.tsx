"use client";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenu from "@/ServerComponent/Sidebar/SidebarMenu";
import DashboardLink from "@/ServerComponent/Sidebar/DashboardLink";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useStore } from "@/util/globalState/appSetting";
import useEditorSettingStore from "@/util/globalState/editorSetting";
interface Props {
  window?: () => Window;
  children: React.ReactNode;
}
const SideBarDrawer = (props: Props) => {
  const drawerWidth = 240;

  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { theme, changeTheme } = useStore();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ color: "primary.main" }}>
          <DashboardLink />
        </Toolbar>
      </AppBar>
      <Divider />
      <SidebarMenu />
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <CommonHorizontalAppBar />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: 5,
        }}
      >
        {children}
      </Box>
    </>
  );
};
export const CommonHorizontalAppBar = () => {
  const { changeTheme, theme } = useStore();
  return (
    <IconButton
      aria-label="fingerprint"
      onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
export default SideBarDrawer;
