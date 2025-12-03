const eventOnlineUser = (onlineUsers) => {
  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId] = socket.id;

  io.emit(Events.EV_ONLINE_USERS, Object.keys(onlineUsers));
};
