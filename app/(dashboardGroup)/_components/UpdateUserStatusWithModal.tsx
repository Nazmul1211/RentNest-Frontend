"use client";

import { useState } from "react";
import { UserCheck, X, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UpdateUserData } from "../_action/AdminAction";

type Props = {
    userId: string;
    currentStatus?: string;
    userName?: string;
};

const STATUS_OPTIONS = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Suspended", value: "SUSPENDED" },
    { label: "Banned", value: "BANNED" },
    { label: "Deleted", value: "DELETED" },
];



const UpdateUserStatusWithModal = ({ userId, currentStatus = "ACTIVE", userName = "User" }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await UpdateUserData({ status }, userId);
            if (res && res.success !== false) {
                toast.success(`User status updated to ${status} successfully!`);
                setIsOpen(false);
            } else {
                toast.error(res?.message || "Failed to update user status");
            }

        } catch (err) {
            console.error("Failed to update status:", err);
            toast.error("Something went wrong while updating status");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="text-[10px] h-7 px-2.5 font-bold border-teal-500/40 text-teal-600 hover:bg-teal-500/10 cursor-pointer flex items-center gap-1"
            >
                <UserCheck className="size-3" />
                Update Status
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-sm p-6 relative space-y-4 text-slate-900 animate-in fade-in zoom-in-95">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <div className="flex items-center gap-2">
                                <UserCheck className="size-5 text-teal-600" />
                                <div>
                                    <h3 className="font-bold text-base text-slate-900">Update User Status</h3>
                                    <p className="text-xs text-slate-500 line-clamp-1">{userName}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="user-status-select" className="text-xs font-semibold text-slate-700 block">
                                    Select New Status
                                </label>
                                <select
                                    id="user-status-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                >
                                    {STATUS_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label} ({opt.value})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs border-slate-300 text-slate-700 cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={loading}
                                    className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer"
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
}


export default UpdateUserStatusWithModal;