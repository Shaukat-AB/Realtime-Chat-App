import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMessages } from '../../api';

export const useDeleteMessages = (onSuccess = (_data) => null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessages,
    onSuccess: (data) => {
      queryClient.invalidateQueries('deleteMessages');
      onSuccess(data);
    },
    mutationKey: ['deleteMessages'],
  });
};
