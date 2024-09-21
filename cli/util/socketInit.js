import { io } from "socket.io-client";

export const socketInit = (token) => {
  const socket = io(process.env.TUNNEL_SERVER_HOST, {
    auth: {
      token,
    },
  });
  if (socket.connected) {
    console.log("connected to web");
  }
  socket.on('err',(err)=>console.log(err))
};
