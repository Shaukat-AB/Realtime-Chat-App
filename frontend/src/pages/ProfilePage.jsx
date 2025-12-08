import { useState } from 'react';
import { useAuthStore } from '../store';
import { CameraIcon, MailIcon, UserIcon } from '../lib/icons';
import toast from 'react-hot-toast';
import { Avatar } from '../components';
import { useUpdateProfile } from '../hooks';

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [image, setImage] = useState(null);
  const { mutate, isPending } = useUpdateProfile();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const maxSize = 1 * 1024 * 1024; //bytes
    if (file.size > maxSize) {
      setImage('');
      toast.error('Image size exceeds the 1MB limit');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (revent) => {
      const result = revent.target.result;
      setImage(result);
      mutate({ avatar: result });
    };
  };

  return (
    <div className="pt-20 bg-base-200 sm:h-screen">
      <title>Profile | Chat-App</title>

      <div className="max-w-6xl mx-auto p-4 py-8">
        <div className="aspect-video bg-base-100 rounded-xl p-6 space-y-8 relative">
          {/* Background */}
          <div className="absolute left-0 top-0 w-full h-40 rounded-xl rounded-bl-none rounded-br-none bg-base-content"></div>

          <div className="text-center relative">
            <h1 className="text-2xl font-semibold text-base-100">
              Profile Information
            </h1>
          </div>

          <div className="flex flex-col items-center gap-4 relative">
            <div className="relative">
              <Avatar
                src={image || authUser.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                      absolute bottom-0 right-0
                      bg-base-content hover:scale-105
                      p-2 rounded-full cursor-pointer
                      transition-all duration-200
                      ${isPending ? 'animate-pulse pointer-events-none' : ''}
                    `}
              >
                <CameraIcon className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isPending}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-500">
              {isPending
                ? 'Uploading...'
                : 'Click the camera icon to update your photo'}
            </p>
          </div>

          <div className="flex gap-4 sm:gap-8 lg:gap-16 flex-col sm:flex-row">
            <div className="flex-5 space-y-6 lg:px-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-500 flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-base-100 rounded-lg border">
                  {authUser?.fullname}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-500 flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-100 rounded-lg border">
                  {authUser?.email}
                </p>
              </div>
            </div>

            <div className="flex-3 mt-6 lg:px-6 bg-base-100 rounded-xl text-base-content/80">
              <h2 className="text-lg font-medium  mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split('T')[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-success">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
