"use client";
import * as React from "react";
import { PieChart, PieChartProps } from "@mui/x-charts/PieChart";
import axios, { AxiosResponse } from "axios";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PieChartInitPropsType } from "@/util/types";

const filter = ["Category", "Region", "Channel"];
interface PieChartCompProps extends PieChartProps {
  pieChartInitData: PieChartInitPropsType;
}
export default function PieChartComp({
  pieChartInitData,
  ...props
}: Partial<PieChartCompProps>) {
  const [pieData, setPieData] = React.useState<undefined | Array<any>>(
    pieChartInitData?.data
  );
  const [range, setRange] = React.useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  React.useEffect(() => {
    if (!range) return;
    axios
      .get("/api/piechart-data", {
        params: {
          filter: range,
        },
      })
      .then((response: AxiosResponse) => {
        //console.log("response.data", response.data);
        setPieData(response.data.data);
      })
      .catch((error) => {
        //console.error("Error fetching data:", error);
      });
  }, [range]);
  return (
    pieData && (
      <>
        <FormControl sx={{ m: 1, minWidth: 180, mb: 2 }} size="small">
          <InputLabel id="demo-simple-select-helper-label">Sales By</InputLabel>

          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={age}
            label="Age"
            onChange={(e) => setRange(e.target.value as string)}
          >
            {filter.map((it, ind) => (
              <MenuItem
                selected={ind === 0}
                key={it.toLowerCase()}
                value={it.toLowerCase()}
              >
                {it}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 30,
                  outerRadius: 90,
                  paddingAngle: 2,
                  cornerRadius: 3,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={300}
              height={350}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 1,
              marginY: 1,
            }}
          >
            {pieData?.map((data: any) => (
              <Typography
                key={data.value}
                variant="caption"
                sx={{ color: data.color }}
              >{`${data.name} • ${data.value}`}</Typography>
            ))}
          </Box>
        </Box>
      </>
    )
  );
}
