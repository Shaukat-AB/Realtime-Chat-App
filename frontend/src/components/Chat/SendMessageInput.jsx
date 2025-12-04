import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ImageIcon, SendIcon, XIcon } from '../../lib/icons';
import { useSendMessage } from '../../hooks';

const SendMessageInput = ({ disabled = false }) => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate, isPending } = useSendMessage();

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
        <div className="flex-1 flex gap-2">
          <input
            name="message"
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            autoFocus
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
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isPending}
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={disabled || isPending || (!text.trim() && !imagePreview)}
        >
          <SendIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default SendMessageInput;
