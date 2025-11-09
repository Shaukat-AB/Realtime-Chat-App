import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "../../store";

export const useGetMessages = () => {
    const { getCurrentMessages, currentContact } = useChatStore();

    return useQuery({
        queryFn: getCurrentMessages,
        queryKey: ["currentMessages", currentContact?._id],
        staleTime: 0,
    });
};
