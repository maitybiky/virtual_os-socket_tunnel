"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Account from "@/ServerComponent/Setting/Account";
import Preferences from "@/ServerComponent/Setting/Preferences";
import { AppBar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { fontSize } from "@mui/system";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    fontSize,
  };
}

export default function Setting() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      {isMobile ? (
        <HorizontalTab value={value} handleChange={handleChange} />
      ) : (
        <VerticalTabComp value={value} handleChange={handleChange} />
      )}
    </Box>
  );
}

const VerticalTabComp = ({
  value,
  handleChange,
}: {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}) => (
  <>
    <Tabs
      orientation={"vertical"}
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      sx={{
        borderRight: 1,
        borderColor: "divider",
        width: 300,
      }}
    >
      <Tab
        iconPosition="start"
        icon={<AccountBoxIcon />}
        label="Account"
        {...a11yProps(0)}
      />
      <Tab
        iconPosition="start"
        icon={<DarkModeIcon />}
        label="Preferences"
        {...a11yProps(1)}
      />
      <Tab
        iconPosition="start"
        icon={<CircleNotificationsIcon />}
        label="Notification"
        {...a11yProps(2)}
      />
    </Tabs>
    <TabPanels value={value} />
  </>
);

const HorizontalTab = ({
  value,
  handleChange,
}: {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}) => {
  return (
    <Box sx={{ maxWidth: { xs: 360, sm: 600 }, bgcolor: "background.paper" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="full width tabs example"
        >
          <Tab
            iconPosition="start"
            icon={<AccountBoxIcon />}
            label="Account"
            {...a11yProps(0)}
          />
          <Tab
            iconPosition="start"
            icon={<DarkModeIcon />}
            label="Preferences"
            {...a11yProps(1)}
          />
          <Tab
            iconPosition="start"
            icon={<CircleNotificationsIcon />}
            label="Notification"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanels value={value} />
    </Box>
  );
};

const TabPanels = ({ value }: { value: number }) => (
  <>
    <TabPanel value={value} index={0}>
      <Account />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <Preferences />
    </TabPanel>
    <TabPanel value={value} index={2}>
      Notification
    </TabPanel>
  </>
);
