import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { apiPath } from "../api";
import { socketEvent } from "../lib/socket";

export const useChatStore = create((set, get) => ({
    currentContact: null,
    currentMessages: [],
    contacts: [],

    getContacts: async () => {
        const res = await fetch(apiPath.API_CONTACTS, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Error getContacts");

        const parsed = await res.json();
        if (!parsed?.message) {
            set({ contacts: parsed });
            return parsed;
        } else if (parsed?.message) {
            toast.error(parsed?.message);
        }
        set({ contacts: [] });
        return [];
    },

    getCurrentMessages: async () => {
        const { currentContact } = get();
        const res = await fetch(
            apiPath.API_MESSAGES_BY_ID + currentContact._id,
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) throw new Error("Error getCurrentMessages");

        const parsed = await res.json();
        if (!parsed?.message) {
            set({ currentMessages: parsed });
            return parsed;
        } else if (parsed?.message) {
            toast.error(parsed?.message);
        }
        set({ currentMessages: [] });
        return [];
    },

    setCurrentContact: (user) => set({ currentContact: user }),

    sendMessage: async (message) => {
        const { currentContact, currentMessages } = get();
        const res = await fetch(
            apiPath.API_SEND_MESSAGE_BY_ID + currentContact._id,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
                credentials: "include",
            }
        );
        const parsed = await res.json();
        if (!res.ok) {
            if (parsed?.message) {
                toast.error(parsed.message);
            }
            throw new Error("Error sendMessage");
        }
        set({ currentMessages: [...currentMessages, parsed] });
        return parsed;
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
