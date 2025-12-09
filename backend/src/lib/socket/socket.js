import express from 'express';
import http from 'http';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import {
  eventUsersStatus,
  eventUserStatus,
  eventUserTyping,
} from './events/userEvent.js';

config();

const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
const server = http.createServer(app);

const Events = {
  EV_DELETE_MESSAGE: 'deleteMessage',
  EV_NEW_MESSAGE: 'newMessage',
  EV_ONLINE_USERS: 'onlineUsers',
  EV_USER_TYPING: 'userTyping',
  EV_USER_STATUS: 'userStatus',
};

const onlineUsers = new Map();

const getUserSocketId = (userId) => onlineUsers.get(userId);
const getOnlineUserIds = () => [...onlineUsers.keys()];

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

io.on('connection', (socket) => {
  console.log('User connected socketId: ', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    onlineUsers.set(userId, socket.id);
    eventUserStatus(userId);
  }

  io.emit(Events.EV_ONLINE_USERS, getOnlineUserIds());

  eventUserTyping(socket);
  eventUsersStatus(socket);

  socket.on('disconnect', () => {
    console.log('User disconnected socketId: ', socket.id);

    onlineUsers.delete(userId);
    eventUserStatus(userId);

    io.emit(Events.EV_ONLINE_USERS, getOnlineUserIds());
  });
});

export { io, app, server, Events, getUserSocketId, getOnlineUserIds };
