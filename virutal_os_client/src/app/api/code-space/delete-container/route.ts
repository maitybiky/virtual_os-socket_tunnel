import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

 const deleteContainer = (containerId: string) => {
  const startContainer = `docker rm -f ${containerId}`;

  return new Promise((resolve, reject) => {
    exec(startContainer, (starterror, stdOut) => {
      // staring issue
      if (starterror) reject(starterror);

      // stared
      resolve(stdOut);
    });
  });
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { containerId } = await req.json();
    const response = await deleteContainer(containerId);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
