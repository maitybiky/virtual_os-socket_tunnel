"use client";
import * as React from "react";
import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import axios, { AxiosResponse } from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { BarChartInitPropsType } from "@/util/types";
import { useMediaQuery } from "@mui/material";

interface BarChartCompProps extends BarChartProps {
  barChartInitData: BarChartInitPropsType;
}

const filter = ["Yearly", "Monthly", "Weekly"];
export default function BarchartComp({
  barChartInitData,
  ...props
}: Partial<BarChartCompProps>) {
  const [dataX, setDataX] = React.useState(barChartInitData?.dataX ?? []);
  const [dataY, setDataY] = React.useState(barChartInitData?.dataY ?? []);
  const [range, setRange] = React.useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  React.useEffect(() => {
    if (!range) return;
    console.log("client fetching");
    axios
      .get("/api/barchart-data", {
        params: {
          range,
        },
      })
      .then((response: AxiosResponse) => {
        setDataX(response.data.dataX);
        setDataY(response.data.dataY);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [range]);

  return (
    dataX &&
    dataY && (
      <>
        <FormControl sx={{ m: 1, minWidth: 120, mt: 2 }} size="small">
          <InputLabel id="demo-select-small-label">Sales </InputLabel>

          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={age}
            label="Age"
            onChange={(e) => setRange(e.target.value as string)}
          >
            {filter.map((it: string, ind: number) => (
              <MenuItem key={it} selected={ind === 0} value={it.toLowerCase()}>
                {it}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: dataX,
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: dataY,
            },
          ]}
          width={isMobile ? 330 : 550}
          height={350}
          {...props}
        />
      </>
    )
  );
}
