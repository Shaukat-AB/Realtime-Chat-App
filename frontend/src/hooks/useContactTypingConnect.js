import { useEffect } from 'react';
import { useAuthStore, useChatStore } from '../store';

export const useContactTypingConnect = () => {
  const { currentContact } = useChatStore();
  const { connectContactTyping, disconnectContactTyping } = useAuthStore();

  useEffect(() => {
    connectContactTyping();
    return () => disconnectContactTyping();
  }, [currentContact._id]);
};
