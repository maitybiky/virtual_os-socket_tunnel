import { spawn } from "child_process";
import { NextResponse } from "next/server";

const shells: any = {};
const getShell = (containerId: string) => {
  if (!shells[containerId]) {
    const shell = spawn("docker", ["exec", "-i", containerId, "bash"], {
      stdio: "pipe",
    });

    // Capture the shell's output
    shell.stdout.setEncoding("utf8");
    shell.stderr.setEncoding("utf8");
    shells[containerId] = { shell, output: "" };

    shell.stdout.on("data", (data) => {
      shells[containerId].output += data;
    });

    shell.stderr.on("data", (data) => {
      shells[containerId].output += data;
    });
  }

  return shells[containerId];
};

export const POST = async (req: Request) => {
  try {
    const { command, containerId } = await req.json();
    const { shell, output } = getShell(containerId);

    // Clear previous output
    shells[containerId].output = "";

    // Send the command to the persistent shell
    shell.stdin.write(command + "\n");

    // Wait for the command to execute and then return the output
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ response: `Output: ${shells[containerId].output}` });
      }, 500);
    });
    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
