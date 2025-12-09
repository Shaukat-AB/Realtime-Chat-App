import User from '../../../models/user.model.js';
import { Events, getOnlineUserIds, io } from '../socket.js';

//Emit User is typing message
export const eventUserTyping = (socket) => {
  socket.on(Events.EV_USER_TYPING, (data) => {
    socket.broadcast.emit(Events.EV_USER_TYPING, data);
  });
};

export const eventUserStatus = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { lastSeen: new Date() },
    { new: true }
  );
  if (user) {
    io.emit(Events.EV_USER_STATUS, { _id: userId, lastSeen: user.lastSeen });
  }
};

export const eventUsersStatus = async (socket) => {
  const users = await User.find({
    _id: { $in: getOnlineUserIds() },
    lastSeen: { $ne: null },
  });

  if (Array.isArray(users)) {
    users.forEach((user) => {
      socket.emit(Events.EV_USER_STATUS, {
        _id: user._id,
        lastSeen: user.lastSeen,
      });
    });
  }
};
