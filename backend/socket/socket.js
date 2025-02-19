// import { Server } from "socket.io";
// import dotenv from "dotenv";
// import express from "express";
// import http from "http";

// dotenv.config();
// const app = express();

// const server = http.createServer(app);

// const io = new Server({
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// const userSocketMap = {}; // this map stores socket id corresponding to user id; userId -> socketId

// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;
//   if (userId) {
//     userSocketMap[userId] = socket.id;
//     console.log(`User Connected: UserId = ${userId}, SocketId = ${socket.id}`);
//   }

//   io.emit('getOnlineUsers', Object.keys(userSocketMap))

//   socket.on("disconnect", () => {
//     if (userId) {
//       console.log(
//         `User Connected: UserId = ${userId}, SocketId = ${socket.id}`
//       );

//       delete userSocketMap[userId];
//     }
//     io.emit('getOnlineUsers', Object.keys(userSocketMap));
    
//   });
// });


// export {app, server, io}


import { Server } from "socket.io";
import dotenv from "dotenv";
import express from "express";
import http from "http";

dotenv.config();
const app = express();

const server = http.createServer(app);

const io = new Server(server, { // Pass the server instance here
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // this map stores socket id corresponding to user id; userId -> socketId

export const getReceiverSocketId = (recieverID)=>{
  return userSocketMap[recieverID];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User Connected: UserId = ${userId}, SocketId = ${socket.id}`);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      console.log(
        `User Disconnected: UserId = ${userId}, SocketId = ${socket.id}`
      );
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
