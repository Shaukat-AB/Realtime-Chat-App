import { useEffect } from 'react';
import { useChatStore } from '../store';

export const useChatConnect = () => {
  const { currentContact, connectToMessages, disconnectToMessages } =
    useChatStore();

  useEffect(() => {
    connectToMessages();
    return () => disconnectToMessages();
  }, [currentContact._id, connectToMessages, disconnectToMessages]);
};
