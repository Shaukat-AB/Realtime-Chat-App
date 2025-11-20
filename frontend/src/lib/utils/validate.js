import toast from 'react-hot-toast';
import { safeNewUserParse, safeSigninUserParse } from '../zod';

export const isNewUserValid = (formData) => {
  const result = safeNewUserParse(formData);
  if (!result.success) return toast.error(result.message);

  return true;
};

export const isSigninUserValid = (formData) => {
  const result = safeSigninUserParse(formData);
  if (!result.success) return toast.error(result.message);

  return true;
};
