import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

// pgEnum maps to a real PostgreSQL ENUM type in the DB
export const taskStatusEnum = pgEnum("task_status", [
    "todo",
    "in_progress",
    "done",
]);

export const tasks = pgTable("tasks", {
    id:        uuid("id").primaryKey().defaultRandom(),
    title:     text("title").notNull(),
    status:    taskStatusEnum("status").notNull().default("todo"),
    dueDate:   timestamp("due_date"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// This type is auto-derived from your schema — no manual interface needed
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;