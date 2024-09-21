import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

 const stopContainer = (containerId: string) => {
  const startContainer = `docker stop ${containerId}`;

  return new Promise((resolve, reject) => {
    exec(startContainer, (starterror, stdOut) => {
      // staring issue
      if (starterror) reject(starterror);

      // stared
      resolve(stdOut);
    });
  });
};

export const POST = async (req: NextRequest) => {
  try {
    const { containerId } = await req.json();

    const response = await stopContainer(containerId);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
