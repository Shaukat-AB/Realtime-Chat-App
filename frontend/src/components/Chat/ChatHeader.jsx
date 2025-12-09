import { useAuthStore, useChatStore } from '../../store';
import { ChatSquareIcon, DeleteIcon, XIcon } from '../../lib/icons';
import { lastSeenText } from '../../lib/utils';
import Avatar from '../Avatar/Avatar';

const ChatHeader = ({
  selectedCount = 0,
  onDeleteMessages = () => null,
  cancelSelection = () => null,
}) => {
  const { currentContact, setCurrentContact } = useChatStore();
  const { onlineUsers, isContactTyping } = useAuthStore();

  const handleDelete = (_e) => {
    if (!selectedCount) return;
    onDeleteMessages();
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full relative">
              <Avatar
                src={currentContact.avatar}
                alt={currentContact.fullname}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{currentContact.fullname}</h3>
            <p className="text-sm text-base-content/70 whitespace-nowrap overflow-hidden">
              {isContactTyping
                ? 'typing ...'
                : onlineUsers.includes(currentContact._id)
                ? 'Online'
                : lastSeenText(currentContact) || 'Offline'}
            </p>
          </div>
        </div>

        <div className="flex-1 max-w-3xs h-8 gap-8 flex items-center justify-end">
          {selectedCount > 0 && (
            <>
              <span
                className="flex gap-2 items-center mr-auto"
                aria-label="Total-Selected-Messages"
              >
                {selectedCount}
                <ChatSquareIcon className="size-5" />
              </span>
              <button
                className="btn btn-circle bg-transparent border-0 size-5"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </button>
            </>
          )}

          <button
            className="btn btn-circle bg-transparent border-0 size-5"
            onClick={() =>
              selectedCount > 0 ? cancelSelection() : setCurrentContact(null)
            }
          >
            <XIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
