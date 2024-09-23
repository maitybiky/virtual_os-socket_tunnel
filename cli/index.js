const pkg = require("keytar");
const { getPassword, deletePassword, setPassword } = pkg;
const { io } = require("socket.io-client");
const axios = require("axios");
const inquirer = require("inquirer").default;
const pty = require("node-pty");
const shells = {};
var socket;
var connectColorCode = "32;40";
var disconnectColorCode = "93;40";

function changeTextColor(text, colorCode) {
  return `\x1b[${colorCode}m${text}\x1b[0m`; // Reset color after the text
}

function onConnect() {
  if (!socket) return;
  socket.emit("test", "testing");
  console.log(
    changeTextColor(
      ".......................\n: connected to Web... :\n.......................",
      connectColorCode
    )
  );

  showMenu(["Disconnect", "Log Out", "Exit"]);
}
function onConnectError(err) {
  console.log("Connect Error", err.message);
  // console.log("Connect Error", err);
  if (err.type === "TransportError") return; //because it will retry that cause inquirer unneccesey event listern by below show menu func
  showMenu(["log in"]);
}

function onExecInput(data) {
  if (!socket) return;
  execCommand(data);
}
function onDisconnect() {
  console.log(
    changeTextColor(
      ".......................\n: disconnected :\n.......................",
      disconnectColorCode
    )
  );
}
async function socketInit(_token) {
  const token = _token ?? (await getPassword("vos-client-007", "user"));

  socket = io("http://localhost:8000", {
    auth: {
      token,
    },
    query: "agent=cli",
  });
  socket.on("connect", onConnect);
  socket.on("exec:input", onExecInput);
  socket.on("connect_error", onConnectError);
  socket.on("disconnect", onDisconnect);

  return socket;
}

const actions = {
  "log in": () => askCredentialsAndConnect(),
  disconnect: () => socketDisconnect(),
  "log out": () => {
    deletePassword("vos-client-007", "user");
    showMenu(["Log in"]);
  },
  exit: () => {
    socketDisconnect();
    process.exit(0);
  },
  "re connect": () => {
    socketInit();
  },
};

function showMenu(opts = ["Disconnect", "Log Out"]) {
  const menu = {
    type: "list",
    name: "menu",
    message: "HOME",
    choices: opts,
  };

  inquirer
    .prompt([menu])
    .then(({ menu }) => {
      const func = actions[menu.toLowerCase()];
      if (!func) return;
      func.apply();
    })
    .catch((error) => {})
    .finally(() => {
      console.log("");
    });
}

function socketDisconnect() {
  if (!socket) return;

  socket.off("connect", onConnect);
  socket.off("exec:input", onExecInput);
  socket.off("connect_error", onConnectError);
  socket.off("disconnect", onDisconnect);

  socket.disconnect();
  onDisconnect();

  showMenu(["Re connect", "Log Out", "Exit"]);
}
function getShell(environmentId, socket) {
  let shell;
  if (!shells[environmentId]) {
    if (environmentId === "host") {
      // shell in host machine
      shell = pty.spawn("bash", [], {
        name: "xterm-color",
        cols: 80, // Terminal width
        rows: 24, // Terminal height
        cwd: process.env.HOME,
        env: process.env,
      });
    } else {
      // shell in docker container
      shell = pty.spawn("docker", ["exec", "-it", environmentId, "bash"], {
        name: "xterm-color",
        cols: 80, // Terminal width
        rows: 24, // Terminal height
        cwd: process.env.HOME,
        env: process.env,
      });
    }

    shells[environmentId] = { shell };
    shell.on("data", function (data) {
      // console.log("bro", data);
      console.log('cli send output')
      socket.emit("exec:output", data); // Send the output to xterm.js
    });
  }

  return shells[environmentId];
}

async function execCommand(commandData) {
  const { environmentId, command } = commandData;
console.log('command',command)
  // if (environmentId === "host" )
  //   socket.emit("exec:error", {
  //     msg: { containerId: false },
  //   });

  const { shell } = getShell(environmentId, socket);
console.log(!!shell)
  shell.write(`${command}`);
}
function verifyEmail(input) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(input)) return true;
  return "Enter a valid email!!!";
}
function askCredentialsAndConnect() {
  const askEmail = {
    type: "input",
    name: "email",
    message: "Enter Email",
    validate: verifyEmail,
  };
  const askPassword = {
    type: "password",
    name: "password",
    message: "Enter Password",
  };

  return new Promise((resolve, reject) => {
    inquirer
      .prompt([askEmail, askPassword])
      .then(({ email, password }) => {
        logIn({ email, password })
          .then((token) => {
            setPassword("vos-client-007", "user", token);
            return socketInit(token);
          })
          .catch((logInErr) => {
            askCredentialsAndConnect();
          });
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {});
  });
}

async function logIn({ email, password }) {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/auth/log-in`,
      {
        email,
        password,
      },
      {
        headers: {
          "User-Agent": "cli",
          "X-Requested-By": "cli",
        },
      }
    );
    console.log("logged in successfully");
    return response.data.socketToken;
  } catch (error) {
    console.log(
      "Log in failed :",
      error?.response?.data?.error ?? error.message
    );
    throw new Error(error?.response?.data?.error ?? error.message);
  }
}

async function cheakAuth() {
  const isLoggedIn = await getPassword("vos-client-007", "user");

  if (isLoggedIn) {
    const token = isLoggedIn;
    socketInit(token); // returns socket
  } else {
    askCredentialsAndConnect(); // returns socket
  }
}
cheakAuth();
