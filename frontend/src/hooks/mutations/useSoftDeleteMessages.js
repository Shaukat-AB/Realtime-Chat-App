import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDeleteMessages } from '../../api';

export const useSoftDeleteMessages = (onSuccess = (_data) => null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: softDeleteMessages,
    onSuccess: (data) => {
      queryClient.invalidateQueries('deleteMessages');
      onSuccess(data);
    },
    mutationKey: ['deleteMessages', 'soft'],
  });
};
