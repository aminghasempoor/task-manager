import { os } from "@orpc/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema,
} from "@/validators/task";

// `os` is the oRPC builder — you chain .input() .output() .handler()
const base = os;

export const router = {
    task: {
        // GET all tasks
        list: base
            .handler(async () => {
                return await db.select().from(tasks).orderBy(tasks.createdAt);
            }),

        // POST — create a task
        create: base
            .input(createTaskSchema)
            .handler(async ({ input }) => {
                const [task] = await db
                    .insert(tasks)
                    .values({
                        title: input.title,
                        status: input.status,
                        dueDate: input.dueDate ? new Date(input.dueDate) : null,
                    })
                    .returning();
                return task;
            }),

        // PATCH — update a task
        update: base
            .input(updateTaskSchema)
            .handler(async ({ input }) => {
                const { id, ...fields } = input;
                const [task] = await db
                    .update(tasks)
                    .set({
                        ...fields,
                        dueDate: fields.dueDate ? new Date(fields.dueDate) : null,
                    })
                    .where(eq(tasks.id, id))
                    .returning();
                return task;
            }),

        // DELETE — remove a task
        delete: base
            .input(deleteTaskSchema)
            .handler(async ({ input }) => {
                await db.delete(tasks).where(eq(tasks.id, input.id));
                return { success: true };
            }),
    },
};

// This type is exported and shared with the client
export type Router = typeof router;