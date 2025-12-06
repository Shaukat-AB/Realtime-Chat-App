import { Activity, useState } from 'react';
import SendMessageInput from './SendMessageInput';
import MessageSkeleton from '../Skeletons/MessageSkeleton';
import ChatHeader from './ChatHeader';
import {
  useChatConnect,
  useContactTypingConnect,
  useGetMessages,
  useSoftHardDelMessages,
} from '../../hooks';
import MessageCard from './MessageCard';
import ChatMessagesWrapper from './ChatMessagesWrapper';
import toast from 'react-hot-toast';
import { useChatStore } from '../../store';

const ShowChatMessages = () => {
  useChatConnect();
  useContactTypingConnect();

  const { currentMessages: tempMessages } = useChatStore();
  const { data, isLoading } = useGetMessages();
  const [selectedMessages, setSelectedMessages] = useState([]);

  const currentMessages = tempMessages?.some((m) => m?.temporary)
    ? tempMessages
    : data;

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

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader
        cancelSelection={() => setSelectedMessages([])}
        onDeleteMessages={onDeleteMessages}
        selectedCount={selectedMessages?.length}
      />

      {isLoading && <MessageSkeleton />}

      <Activity mode={isLoading ? 'hidden' : 'visible'}>
        <ChatMessagesWrapper isLoading={isLoading}>
          {currentMessages?.map((msg) => (
            <MessageCard
              key={msg._id}
              message={msg}
              selected={(() =>
                selectedMessages.some((m) => m._id === msg._id))()}
              onSelected={() => onMessageSelected({ ...msg })}
              selectedCount={selectedMessages.length}
            />
          ))}
        </ChatMessagesWrapper>
      </Activity>

      <SendMessageInput disabled={isLoading} />
    </div>
  );
};

export default ShowChatMessages;
