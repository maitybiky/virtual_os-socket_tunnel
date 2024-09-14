import { getScatterChartInitData } from "@/util/fetchInitData";
import {  NextResponse } from "next/server";



export const GET = async (req: Request, res: Response) => {
  // await new Promise((res) => setTimeout(res, 2000));
  return NextResponse.json({ ...getScatterChartInitData() });
};
