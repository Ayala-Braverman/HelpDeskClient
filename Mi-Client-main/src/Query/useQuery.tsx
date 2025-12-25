import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users/usersFunctions";
import { getComments } from "../services/Comments/commentsFunctions";
import { GetPriorityOrStatus } from "../services/Status_priority/StatusOrPriority";
import loadTickets from "../services/Tickets/TicketFunctions";
import { useUserContext } from "../Context/userContext";
export const USERS_QUERY_KEY = ["users"];
export const COMMENTS_QUERY_KEY = ["comments"];
export const PRIORITIES_QUERY_KEY = ["priorities"];
export const STATUSES_QUERY_KEY = ["statuses"];
export const TICKETS_QUERT_KEY= ["tickets"];

export const useUsersQuery = () => {
    const { user } = useUserContext();
    return useQuery({
        queryKey: USERS_QUERY_KEY,
        queryFn: () => getAllUsers(user?.token || ""),
        staleTime: Infinity,
    });
}

export const useCommentsQuery = (userId: number) => {
    const {user} = useUserContext();
    return useQuery({
        queryKey: [COMMENTS_QUERY_KEY, userId],
        queryFn: () => getComments(userId, user?.token || ""),
        staleTime: Infinity,
    });
}

export const usePriorityQuery = () => { 
    const { user } = useUserContext();
    return useQuery({
        queryKey: PRIORITIES_QUERY_KEY,
        queryFn: async () => GetPriorityOrStatus({type: 'priorities', token: user?.token || ""}),
        staleTime: Infinity,
    });
}

export const useStatusQuery = () => { 
    const { user } = useUserContext();
    return useQuery({
        queryKey: STATUSES_QUERY_KEY,
        queryFn: async () => GetPriorityOrStatus({type: 'statuses', token: user?.token || ""}),
        staleTime: Infinity,
    });
}

export const useTicketsQuery = () => {
    const { user } = useUserContext();
    return useQuery({
        queryKey: TICKETS_QUERT_KEY,
        queryFn: () => loadTickets(user?.token || ""),
        staleTime: Infinity,
    });
}
