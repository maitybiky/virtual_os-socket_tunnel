import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import BarchartComp from "@/ServerComponent/Dashboard/Barchart";
import PieChartComp from "@/ServerComponent/Dashboard/PieChart";
import LineChartComp from "@/ServerComponent/Dashboard/LineCharts";
import ScatterComp from "@/ServerComponent/Dashboard/Scatter";

import ChartBg from "@/Clientcomp/ChartBg";

import {
  getbarChartInitData,
  getLineChartData,
  getPieChartInitData,
  getScatterChartInitData,
} from "@/util/fetchInitData";

// export const metadata = {
//   title: "Dashboard",
// };

const Dashboard = () => {
  const barChartInitData = getbarChartInitData(null);
  const pieChartInitData = getPieChartInitData(null);
  const lineChartInitData = getLineChartData();
  const scatterChartInitData = getScatterChartInitData();
  console.log("dashbord");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7, lg: 7 }}>
          <ChartBg>
            <BarchartComp barChartInitData={barChartInitData} />
          </ChartBg>
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 5 }}>
          <ChartBg>
            <PieChartComp pieChartInitData={pieChartInitData} />
          </ChartBg>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <ChartBg>
            <ScatterComp scatterChartInitData={scatterChartInitData} />
          </ChartBg>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <ChartBg>
            <LineChartComp lineChartInitData={lineChartInitData} />
          </ChartBg>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
