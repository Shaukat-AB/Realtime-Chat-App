import { useQuery } from '@tanstack/react-query';
import { useAuthStore, useChatStore } from '../../store';

export const useGetMessages = () => {
  const { authUser } = useAuthStore();
  const { getCurrentMessages, currentContact } = useChatStore();

  return useQuery({
    queryFn: getCurrentMessages,
    queryKey: ['currentMessages', currentContact?._id, authUser._id],
  });
};
