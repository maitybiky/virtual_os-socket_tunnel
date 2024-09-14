import { BarChartInitPropsType, LineChartInitPropsType, PieChartInitPropsType, ScatterChartInitPropsType } from "./types";

export const getbarChartInitData = (
  type: string | null
): BarChartInitPropsType => {
  let data: BarChartInitPropsType = { dataX: [], dataY: [] };
  if (!type || type === "monthly") {
    data = {
      dataX: [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      dataY: [3, 6, 4, 5, 6, 8, 11, 5, 10, 9, 9, 10].map((it) => it * 100),
    };
  } else if (type === "weekly") {
    data = {
      dataX: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      dataY: [6, 8, 11, 5, 10, 9, 10].map((it) => it),
    };
  } else if (type === "yearly") {
    data = {
      dataX: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      dataY: [4, 1, 21, 2, 7, 9, 4].map((it) => it * 1000),
    };
  }

  return data;
};

export const getLineChartData = (): LineChartInitPropsType => {
  const xAxis = [
    {
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      scaleType: "point",
    },
  ];
  const yAxis = [
    20000, 54578, 29372, 85343, 16473, 84746, 94773, 107652, 243533, 538826,
    535326, 209373,
  ].map((it) => it / 1000);
  return { dataX: xAxis, dataY: yAxis };
};

export const getPieChartInitData = (
  query: string | null
): PieChartInitPropsType => {
  let data: any[];
  // category
  if (query === "category" || !query) {
    data = [
      { id: 0, value: 236, color: "#45ffe6", name: "Electronics" },
      { id: 1, value: 15, color: "#2962cc", name: "Apparel" },
      { id: 2, value: 39, color: "#7600bf", name: "Home & Kitcen" },
      { id: 3, value: 51, color: "#e60ba8", name: "Beauty" },
      { id: 4, value: 11, color: "#69ed05", name: "Sports" },
    ].sort((a, b) => b.value - a.value);
  }
  // Region
  else if (query === "region") {
    data = [
      { id: 0, value: 342, color: "#45ffe6", name: "Mumbai" },
      { id: 1, value: 76, color: "#2962cc", name: "Kolkata" },
      { id: 2, value: 13, color: "#7600bf", name: "Delhi" },
      { id: 3, value: 87, color: "#e60ba8", name: "Surat" },
      { id: 4, value: 133, color: "#69ed05", name: "Bangalore" },
    ].sort((a, b) => b.value - a.value);
  }
  //Channel
  else if (query === "channel") {
    data = [
      { id: 0, value: 754, color: "#45ffe6", name: "Online" },
      { id: 1, value: 212, color: "#2962cc", name: "Offline" },
    ].sort((a, b) => b.value - a.value);
  } else data = [];
  return { data };
};
export const getScatterChartInitData = (): ScatterChartInitPropsType => {
  const scatterData = [
    {
      id: "data-0",
      x1: 329.39,
      x2: 391.29,
      y1: 443.28,
      y2: 153.9,
    },
    {
      id: "data-1",
      x1: 96.94,
      x2: 139.6,
      y1: 110.5,
      y2: 217.8,
    },
    {
      id: "data-2",
      x1: 336.35,
      x2: 282.34,
      y1: 175.23,
      y2: 286.32,
    },
    {
      id: "data-3",
      x1: 159.44,
      x2: 384.85,
      y1: 195.97,
      y2: 325.12,
    },
    {
      id: "data-4",
      x1: 188.86,
      x2: 182.27,
      y1: 351.77,
      y2: 144.58,
    },
    {
      id: "data-5",
      x1: 143.86,
      x2: 360.22,
      y1: 43.253,
      y2: 146.51,
    },
    {
      id: "data-6",
      x1: 202.02,
      x2: 209.5,
      y1: 376.34,
      y2: 309.69,
    },
    {
      id: "data-7",
      x1: 384.41,
      x2: 258.93,
      y1: 31.514,
      y2: 236.38,
    },
    {
      id: "data-8",
      x1: 256.76,
      x2: 70.571,
      y1: 231.31,
      y2: 440.72,
    },
    {
      id: "data-9",
      x1: 143.79,
      x2: 419.02,
      y1: 108.04,
      y2: 20.29,
    },
    {
      id: "data-10",
      x1: 103.48,
      x2: 15.886,
      y1: 321.77,
      y2: 484.17,
    },
    {
      id: "data-11",
      x1: 272.39,
      x2: 189.03,
      y1: 120.18,
      y2: 54.962,
    },
    {
      id: "data-12",
      x1: 23.57,
      x2: 456.4,
      y1: 366.2,
      y2: 418.5,
    },
    {
      id: "data-13",
      x1: 219.73,
      x2: 235.96,
      y1: 451.45,
      y2: 181.32,
    },
    {
      id: "data-14",
      x1: 54.99,
      x2: 434.5,
      y1: 294.8,
      y2: 440.9,
    },
    {
      id: "data-15",
      x1: 134.13,
      x2: 383.8,
      y1: 121.83,
      y2: 273.52,
    },
    {
      id: "data-16",
      x1: 12.7,
      x2: 270.8,
      y1: 287.7,
      y2: 346.7,
    },
    {
      id: "data-17",
      x1: 176.51,
      x2: 119.17,
      y1: 134.06,
      y2: 74.528,
    },
    {
      id: "data-18",
      x1: 65.05,
      x2: 78.93,
      y1: 104.5,
      y2: 150.9,
    },
    {
      id: "data-19",
      x1: 162.25,
      x2: 63.707,
      y1: 413.07,
      y2: 26.483,
    },
    {
      id: "data-20",
      x1: 68.88,
      x2: 150.8,
      y1: 74.68,
      y2: 333.2,
    },
    {
      id: "data-21",
      x1: 95.29,
      x2: 329.1,
      y1: 360.6,
      y2: 422.0,
    },
    {
      id: "data-22",
      x1: 390.62,
      x2: 10.01,
      y1: 330.72,
      y2: 488.06,
    },
  ];
  return { data: scatterData };
};