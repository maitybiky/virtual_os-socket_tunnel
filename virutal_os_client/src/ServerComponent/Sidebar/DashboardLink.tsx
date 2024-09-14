import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const DashboardLink = () => {
  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      href="/dashboard"
    >
      <Typography variant="h6" noWrap component="div">
        Dashboard
      </Typography>
    </Link>
  );
};

export default DashboardLink;
