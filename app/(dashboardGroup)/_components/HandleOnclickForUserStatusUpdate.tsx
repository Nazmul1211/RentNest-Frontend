"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UpdateUserData } from "../_action/AdminAction";
import { toast } from "sonner";
import { Loader2, Check, X } from "lucide-react";

type UserStatus = "ACTIVE" | "INACTIVE" | "REJECTED" | "SUSPENDED" | "DELETED";

const STATUS_OPTIONS: { label: string; value: UserStatus }[] = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Suspended", value: "SUSPENDED" },
    { label: "Deleted", value: "DELETED" },
];

const HandleOnclickForUserStatusUpdate = ({
    userId,
    currentStatus = "ACTIVE",
}: {
    userId: string;
    currentStatus?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<UserStatus>((currentStatus as UserStatus) || "ACTIVE");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await UpdateUserData({ status }, userId);
            if (res?.success !== false) {
                toast.success(`Status updated to ${status}`);
                setIsOpen(false);
            } else {
                toast.error(res?.message || "Failed to update status");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="text-[10px] py-0 px-1.5 font-bold text-amber-600 border-amber-500/30 hover:bg-amber-500/10"
            >
                Update Status
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-4 text-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <h3 className="font-bold text-base">Update User Status</h3>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="status-select" className="text-xs font-semibold text-slate-700 block">
                                    Select New Status
                                </label>
                                <select
                                    id="status-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as UserStatus)}
                                    className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                >
                                    {STATUS_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs border-slate-300 text-slate-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={loading}
                                    className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-bold"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="size-3.5 animate-spin mr-1" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="size-3.5 mr-1" />
                                            Save Status
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default HandleOnclickForUserStatusUpdate;