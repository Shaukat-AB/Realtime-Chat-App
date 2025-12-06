import toast from 'react-hot-toast';
import { ImageIcon } from '../../lib/icons';

const MessageImageInput = ({
  fileInputRef,
  isImagePreviewed = false,
  disabled = false,
  onImageUpload = (_src) => null,
  removeImage = () => null,
}) => {
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
      onImageUpload(result);
    };
  };

  return (
    <>
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
                       ${
                         isImagePreviewed ? 'text-emerald-500' : 'text-zinc-500'
                       }`}
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
      >
        <ImageIcon className="size-5 md:size-6" />
      </button>
    </>
  );
};

export default MessageImageInput;
