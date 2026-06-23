import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,      // data stays fresh for 1 minute
            refetchOnWindowFocus: false, // don't refetch every time user switches tabs
        },
    },
});