import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store";

export const useUpdateProfile = () => {
    const { updateProfile } = useAuthStore();
    return useMutation({
        mutationFn: updateProfile,
        mutationKey: ["updateProfile"],
    });
};
