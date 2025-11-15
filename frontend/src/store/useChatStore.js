import toast from 'react-hot-toast';
import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { getContacts, getCurrentMessages, postSendMessage } from '../api';
import { socketEvent } from '../lib/socket';

export const useChatStore = create((set, get, store) => ({
  currentContact: null,
  currentMessages: [],
  contacts: [],
  reset: () => set(store.getInitialState()), //reset to initial state

  getContacts: async () => {
    const users = await getContacts();

    if (!users?.message) {
      set({ contacts: users });
      return users;
    } else if (users?.message) {
      toast.error(users?.message);
    }

    set({ contacts: [] });
    return [];
  },

  getCurrentMessages: async () => {
    const { currentContact } = get();
    const messages = await getCurrentMessages(currentContact._id);

    if (!messages?.message) {
      set({ currentMessages: messages });
      return messages;
    } else if (messages?.message) {
      toast.error(messages?.message);
    }

    set({ currentMessages: [] });
    return [];
  },

  setCurrentContact: (user) => set({ currentContact: user }),

  sendMessage: async (message) => {
    const { currentContact, currentMessages } = get();
    const newMessage = await postSendMessage(message, currentContact._id);

    if (newMessage?.message) toast.error(newMessage.message);

    set({ currentMessages: [...currentMessages, newMessage] });
    return newMessage;
  },

  connectToMessages: () => {
    const { currentContact } = get();
    if (!currentContact) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on(socketEvent.EV_NEW_MESSAGE, (newMessage) => {
      if (newMessage.senderId !== currentContact._id) return;
      set({ currentMessages: [...get().currentMessages, newMessage] });
    });
  },

  disconnectToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off(socketEvent.EV_NEW_MESSAGE);
  },
}));
