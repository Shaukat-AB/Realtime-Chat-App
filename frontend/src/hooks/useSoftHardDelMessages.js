import { useAuthStore, useChatStore } from '../store';
import { useDeleteMessages } from './mutations/useDeleteMessages';
import { useSoftDeleteMessages } from './mutations/useSoftDeleteMessages';

export const useSoftHardDelMessages = ({
  selectedMessages = [],
  resetSelectedMessages = () => null,
  onSuccess = (_data) => null,
}) => {
  const { authUser } = useAuthStore();
  const { removeTempMessages } = useChatStore();

  const { mutate: delMessages } = useDeleteMessages(onSuccess);
  const { mutate: softDelMessages } = useSoftDeleteMessages(onSuccess);

  return () => {
    if (!selectedMessages?.length) return;

    const senderMessages = selectedMessages.filter(
      (m) => m.senderId === authUser._id
    );
    const receiverMessages = selectedMessages.filter(
      (m) => m.receiverId === authUser._id
    );

    // Delete Temporary messages
    if (selectedMessages.some((msg) => msg?.temporary)) {
      removeTempMessages(
        selectedMessages.filter((m) => m.temporary).map((m) => m._id)
      );
    }

    if (senderMessages.length) {
      delMessages(senderMessages.filter((m) => m._id));
    }

    if (receiverMessages.length) {
      softDelMessages(receiverMessages.filter((m) => m._id));
    }

    resetSelectedMessages();
  };
};
