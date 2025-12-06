import { Activity, useRef, useState } from 'react';
import { useSendMessage } from '../../hooks';
import { useAuthStore } from '../../store';
import { SendIcon } from '../../lib/icons';
import EmojiSelecter from './EmojiSelecter';
import MessageImageInput from './MessageImageInput';
import MessageInputImagePreview from './MessageInputImagePreview';

const SendMessageInput = ({ disabled = false }) => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { setIsTyping } = useAuthStore();

  const { mutate, isPending } = useSendMessage();

  const handleEmojiClick = (emojiData) => setText(emojiData.emoji);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;
    mutate({
      text: text.trim(),
      image: imagePreview,
    });

    setText('');
    removeImage();
  };

  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="p-4 w-full">
      <Activity mode={imagePreview ? 'visible' : 'hidden'}>
        <MessageInputImagePreview
          imagePreview={imagePreview}
          removeImage={removeImage}
        />
      </Activity>

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 input input-sm sm:input-md px-0 rounded-lg relative">
          <EmojiSelecter onEmojiClick={handleEmojiClick} />

          <input
            name="message"
            type="text"
            className="w-full"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />

          <MessageImageInput
            fileInputRef={fileInputRef}
            onImageUpload={(src) => setImagePreview(src)}
            removeImage={removeImage}
            isImagePreviewed={!!imagePreview}
            disabled={disabled || isPending}
          />
        </div>

        <button
          type="submit"
          className="mx-4 ml-1 sm:mx-5 sm:ml-1 btn btn-md btn-circle"
          disabled={disabled || isPending || (!text.trim() && !imagePreview)}
        >
          <SendIcon className="size-6" />
        </button>
      </form>
    </div>
  );
};

export default SendMessageInput;
