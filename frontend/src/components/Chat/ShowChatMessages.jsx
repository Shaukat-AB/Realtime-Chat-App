import { useEffect, useRef } from "react";
import SendMessageInput from "./SendMessageInput";
import MessageSkeleton from "../Skeletons/MessageSkeleton";
import { useAuthStore, useChatStore } from "../../store";
import ChatHeader from "./ChatHeader";
import Avatar from "../Avatar/Avatar";
import { formatDateToLocalTimeIn2Digit } from "../../lib/utils";
import { useGetMessages } from "../../hooks";

const ShowChatMessages = () => {
    const {
        currentMessages,
        currentContact,
        connectToMessages,
        disconnectToMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
    const { isLoading } = useGetMessages();


    useEffect(() => {
        connectToMessages();
        return () => disconnectToMessages();
    }, [currentContact._id, connectToMessages, disconnectToMessages]);

    useEffect(() => {
        if (messageEndRef.current && currentMessages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [isLoading, currentMessages, currentContact._id]);

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <SendMessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`chat ${
                            msg.senderId === authUser._id
                                ? "chat-end"
                                : "chat-start"
                        }`}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <Avatar
                                    src={
                                        msg.senderId === authUser._id
                                            ? authUser.avatar
                                            : currentContact.avatar
                                    }
                                    alt="profile avatar"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatDateToLocalTimeIn2Digit(msg.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {msg.image && (
                                <img
                                    src={msg.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {msg.text && <p>{msg.text}</p>}
                        </div>
                    </div>
                ))}

                {/* Scrolls into view as message's end*/}
                <span ref={messageEndRef}></span>
            </div>
            <SendMessageInput />
        </div>
    );
};

export default ShowChatMessages;
