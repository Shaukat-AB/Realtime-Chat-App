import express from 'express';
import http from 'http';
import { config } from 'dotenv';
import { Server } from 'socket.io';

config();

const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
const server = http.createServer(app);

const EV_DELETE_MESSAGE = 'deleteMessage';
const EV_NEW_MESSAGE = 'newMessage';
const EV_ONLINE_USERS = 'onlineUsers';

const onlineUsers = {};
const getUserSocketId = (userId) => onlineUsers[userId];

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

io.on('connection', (socket) => {
  console.log('Connected Id: ', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId] = socket.id;

  io.emit(EV_ONLINE_USERS, Object.keys(onlineUsers));

  socket.on('disconnect', () => {
    console.log('Disconnected Id: ', socket.id);

    delete onlineUsers[userId];

    io.emit(EV_ONLINE_USERS, Object.keys(onlineUsers));
  });
});

export { io, app, server, getUserSocketId, EV_NEW_MESSAGE, EV_DELETE_MESSAGE };
