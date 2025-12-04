import toast from 'react-hot-toast';
import { create } from 'zustand';
import { io } from 'socket.io-client';
import {
  BASE_URL,
  getVerifyAuth,
  postSignin,
  postSignout,
  postSignup,
  putUpdateProfile,
} from '../api';
import { socketEvent } from '../lib/socket';
import { useChatStore } from './useChatStore';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  socket: null,

  isTyping: false,
  isContactTyping: false,

  setIsTyping: (isTyping) => {
    set({ isTyping: isTyping });
    get().socket.emit(socketEvent.EV_USER_TYPING, {
      _id: get().authUser._id,
      isTyping,
    });
  },

  verifyAuth: async () => {
    const user = await getVerifyAuth();

    if (user?.email) {
      set({ authUser: user });
      get().connectSocket();
      return user;
    }

    set({ authUser: null });
    get().disconnectSocket();

    return null;
  },

  signup: async (data) => {
    const newUser = await postSignup(data);

    if (newUser?.message) {
      toast.error(newUser.message);
      return null;
    }

    set({ authUser: newUser });
    toast.success('Signing up completed');
    get().connectSocket();

    return newUser;
  },

  signin: async (data) => {
    const user = await postSignin(data);

    if (user?.message) {
      toast.error(user.message);
      return null;
    }

    set({ authUser: user });
    toast.success('Signing in completed');
    get().connectSocket();

    return user;
  },

  signout: async () => {
    const success = await postSignout();
    if (!success) return null;

    set({ authUser: null });

    // User signed out reset user's contacts and chats
    useChatStore.getState().reset();

    toast.success('Signing out completed');
    get().disconnectSocket();
  },

  updateProfile: async (data) => {
    const updatedUser = await putUpdateProfile(data);

    if (updatedUser?.message) {
      toast.error(updatedUser.message);
      return null;
    }

    set({ authUser: updatedUser });
    toast.success('Image Uploaded');
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, { query: { userId: authUser._id } });
    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on(socketEvent.EV_ONLINE_USERS, (userIdArr) => {
      set({ onlineUsers: [...userIdArr] });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },

  connectContactTyping: () => {
    const { authUser, socket } = get();
    if (!authUser) return;

    socket.on(socketEvent.EV_USER_TYPING, (data) => {
      if (useChatStore.getState().currentContact?._id === data._id) {
        set({ isContactTyping: data.isTyping });
      }
    });
  },

  disconnectContactTyping: () => {
    const { socket } = get();
    socket.off(socketEvent.EV_USER_TYPING);
  },
}));
