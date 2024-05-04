import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

let socketUserIdMap = {}; //used to store of the online users using key-mapping userId:socket.id

export const getRecieverSocketId = (recieverId) =>{
    return socketUserIdMap[recieverId]
}

io.on("connection", (socket) => {
  console.log(socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    socketUserIdMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(socketUserIdMap));

  socket.on("disconect", () => {
    console.log("A user disconeccted");
    delete socketUserIdMap[userId];
    io.emit("onlineUsers", Object.keys(socketUserIdMap));
  });
});

export { app, io, server };
