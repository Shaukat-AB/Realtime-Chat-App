import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSendMessage } from '../../hooks';
import { useAuthStore } from '../../store';
import { ImageIcon, SendIcon, XIcon } from '../../lib/icons';
import EmojiSelecter from './EmojiSelecter';

const SendMessageInput = ({ disabled = false }) => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { setIsTyping } = useAuthStore();

  const { mutate, isPending } = useSendMessage();

  const handleEmojiClick = (emojiData) => setText(emojiData.emoji);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const maxSize = 1 * 1024 * 1024; //bytes
    if (file.size > maxSize) {
      removeImage();
      toast.error('Image size exceeds the 1MB limit');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (revent) => {
      const result = revent.target.result;
      setImagePreview(result);
    };
  };

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
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />

            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
            >
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

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

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />

          <button
            type="button"
            className={`btn btn-circle bg-transparent border-0
                     ${imagePreview ? 'text-emerald-500' : 'text-zinc-500'}`}
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isPending}
          >
            <ImageIcon className="size-5 md:size-6" />
          </button>
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
