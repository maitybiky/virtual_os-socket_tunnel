import { createServer } from "node:http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { execCommand } from "../util/exec-command.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
dotenv.config();
const httpServer = createServer();

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  console.log("......");
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error("Authentication failed"));
  const secret = process.env.CONTAINER_ENC_SECRET;

  try {
    const tokenData = verify(token, secret);

    if (tokenData) {
      socket.user = tokenData;
      next();
    } else {
      next(new Error("Authentication failed"));
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

const webSockets = new Map();
const cliSockets = new Map();

io.on("connection", (socket) => {
  // execCommand({ command: "" }, socket);

  const userId = socket.user?._id;
  const socketId = socket.id;
  const agent = socket.handshake.query?.agent;
  const local_machine_environment = socket.handshake.query?.containerId;

  // storing user socket ids
  if (agent == "cli") {
    cliSockets.set(userId, socketId);
    const web_socket_id = webSockets.get(userId);
    console.log("ddddddd", webSockets);
    io.to(web_socket_id).emit("exec:info", {
      msg: `local machine online...`,
    });
    // flow local machine -> here -> web
    socket.on("exec:output", (data) => {
      const web_socket_id = webSockets.get(userId);
      // flow web -> here -> local machine
      console.log("ss", web_socket_id);
      if (!web_socket_id)
        return socket.emit("exec:error", { msg: "web not connected..." });

      io.to(web_socket_id).emit("exec:output", data);
    });
  }
  if (agent == "web") {
    webSockets.set(userId, socketId);

    const local_machine_socket_id = cliSockets.get(userId);

    socket.emit("exec:info", {
      msg: `local machine ${local_machine_socket_id ? "online" : "offline"}...`,
    });

    // flow web -> here -> local machine
    socket.on("exec:input", (data) => {
      console.log(data);
      if (!local_machine_socket_id)
        return socket.emit("exec:error", { msg: "machine not connected..." });
      io.to(local_machine_socket_id).emit("exec:input", {
        ...data,
        environmentId: local_machine_environment,
      });
      // execCommand(data, socket);
    });
  }

  socket.on("test", () => {
    console.log(socketId);
  });

  socket.on("disconnect", (socket) => {
    if (agent === "cli") {
      cliSockets.delete(userId);
      const webId = webSockets.get(userId);
      io.to(webId).emit("exec:info", {
        msg: `local machine offline...`,
      });
    }
    if (agent === "web") {
      webSockets.delete(userId);
    }
    console.log("Client disconnected");
  });

  console.log("web", webSockets);
  console.log("cli", cliSockets);
});

const port = process.env.PORT ?? 8000;
httpServer
  .once("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  })
  .listen(port, "0.0.0.0", () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
