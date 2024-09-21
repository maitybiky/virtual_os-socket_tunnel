import { connectToDatabase } from "@/database";
import { VirtualOs } from "@/database/osSchema";
import { exec } from "child_process";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { createErrorBody } from "../../(util)";
type ImageMap = {
  image: string;
  vr: string;
  file: string | null;
};
type CreateContainerProps = {
  userName: string;
  image: ImageMap;
};
const servicesImageMap: { [key: string]: ImageMap } = {
  "node js": { image: "node", vr: "latest", file: "index.js" },
  "c++": { image: "gcc", vr: "latest", file: "index.cpp" },
  mongodb: { image: "mongo", vr: "latest", file: null },
};

function sanitizeUsername(username: string) {
  if (username.length > 7) throw new Error("user name max 7 character allowed");
  const sanitizedUsername = username.replace(/[^a-zA-Z0-9_-]/g, "");
  const random_byte = uuid();
  return sanitizedUsername + "_" + random_byte.slice(9, 20);
}

function createContainer({
  userName,
  image,
}: CreateContainerProps): Promise<object> {
  const network = `${userName}_${image.image}_network`;
  const containerName = `${userName}_cont`;
  const createNetworkCommand = `docker network create  ${network}`;

  const imageCheck = exec(`docker images -q ${image.image}:${image.vr}`);
  if (!imageCheck.toString()) {
    throw new Error(`Docker image ${image.image}:${image.vr} not found!`);
  }

  const createContainerCommand = `
  docker run -d --name ${containerName} \
  --network ${network} \
  --cap-drop=ALL \
  --restart=on-failure \
  -m 2024m --cpu-shares=512 \
  ${image.image}:${image.vr} \
  '/bin/sh', '-c', 'while true; do sleep 1000; done'
`;

  return new Promise((resolve, reject) => {
    exec(createNetworkCommand, (networkCreateError, networkStdout) => {
      if (networkCreateError) reject({ networkCreateError });
      console.log("networkStdout", networkStdout);
      exec(createContainerCommand, async (contCreateError, containerStdout) => {
        console.log("contCreateError", contCreateError);
        if (contCreateError) {
          exec("docker network rm " + network);
          reject({ contCreateError });
        }
        const containerId = containerStdout.replace(/\n/g, "").trim();
        cheackContainerStatus(containerId).then((status_stdout: any) => {
          resolve({ data: { ...status_stdout, containerName } });
        });
      });
    });
  });
}

export const POST = async (req: Request) => {
  try {
    //start transaction
    await connectToDatabase();
    const session = await mongoose.startSession();
    session.startTransaction();

    const userData = req.headers.get("token-payload");
    if (!userData) throw new Error("user data not found");
    const { email, _id } = JSON.parse(userData);

    const newOsData = new VirtualOs({
      userId: _id,
      osId: "organizer-server",
      dockerContainerId: null,
    });
    const { service, userName, machineVerificatinKey } = await req.json();

    if (machineVerificatinKey) {
      //
      //todo   handle local machine verification . required to commiunicate with socket server
      
      //
    }
    /*
      machineVerificatinKey this key is for verificaton of user local machine
    1. in user local machine user will generate a key by out application
    2. then user enter that key in browser which we get in machineVerificatinKey parameter

    if user doesnt provide a machineVerificatinKey it means they will use our local machine[]
     */

    const user = sanitizeUsername(userName);
    const image = servicesImageMap[service];

    const data = await createContainer({ image, userName: user });

    return NextResponse.json({ ...data, image }, { status: 200 });
  } catch (error) {
    return NextResponse.json(createErrorBody(error), { status: 500 });
  }
};

function cheackContainerStatus(containerId: string): Promise<any> {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      exec(
        `docker ps -a --filter "id=${containerId}"`,
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
          resolve({ containerId, status: status_stdout });
        }
      );
    }, 500);
  });
}
