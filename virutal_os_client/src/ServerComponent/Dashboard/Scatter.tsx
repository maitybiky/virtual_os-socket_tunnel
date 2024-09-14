"use client";
import * as React from "react";
import { ScatterChart, ScatterChartProps } from "@mui/x-charts/ScatterChart";
import axios, { AxiosResponse } from "axios";
import { useMediaQuery } from "@mui/material";
import { ScatterChartInitPropsType } from "@/util/types";

interface ScatterChartCompProps extends ScatterChartProps {
  scatterChartInitData: ScatterChartInitPropsType;
}

export default function ScatterComp({
  scatterChartInitData,
  ...props
}: Partial<ScatterChartCompProps>) {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [data, setData] = React.useState<any[] | undefined>(
    scatterChartInitData?.data
  );
  // React.useEffect(() => {
  //   axios
  //     .get("/api/scatterchart-data")
  //     .then((response: AxiosResponse) => {
  //       //console.log("response.vcgd", response.data);
  //       setData(response.data.data);
  //     })
  //     .catch((error) => {
  //       //console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    data && (
      <ScatterChart
        width={isMobile ? 330 : 400}
        height={300}
        series={[
          {
            label: "Series A",
            data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
          },
          {
            label: "Series B",
            data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
          },
        ]}
      />
    )
  );
}
