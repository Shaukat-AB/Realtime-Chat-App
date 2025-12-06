import { XIcon } from '../../lib/icons';

const MessageInputImagePreview = ({
  imagePreview = null,
  removeImage = () => null,
}) => {
  return (
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
  );
};

export default MessageInputImagePreview;
