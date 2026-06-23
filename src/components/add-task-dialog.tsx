"use client";

import { useState } from "react";
import { useCreateTask } from "@/hooks/useTasks";
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select";

export function AddTaskDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<"todo" | "in_progress" | "done">("todo");

    const { mutate: createTask, isPending } = useCreateTask();

    function handleSubmit() {
        if (!title.trim()) return;
        createTask(
            { title, status },
            {
                onSuccess: () => {
                    setOpen(false);
                    setTitle("");
                    setStatus("todo");
                },
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Task</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 pt-2">
                    <Input
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />

                    <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button onClick={handleSubmit} disabled={isPending}>
                        {isPending ? "Creating..." : "Create"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}