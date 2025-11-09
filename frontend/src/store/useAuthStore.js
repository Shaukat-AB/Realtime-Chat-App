import toast from "react-hot-toast";
import { create } from "zustand";
import { io } from "socket.io-client";
import { BASE_URL, apiPath } from "../api";
import { socketEvent } from "../lib/socket";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    onlineUsers: [],
    socket: null,

    verifyAuth: async () => {
        const res = await fetch(apiPath.API_VERIFY, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Error verifyAuth");

        const parsed = await res.json();
        if (parsed?.email) {
            set({ authUser: parsed });
            get().connectSocket();
            return parsed;
        }

        set({ authUser: null });
        get().disconnectSocket();

        return null;
    },

    signup: async (data) => {
        const res = await fetch(apiPath.API_SIGN_UP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        const parsed = await res.json();
        if (!res.ok) {
            if (parsed?.message) {
                toast.error(parsed.message);
            }
            set({ authUser: null });
            throw new Error("Error Signup");
        }

        set({ authUser: parsed });
        toast.success("Signing up completed");
        get().connectSocket();
        return parsed;
    },

    signin: async (data) => {
        const res = await fetch(apiPath.API_SIGN_IN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        const parsed = await res.json();
        if (!res.ok) {
            if (parsed?.message) {
                toast.error(parsed.message);
            }

            set({ authUser: null });
            throw new Error("Error Signin");
        }
        set({ authUser: parsed });
        toast.success("Signing in completed");
        get().connectSocket();
        return parsed;
    },

    signout: async () => {
        const res = await fetch(apiPath.API_SIGN_OUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!res.ok) {
            throw new Error("Error Signout");
        }
        set({ authUser: null });
        toast.success("Signing out completed");
        get().disconnectSocket();
    },

    updateProfile: async (data) => {
        const res = await fetch(apiPath.API_UPDATE_PROFILE, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        const parsed = await res.json();
        if (!res.ok) {
            if (parsed?.message) {
                toast.error(parsed.message);
            }
            throw new Error("Error Signin");
        }
        set({ authUser: parsed });
        toast.success("Image Uploaded");
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
