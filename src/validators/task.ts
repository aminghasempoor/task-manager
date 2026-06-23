import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    status: z.enum(["todo", "in_progress", "done"]).default("todo"),
    dueDate: z.string().datetime().optional(), // ISO 8601 string from client
});

export const updateTaskSchema = z.object({
    id:     z.string().uuid(),
    title:  z.string().min(1).max(100).optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional(),
    dueDate: z.string().datetime().optional().nullable(),
});

export const deleteTaskSchema = z.object({
    id: z.string().uuid(),
});

// Types inferred directly from schemas — same pattern as Drizzle's $inferSelect
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;