import { createServer } from "node:http";

import { Server } from "socket.io";

const httpServer = createServer();

// Initialize Socket.IO
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("socket.id", socket.id);

  socket.on("exec:input", (data) => {
    // Handle the received command here
    data.output = "hello from server";
    socket.emit("exec:output", data);
  });
  socket.on("disconnect", () => {
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
