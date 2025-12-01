import { useRefScrollIntoView } from '../../hooks';
import { useChatStore } from '../../store';

const ChatMessagesWrapper = ({ children, isLoading = false }) => {
  const { currentMessages, currentContact } = useChatStore();

  const messageEndRef = useRefScrollIntoView([
    isLoading,
    currentMessages,
    currentContact._id,
  ]);

  return (
    <div className="flex-1 overflow-y-auto space-y-4">
      {children}

      {/* Scrolls into view as message's end*/}
      <span ref={messageEndRef}></span>
    </div>
  );
};

export default ChatMessagesWrapper;
