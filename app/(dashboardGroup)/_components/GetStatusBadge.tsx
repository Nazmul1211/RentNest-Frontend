
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

interface GetStatusBadgeProps {
    status: string;
    className?: string;
}

export const getStatusBadge = (status: string, className?: string) => {
    const upperStatus = status?.toUpperCase() || "";

    switch (upperStatus) {
        case "PENDING":
            return (
                <Badge variant="outline" className={`bg-amber-500/10 text-amber-600 border-amber-500/30 flex items-center gap-1 px-2.5 py-1 font-bold ${className || ""}`}>
                    <Clock className="size-3.5" />
                    <span>Pending Approval</span>
                </Badge>
            );

        case "APPROVED":
            return (
                <Badge variant="outline" className={`bg-emerald-500/10 text-emerald-600 border-emerald-500/30 flex items-center gap-1 px-2.5 py-1 font-bold ${className || ""}`}>
                    <CheckCircle2 className="size-3.5" />
                    <span>Approved</span>
                </Badge>
            );

        case "REJECTED":
            return (
                <Badge variant="outline" className={`bg-rose-500/10 text-rose-600 border-rose-500/30 flex items-center gap-1 px-2.5 py-1 font-bold ${className || ""}`}>
                    <XCircle className="size-3.5" />
                    <span>Rejected</span>
                </Badge>
            );

        case "PAID":
        case "COMPLETED":
            return (
                <Badge variant="outline" className={`bg-cyan-500/10 text-cyan-600 border-cyan-500/30 flex items-center gap-1 px-2.5 py-1 font-bold ${className || ""}`}>
                    <CheckCircle2 className="size-3.5" />
                    <span>{upperStatus}</span>
                </Badge>
            );

        case "ACTIVE":
            return (
                <Badge variant="outline" className={`bg-emerald-500/10 text-emerald-600 border-emerald-500/30 flex items-center gap-1 px-2.5 py-1 font-bold ${className || ""}`}>
                    <CheckCircle2 className="size-3.5" />
                    <span>Active</span>
                </Badge>
            );

        case "INACTIVE":
        case "SUSPENDED":
        case "DELETED":
        case "BANNED":
            return (
                <Badge variant="outline" className={`bg-rose-500/10 text-rose-600 border-rose-500/30 flex items-center gap-1 px-2.5 py-1 font-bold ${className || ""}`}>
                    <AlertCircle className="size-3.5" />
                    <span>{upperStatus}</span>
                </Badge>
            );

        default:
            return (
                <Badge variant="outline" className={`bg-muted text-muted-foreground px-2.5 py-1 font-bold ${className || ""}`}>
                    {status || "UNKNOWN"}
                </Badge>
            );
    }
};



export function GetStatusBadge({ status, className }: GetStatusBadgeProps) {
    return getStatusBadge(status, className);
}

export default GetStatusBadge;
