import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary/cloudinary.js";
import { EV_NEW_MESSAGE, getUserSocketId, io } from "../lib/socket/socket.js";

export const getUserContacts = async (req, res) => {
    try {
        const userId = req.user._id;
        const contacts = await User.find({ _id: { $ne: userId } }).select(
            "-password"
        );
        res.status(200).json(contacts);
    } catch (err) {
        console.log("GetUserContacts message.controller error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessagesById = async (req, res) => {
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
                },
            ],
        });

        res.status(200).json(messages);
    } catch (err) {
        console.log("GetMessageById message.controller error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
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
        console.log("SendMessage message.controller error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
