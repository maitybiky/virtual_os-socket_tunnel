
import { getbarChartInitData } from "@/util/fetchInitData";
import { NextResponse } from "next/server";



export const GET = async (req: Request, res: Response) => {
  try {
    const url = new URL(req.url);
    const query = url.searchParams;
    const type = query.get("range");

    return NextResponse.json({ ...getbarChartInitData(type) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
