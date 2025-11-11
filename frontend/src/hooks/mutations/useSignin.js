import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store';

export const useSignin = () => {
  const { signin } = useAuthStore();
  const queryClient = useQueryClient;

  return useMutation({
    mutationFn: signin,
    mutationKey: ['signin'],
    onSuccess: (data) => {
      if (data?.email) {
        queryClient.invalidateQueries(['verifyAuth']);
      }
    },
  });
};
