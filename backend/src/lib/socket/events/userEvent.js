import { Events } from '../socket.js';

//Emit User is typing message
export const eventUserTyping = (socket) => {
  socket.on(Events.EV_USER_TYPING, (data) => {
    socket.broadcast.emit(Events.EV_USER_TYPING, data);
  });
};
