import { XIcon } from '../../lib/icons';
import { useAuthStore, useChatStore } from '../../store';
import Avatar from '../Avatar/Avatar';

const ChatHeader = () => {
  const { currentContact, setCurrentContact } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(currentContact._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <button onClick={() => setCurrentContact(null)}>
          <XIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
