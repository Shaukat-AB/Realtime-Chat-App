import { useQuery } from '@tanstack/react-query';
import { useAuthStore, useChatStore } from '../../store';

export const useGetContacts = () => {
  const { authUser } = useAuthStore();
  const { getContacts } = useChatStore();

  return useQuery({
    queryFn: getContacts,
    queryKey: ['contacts', authUser._id],
  });
};
