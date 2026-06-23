"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { Task } from "@/db/schema";

// Animation variants — define states, reference them by name
const cardVariants = {
    hidden: { opacity: 0, y: 16 },   // initial state when entering
    visible: { opacity: 1, y: 0 },   // animated to this state
    exit:   { opacity: 0, x: -20 },  // animated to this on removal
};

export function TaskCard({ task }: { task: Task }) {
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
    const { mutate: updateTask } = useUpdateTask();

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout                                    // animates position changes smoothly
            transition={{ duration: 0.2 }}
        >
            <Card>
                <CardContent className="flex items-center justify-between gap-4 py-4">
                    <span className="flex-1 text-sm font-medium">{task.title}</span>

                    {/* Inline status change */}
                    <Select
                        value={task.status}
                        onValueChange={(v) =>
                            updateTask({ id: task.id, status: v as Task["status"] })
                        }
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                    <StatusBadge status={task.status} />

                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() => deleteTask({ id: task.id })}
                    >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}