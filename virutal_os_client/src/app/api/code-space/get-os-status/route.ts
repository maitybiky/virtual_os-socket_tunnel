import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { createErrorBody } from "../../(util)";

export const POST = async (req: NextRequest) => {
  try {
    const { containerId } = await req.json();

    const userData = req.headers.get("token-payload");
    if (!userData) throw new Error("user data not found");
    const { email } = JSON.parse(userData);

    const data = await cheackContainerStatus(containerId);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(createErrorBody(error), { status: 500 });
  }
};

function cheackContainerStatus(containerId: string): Promise<any> {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      exec(
        `docker ps -a --filter "name=${containerId}"`,
        (error, status_stdout, status_stderr) => {
          if (error) {
            console.error(`Error checking container status: ${error.message}`);
            resolve(error);
            return;
          }
          if (status_stderr) {
            resolve({ containerId, status: status_stderr });
            return;
          }
          console.log("status_stdout", status_stdout);
          const containerIds = status_stdout.split("\n").map((id) => id.trim());
          console.log("containerIds", containerIds);
          const exists = containerIds.some((lines) =>
            lines.includes(containerId.trim())
          );
          resolve({
            containerId,
            status: !exists ? "container not found" : status_stdout,
          });
        }
      );
    }, 500);
  });
}
