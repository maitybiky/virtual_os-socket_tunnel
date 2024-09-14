import * as React from "react";
import Box from "@mui/material/Box";
import ThemeWrapper from "@/util/ThemeWrapper";
import SideBarDrawer from "@/Clientcomp/SideBarDrawer";


interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const { children } = props;

  console.log("Side bar");

  return (
    <ThemeWrapper>
      <Box sx={{ display: "flex" }}>
        {/* client component */}
        <SideBarDrawer>{children}</SideBarDrawer>
      </Box>
    </ThemeWrapper>
  );
}
