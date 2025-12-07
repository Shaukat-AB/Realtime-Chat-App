import {
  // Cog6ToothIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon as HUserIcon,
  UsersIcon as HUsersIcon,
  LockClosedIcon,
  EnvelopeIcon,
  ArrowRightStartOnRectangleIcon,
  CameraIcon as HCameraIcon,
  ChevronDownIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  XMarkIcon,
  TrashIcon,
  NoSymbolIcon,
  FaceSmileIcon,
  CheckIcon as HCheckIcon,
} from '@heroicons/react/24/outline';
import { memo } from 'react';

export const ChatSquareIcon = ChatBubbleLeftIcon;
export const EyeOnIcon = memo(EyeIcon);
export const EyeOffIcon = memo(EyeSlashIcon);
export const UserIcon = memo(HUserIcon);
export const LockIcon = memo(LockClosedIcon);
export const MailIcon = memo(EnvelopeIcon);
export const UsersIcon = memo(HUsersIcon);
export const SignoutIcon = ArrowRightStartOnRectangleIcon;
export const CameraIcon = HCameraIcon;
export const BtnArrowDownIcon = ChevronDownIcon;
export const SendIcon = PaperAirplaneIcon;
export const ImageIcon = PhotoIcon;
export const XIcon = XMarkIcon;
export const DeleteIcon = TrashIcon;
export const NoMessageIcon = NoSymbolIcon;
export const EmojiIcon = FaceSmileIcon;
export const CheckIcon = HCheckIcon;
// export const SettingsIcon = Cog6ToothIcon;
