import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../store';

export const useSignup = () => {
  const { signup } = useAuthStore();
  return useMutation({
    mutationFn: signup,
    mutationKey: ['signup'],
  });
};
