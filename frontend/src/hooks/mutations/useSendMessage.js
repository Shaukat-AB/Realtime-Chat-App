import { useMutation } from "@tanstack/react-query";
import { useChatStore } from "../../store";

export const useSendMessage = () => {
    const { sendMessage } = useChatStore();
    return useMutation({
        mutationFn: sendMessage,
        mutationKey: ["sendMessage"],
    });
};
