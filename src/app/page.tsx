import { AddTaskDialog } from "@/components/add-task-dialog";
import {TaskList} from "@/components/task-list";

export default function HomePage() {
  return (
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between gap-5 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <AddTaskDialog />
        </div>
        <TaskList />
      </main>
  );
}