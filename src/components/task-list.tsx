"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTaskList } from "@/hooks/useTasks";
import { TaskCard } from "./task-card";

export function TaskList() {
    const { data: tasks, isPending, isError } = useTaskList();

    if (isPending) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground text-center py-12"
            >
                Loading tasks...
            </motion.div>
        );
    }

    if (isError) {
        return (
            <p className="text-sm text-destructive text-center py-12">
                Failed to load tasks.
            </p>
        );
    }

    if (tasks.length === 0) {
        return (
            <p className="text-sm text-muted-foreground text-center py-12">
                No tasks yet. Add one above.
            </p>
        );
    }

    return (
        // AnimatePresence watches its children — when one is removed it plays the exit animation
        <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </AnimatePresence>
    );
}