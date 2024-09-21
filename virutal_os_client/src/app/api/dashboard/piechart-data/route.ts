import { getPieChartInitData } from "@/util/fetchInitData";
import {  NextResponse } from "next/server";



export const GET = async (req: Request, res: Response) => {
  const url = new URL(req.url);
  const query = url.searchParams.get("filter");

  return NextResponse.json({ ...getPieChartInitData(query) });
};
