const pkg = require("keytar");
const { getPassword, deletePassword, setPassword } = pkg;
const { io } = require("socket.io-client");
const axios = require("axios");
const inquirer = require("inquirer").default
var SOCKET;
function onConnect() {
  console.log("connected to Web...");
  showMenu(["Disconnect", "Log Out", "Exit"]);
}
function onConnectError(err) {
  console.log("Connect Error",err.message);
  showMenu(["log in"]);
}
function onDisconnect() {
  console.log("\nsocket disconnected\n");
}
async function socketInit(_token) {
  const token = _token ?? (await getPassword("vos-client-007", "user"));

  const socket = io("http://localhost:8000", {
    auth: {
      token,
    },
  });
  socket.on("connect", onConnect);
  socket.on("connect_error", onConnectError);
  socket.on("disconnect", onDisconnect);
  SOCKET = socket;
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
      console.log("\n");
    });
}

function socketDisconnect() {
  const socket = SOCKET;

  if (!socket) return console.log("socket instance not found!!!");

  socket.off("connect", onConnect);
  socket.off("connect_error", onConnectError);
  socket.off("disconnect", onDisconnect);

  socket.disconnect();
  onDisconnect();
  SOCKET = null;
  showMenu(["Re connect", "Log Out"]);
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
  console.log("inq");
  return new Promise((resolve, reject) => {
    console.log("\n");
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
      .finally(() => {
        console.log("\n");
      });
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


