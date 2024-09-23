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
    origin: process.env.CORS_ORIGIN,
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
  const local_machine_socket_id = cliSockets.get(userId);

  if (local_machine_socket_id)
    socket.emit("exec:info", { msg: "local machine online..." });

  // storing user socket ids
  if (agent == "cli") cliSockets.set(userId, socketId);
  if (agent == "web") {
    webSockets.set(userId, socketId);
  }

  socket.on("test", () => {
    console.log(socketId);
  });
  socket.on("exec:input", (data) => {
    // flow web -> here -> local machine
    if (!local_machine_socket_id)
      return socket.emit("exec:error", { msg: "machine not connected..." });
    io.to(local_machine_socket_id).emit("exec:input", data);
    // execCommand(data, socket);
  });

  socket.on("disconnect", (socket) => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT ?? 8000;
httpServer
  .once("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
