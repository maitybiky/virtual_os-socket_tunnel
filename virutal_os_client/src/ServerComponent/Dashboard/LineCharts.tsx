"use client";
import React from "react";
import { LineChart, LineChartProps } from "@mui/x-charts/LineChart";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { LineChartInitPropsType } from "@/util/types";

interface LineChartCompProps extends LineChartProps {
  lineChartInitData: LineChartInitPropsType;
}

export default function LineChartComp({
  lineChartInitData,
  ...props
}: Partial<LineChartCompProps>) {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [dataX, setDataX] = useState(lineChartInitData?.dataX);
  const [dataY, setDataY] = useState(lineChartInitData?.dataY);
  // useEffect(() => {
  //   axios
  //     .get("/api/linechart-data")
  //     .then((response: AxiosResponse) => {
  //       //console.log("response.data", response.data);
  //       setDataX(response.data.xAxis);
  //       setDataY(response.data.yAxis);
  //     })
  //     .catch((error) => {
  //       //console.error("Error fetching data:", error);
  //     });
  // }, []);
  return (
    dataX &&
    dataY && (
      <LineChart
        xAxis={dataX}
        series={[
          {
            data: dataY,
            label: "Sales in thousands (k)",
          },
        ]}
        width={isMobile ? 330 : 500}
        height={300}
      />
    )
  );
}
