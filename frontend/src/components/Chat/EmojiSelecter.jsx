import EmojiPicker from 'emoji-picker-react';
import { EmojiIcon } from '../../lib/icons';
import { useState } from 'react';

const EmojiSelecter = ({ onEmojiClick = (_emojiData) => null }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-circle bg-transparent border-0"
        onClick={() => setOpen(!open)}
      >
        <EmojiIcon className="size-6 text-zinc-500" />
      </button>

      <div
        id="emoji-picker"
        className="flex max-w-3xs sm:max-w-xs md:max-w-sm absolute bottom-1/1 mb-2 left-0"
        onBlur={() => setOpen(false)}
      >
        <EmojiPicker
          open={open}
          onEmojiClick={(emojiData) => {
            setOpen(false);
            onEmojiClick(emojiData);
          }}
          previewConfig={{ showPreview: false }}
          autoFocusSearch={false}
          height={420}
          lazyLoadEmojis={true}
          emojiStyle="google"
        />
      </div>
    </>
  );
};

export default EmojiSelecter;
