import { useState } from 'react';
import SendMessageInput from './SendMessageInput';
import MessageSkeleton from '../Skeletons/MessageSkeleton';
import ChatHeader from './ChatHeader';
import {
  useChatConnect,
  useGetMessages,
  useSoftHardDelMessages,
} from '../../hooks';
import MessageCard from './MessageCard';
import ChatMessagesWrapper from './ChatMessagesWrapper';
import toast from 'react-hot-toast';
import { useChatStore } from '../../store';

const ShowChatMessages = () => {
  useChatConnect();

  const { currentMessages } = useChatStore();
  const { isLoading } = useGetMessages();
  const [selectedMessages, setSelectedMessages] = useState([]);

  const onDeleteMessages = useSoftHardDelMessages({
    selectedMessages,
    resetSelectedMessages: () => setSelectedMessages([]),
    onSuccess: toast.success,
  });

  const onMessageSelected = (message) => {
    const updatedMessages = selectedMessages.some((m) => m._id === message._id)
      ? selectedMessages.filter((m) => m._id !== message._id)
      : [...selectedMessages, message];

    setSelectedMessages(updatedMessages);
  };

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
      <ChatHeader
        cancelSelection={() => setSelectedMessages([])}
        onDeleteMessages={onDeleteMessages}
        selectedCount={selectedMessages.length}
      />

      <ChatMessagesWrapper isLoading={isLoading}>
        {currentMessages.map((msg) => (
          <MessageCard
            key={msg._id}
            message={msg}
            selected={(() => selectedMessages.some((m) => m._id === msg._id))()}
            onSelected={() => onMessageSelected({ ...msg })}
            selectedCount={selectedMessages.length}
          />
        ))}
      </ChatMessagesWrapper>

      <SendMessageInput />
    </div>
  );
};

export default ShowChatMessages;
