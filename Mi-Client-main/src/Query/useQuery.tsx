import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users/usersFunctions";
import { getComments } from "../services/Comments/commentsFunctions";
import { GetPriorityOrStatus } from "../services/Status_priority/StatusOrPriority";
import loadTickets from "../services/Tickets/TicketFunctions";
export const USERS_QUERY_KEY = ["users"];
export const COMMENTS_QUERY_KEY = ["comments"];
export const PRIORITIES_QUERY_KEY = ["priorities"];
export const STATUSES_QUERY_KEY = ["statuses"];
export const TICKETS_QUERT_KEY= ["tickets"];

export const useUsersQuery = () => {
    return useQuery({
        queryKey: USERS_QUERY_KEY,
        queryFn: getAllUsers,
        staleTime: Infinity,
    });
}

export const useCommentsQuery = (userId: number) => {
    return useQuery({
        queryKey: COMMENTS_QUERY_KEY,
        queryFn: () => getComments(userId),
        staleTime: Infinity,
    });
}

export const usePriorityQuery = () => { 
    return useQuery({
        queryKey: PRIORITIES_QUERY_KEY,
        queryFn: async () => GetPriorityOrStatus({type: 'priorities'}),
        staleTime: Infinity,
    });
}

export const useStatusQuery = () => { 
    return useQuery({
        queryKey: STATUSES_QUERY_KEY,
        queryFn: async () => GetPriorityOrStatus({type: 'statuses'}),
        staleTime: Infinity,
    });
}

export const useTicketsQuery=()=>{
    return useQuery({
        queryKey: TICKETS_QUERT_KEY,
        queryFn: loadTickets,
        staleTime: Infinity,
    });
}
