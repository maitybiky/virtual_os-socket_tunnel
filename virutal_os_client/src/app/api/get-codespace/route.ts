import { exec } from "child_process";
import { NextResponse } from "next/server";

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
  const random_byte = Math.floor(Math.random() * 100);
  return sanitizedUsername + random_byte;
}

function createContainer({ userName, image }: CreateContainerProps) {
  const network = `${userName}_${image.image}_network`;

  const createNetworkCommand = `docker network create  ${network}`;

  const createContainerCommand = `
    docker run -d --name ${userName} \
  --network ${network} \
  --cap-drop=ALL \
  --user 1000:1000 \
  -m 2024m --cpu-shares=512 \
  ${image.image}:${image.vr} \
    /bin/sh -c "touch /tmp/${image.file} && while true; do sleep 1000; done"
`;

  return new Promise((resolve, reject) => {
    exec(createNetworkCommand, (networkCreateError, networkStdout) => {
      if (networkCreateError) reject({ networkCreateError });
      console.log("networkStdout", networkStdout);
      exec(createContainerCommand, async (contCreateError, containerStdout) => {
        if (contCreateError) {
          exec("docker network rm " + network);
          reject({ contCreateError });
        }
        const containerId = containerStdout.replace(/\n/g, "").trim();
        cheackContainerStatus(containerId).then((status_stdout: any) => {
          resolve({ data: status_stdout });
        });
      });
    });
  });
}

export const POST = async (req: Request) => {
  try {
    const { service, userName } = await req.json();
    const user = sanitizeUsername(userName);
    const image = servicesImageMap[service];

    const data = await createContainer({ image, userName: user });

    return NextResponse.json({ data, image }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
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
