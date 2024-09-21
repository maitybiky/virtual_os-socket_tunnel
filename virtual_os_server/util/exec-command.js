import pty from "node-pty";
const shells = {};
const getShell = (containerId, socket) => {
  if (!shells[containerId]) {
    const shell = pty.spawn("docker", ["exec", "-it", containerId, "bash"], {
      name: "xterm-color",
      cols: 80, // Terminal width
      rows: 24, // Terminal height
      cwd: process.env.HOME,
      env: process.env,
    });

    shells[containerId] = { shell };
    shell.on("data", function (data) {
      console.log("bro", data);
      socket.emit("exec:output", data); // Send the output to xterm.js
    });
  }

  return shells[containerId];
};

export const execCommand = async (commandData, socket) => {
  const { containerId } = socket.user;
  const { command } = commandData;

  if (!containerId)
    socket.emit("exec:error", {
      msg: { containerId: false },
    });

  const { shell } = getShell(containerId, socket);

  shell.write(`${command}`);
};
