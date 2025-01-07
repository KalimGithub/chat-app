const { Server } = require("socket.io");
const http = require("http");

const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  //console.log("new client connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    // console.log("userssss", users);
  }
  io.emit("getOnline", Object.keys(users));

  socket.on("disconnect", (socket) => {
    console.log("socket disconnected", socket.id);
    delete users[userId];
    io.emit("getOnline", Object.keys(users));
  });
});

module.exports = { app, io, server };
