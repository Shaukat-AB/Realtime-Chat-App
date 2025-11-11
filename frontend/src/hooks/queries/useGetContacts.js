import { useQuery } from '@tanstack/react-query';
import { useChatStore } from '../../store';

export const useGetContacts = () => {
  const { getContacts } = useChatStore();
  return useQuery({
    queryFn: getContacts,
    queryKey: ['contacts'],
  });
};
