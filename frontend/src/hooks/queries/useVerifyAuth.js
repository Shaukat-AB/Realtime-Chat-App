import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store';

export const useVerifyAuth = () => {
  const { authUser, verifyAuth } = useAuthStore();

  return useQuery({
    queryKey: ['verifyAuth', authUser?._id],
    queryFn: verifyAuth,
  });
};
