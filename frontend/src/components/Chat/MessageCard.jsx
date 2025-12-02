import { Activity } from 'react';
import { NoMessageIcon } from '../../lib/icons';
import { formatDateToLocalTimeIn2Digit } from '../../lib/utils';
import { useAuthStore, useChatStore } from '../../store';
import Avatar from '../Avatar/Avatar';

const MESSAGE_DELETED_TEXT = 'Message has been deleted';

const MessageCard = ({
  message = {},
  selected = false,
  onSelected = () => null,
  selectedCount = 0,
}) => {
  const { authUser } = useAuthStore();
  const { currentContact } = useChatStore();
  const isSenderAuthUser = message.senderId === authUser._id;

  const handleDoubleClick = (_e) => {
    if (selectedCount === 0) onSelected();
  };

  const handleClick = (_e) => {
    if (selectedCount > 0) onSelected();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSelected();
    }
  };

  return (
    <div
      aria-selected={selected === true}
      tabIndex={0}
      className={`chat px-4 py-3.5 ${selected ? 'bg-primary/20' : ''} ${
        isSenderAuthUser ? 'chat-end' : 'chat-start'
      }`}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className=" chat-image avatar">
        <div className="size-10 rounded-full border hidden sm:block">
          <Avatar
            src={
              message.senderId === authUser._id
                ? authUser.avatar
                : currentContact.avatar
            }
            alt="profile avatar"
          />
        </div>
      </div>

      <Activity mode={!message?.temporary ? 'visible' : 'hidden'}>
        <div className="chat-header mb-1">
          <time className="text-xs opacity-50 ml-1">
            {formatDateToLocalTimeIn2Digit(message.createdAt)}
          </time>
        </div>
      </Activity>

      <div
        className={`chat-bubble ${
          isSenderAuthUser ? 'chat-bubble-primary' : 'chat-bubble-neutral'
        } flex flex-col cursor-default`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="max-w-50 sm:max-w-54 xl:max-w-60 rounded-md mb-2"
          />
        )}

        {message?.temporary ? (
          <div className="flex items-center gap-1">
            <NoMessageIcon className="size-4 text-base" />
            <p className="italic">{MESSAGE_DELETED_TEXT}</p>
          </div>
        ) : (
          message.text && <p>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
