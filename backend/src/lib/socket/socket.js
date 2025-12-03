import express from 'express';
import http from 'http';
import { config } from 'dotenv';
import { Server } from 'socket.io';

config();

const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
const server = http.createServer(app);

const Events = {
  EV_DELETE_MESSAGE: 'deleteMessage',
  EV_NEW_MESSAGE: 'newMessage',
  EV_ONLINE_USERS: 'onlineUsers',
};

const onlineUsers = new Map();
const getUserSocketId = (userId) => onlineUsers.get(userId);

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

io.on('connection', (socket) => {
  console.log('User connected socketId: ', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers.set(userId, socket.id);

  io.emit(Events.EV_ONLINE_USERS, [...onlineUsers.keys()]);

  socket.on('disconnect', () => {
    console.log('User disconnected socketId: ', socket.id);

    onlineUsers.delete(userId);

    io.emit(Events.EV_ONLINE_USERS, [...onlineUsers.keys()]);
  });
});

export { io, app, server, getUserSocketId, Events };
