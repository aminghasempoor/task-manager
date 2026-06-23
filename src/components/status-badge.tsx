import { Badge } from "@/components/ui/badge";

type Status = "todo" | "in_progress" | "done";

const config: Record<Status, { label: string; className: string }> = {
    todo:        { label: "To Do",       className: "bg-slate-100 text-slate-700 hover:bg-slate-100" },
    in_progress: { label: "In Progress", className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
    done:        { label: "Done",        className: "bg-green-100 text-green-700 hover:bg-green-100" },
};

export function StatusBadge({ status }: { status: Status }) {
    const { label, className } = config[status];
    return <Badge className={className}>{label}</Badge>;
}