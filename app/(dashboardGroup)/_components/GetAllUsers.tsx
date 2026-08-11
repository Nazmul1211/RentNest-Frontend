import React from "react";
import { User, Mail, Phone, Calendar, ShieldCheck, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GetAllUsersData } from "../_action/AdminAction";
import UpdateUserStatusWithModal from "./UpdateUserStatusWithModal";


const getRoleBadge = (role: string) => {
    switch (role?.toUpperCase()) {
        case "ADMIN":
            return (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 font-bold">
                    Admin
                </Badge>
            );
        case "LANDLORD":
            return (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 font-bold">
                    Landlord
                </Badge>
            );
        case "TENANT":
            return (
                <Badge variant="outline" className="bg-teal-500/10 text-teal-600 border-teal-500/30 font-bold">
                    Tenant
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="bg-muted text-muted-foreground font-bold">
                    {role || "User"}
                </Badge>
            );
    }
};


const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};


const GetAllUsers = async () => {
    const users = await GetAllUsersData();

    if (!users || users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-xl bg-card/40 text-center space-y-3">
                <div className="size-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <Users className="size-6" />
                </div>
                <div className="space-y-1">
                    <h4 className="font-bold text-foreground text-sm">No Users Found</h4>
                    <p className="text-xs text-muted-foreground max-w-sm">
                        There are currently no registered users in the platform.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 my-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user: any) => {
                    const initials = user.name
                        ? user.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "U";

                    return (
                        <div
                            key={user.id}
                            className="p-5 rounded-xl border border-border/50 bg-card hover:border-teal-500/30 transition-all shadow-xs space-y-4"
                        >
                            {/* Header with Avatar, Name, Role & Status */}
                            <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600 font-extrabold text-sm shrink-0 border border-teal-500/30">
                                        {user.profilePhoto ? (
                                            <img
                                                src={user.profilePhoto}
                                                alt={user.name}
                                                className="size-full rounded-full object-cover"
                                            />
                                        ) : (
                                            initials
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-foreground leading-snug">
                                            {user.name}
                                        </h4>
                                        <span className="text-[10px] text-muted-foreground font-mono">
                                            ID: {user.id?.slice(0, 8)}...
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    {getRoleBadge(user.role)}
                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px] py-0 px-1.5 font-bold">
                                        {user.status || "ACTIVE"}
                                    </Badge>
                                </div>
                            </div>

                            {/* User Contact Information */}
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="size-3.5 text-teal-600 shrink-0" />
                                        <span className="text-foreground font-medium truncate">{user.email}</span>
                                    </div>

                                    {user.phone && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="size-3.5 text-teal-600 shrink-0" />
                                            <span className="text-foreground font-medium">{user.phone}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-muted-foreground pt-1 border-t border-border/20 text-[11px]">
                                        <Calendar className="size-3.5 text-teal-600 shrink-0" />
                                        <span>Joined: <strong className="text-foreground">{formatDate(user.createdAt)}</strong></span>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2 border-t border-border/30">
                                    <UpdateUserStatusWithModal
                                        userId={user.id}
                                        currentStatus={user.status}
                                        userName={user.name}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GetAllUsers;