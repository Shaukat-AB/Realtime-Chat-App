import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary/cloudinary.js';
import {
  EV_DELETE_MESSAGE,
  EV_NEW_MESSAGE,
  getUserSocketId,
  io,
} from '../lib/socket/socket.js';
import { newError } from '../lib/utils/utils.js';

export const getUserContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contacts = await User.find({ _id: { $ne: userId } }).select(
      '-password'
    );
    res.status(200).json(contacts);
  } catch (err) {
    console.log('GetUserContacts message.controller error: ', err.message);
    next(err);
  }
};

export const getMessagesById = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: senderId,
          receiverId: receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
          isDeleted: { $ne: true }, // sender deleted received message
        },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log('GetMessageById message.controller error: ', err.message);
    next(err);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploaded = await cloudinary.uploader.upload(image);
      imageUrl = uploaded.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //Emit event newMessage to receiver only
    const receiverSocketId = getUserSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(EV_NEW_MESSAGE, newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log('SendMessage message.controller error: ', err.message);
    next(err);
  }
};

export const hardDeleteMessagesById = async (req, res, next) => {
  try {
    const { messageIds } = req.body;
    const deleterId = req.user._id;

    if (!Array.isArray(messageIds) || !messageIds.length) {
      throw newError('Invalid request body input', 400);
    }

    //Emit event deleteMessage to receivers
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

        io.to(getUserSocketId(rId)).emit(EV_DELETE_MESSAGE, deletedMsgs);
      });
    })(messages);

    const result = await Message.deleteMany({
      _id: { $in: messageIds },
      senderId: deleterId,
    });

    res.status(200).json(`${result.deletedCount} messages deleted permanently`);
  } catch (err) {
    console.log(
      'hardDeleteMessageById message.controller error: ',
      err.message
    );
    next(err);
  }
};

export const softDeleteMessagesById = async (req, res, next) => {
  try {
    const { messageIds } = req.body;
    const deleterId = req.user._id;

    if (!Array.isArray(messageIds) || !messageIds.length) {
      throw newError('Invalid request body input', 400);
    }

    const result = await Message.updateMany(
      {
        _id: { $in: messageIds },
        receiverId: deleterId,
      },
      { $set: { isDeleted: true } }
    );

    res
      .status(200)
      .json(
        `${result.modifiedCount} messages deleted only for you successfully`
      );
  } catch (err) {
    console.log(
      'softDeleteMessageById message.controller error: ',
      err.message
    );
    next(err);
  }
};
