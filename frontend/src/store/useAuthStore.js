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

export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  socket: null,

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
}));
