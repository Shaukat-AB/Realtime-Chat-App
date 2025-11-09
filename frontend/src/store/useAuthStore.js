import { create } from "zustand";
import { apiPath } from "../api";

export const useAuthStore = create((set, get) => ({
    authUser: null,

    verifyAuth: async () => {
        const res = await fetch(apiPath.API_VERIFY, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Error verifyAuth");

        const parsed = await res.json();
        if (parsed?.email) {
            set({ authUser: parsed });
            return parsed;
        }

        set({ authUser: null });
        return null;
    },
}));
