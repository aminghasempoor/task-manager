import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/orpc/query-client";

// READ — fetch all tasks
export function useTaskList() {
    return useQuery(orpc.task.list.queryOptions());
}

// CREATE
export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        ...orpc.task.create.mutationOptions(),
        onSuccess: () => {
            // Invalidate the list cache so it refetches automatically
            queryClient.invalidateQueries(orpc.task.list.queryOptions());
        },
        onError: (error) => {
            console.error("CREATE ERROR:", error);
        },
    });
}

// UPDATE
export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        ...orpc.task.update.mutationOptions(),
        onSuccess: () => {
            queryClient.invalidateQueries(orpc.task.list.queryOptions());
        },
    });
}

// DELETE
export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        ...orpc.task.delete.mutationOptions(),
        onSuccess: () => {
            queryClient.invalidateQueries(orpc.task.list.queryOptions());
        },
    });
}