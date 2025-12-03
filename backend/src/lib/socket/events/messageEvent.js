import Message from '../../../models/message.model.js';
import { Events, getUserSocketId, io } from '../socket.js';

//Emit event newMessage to receiver only
export const eventNewMessage = (receiverId, newMessage) => {
  const receiverSocketId = getUserSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit(Events.EV_NEW_MESSAGE, newMessage);
  }
};

// Emit event deleteMessage to receivers
export const eventDeleteMessage = async (deleterId, messageIds = []) => {
  const messages = await Message.find({
    _id: { $in: messageIds },
    senderId: deleterId,
  });

  ((messages = []) => {
    if (!messages?.length) return;

    const receiverIds = messages.map((msg) => msg.receiverId);
    receiverIds.forEach((rId) => {
      const deletedMsgs = messages
        .filter((msg) => msg.receiverId.equals(rId))
        .map((msg) => ({ _id: msg._id, image: '', temporary: true }));

      io.to(getUserSocketId(rId)).emit(Events.EV_DELETE_MESSAGE, deletedMsgs);
    });
  })(messages);
};
