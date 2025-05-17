import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"], // Your frontend URL
        methods: ["GET", "POST"],
        credentials: true
    }
});

export const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
        io.emit("onlineUsers",Object.keys(userSocketMap));
    }
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        delete userSocketMap[userId];
        io.emit("onlineUsers",Object.keys(userSocketMap));
    });

    // Add more event handlers as needed
});
export { io, app, server };