"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
    Calendar,
    DollarSign,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    User,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { LandlordRentalRequest, UpdateRentalRequestStatus } from "../_action/LandlordAction";


interface LandlordRentalRequestCardProps {
    req: LandlordRentalRequest;
}



const getStatusBadge = (status: string) => {
    switch (status) {
        case "PENDING":
            return (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 flex items-center gap-1 px-2.5 py-1">
                    <Clock className="size-3.5" />
                    <span>Pending Approval</span>
                </Badge>
            );

        case "APPROVED":
            return (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 flex items-center gap-1 px-2.5 py-1">
                    <CheckCircle2 className="size-3.5" />
                    <span>Approved</span>
                </Badge>
            );

        case "REJECTED":
            return (
                <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/30 flex items-center gap-1 px-2.5 py-1">
                    <XCircle className="size-3.5" />
                    <span>Rejected</span>
                </Badge>
            );

        case "PAID":
        case "COMPLETED":
            return (
                <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/30 flex items-center gap-1 px-2.5 py-1">
                    <CheckCircle2 className="size-3.5" />
                    <span>{status}</span>
                </Badge>
            );

        default:
            return (
                <Badge variant="outline" className="bg-muted text-muted-foreground px-2.5 py-1">
                    {status}
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

export default function LandlordRentalRequestCard({ req }: LandlordRentalRequestCardProps) {
    const [openModal, setOpenModal] = useState(false);
    const [actionType, setActionType] = useState<"APPROVED" | "REJECTED" | null>(null);
    const [landlordNote, setLandlordNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const propertyInfo = req.properties || req.property;
    const propertyTitle = propertyInfo?.title || `Property ID: ${req.propertyId}`;
    const propertyLocation = propertyInfo?.area && propertyInfo?.city ? `${propertyInfo.area}, ${propertyInfo.city}` : null;

    const handleOpenActionModal = (type: "APPROVED" | "REJECTED") => {
        setActionType(type);
        setLandlordNote("");
        setOpenModal(true);
    };

    const handleConfirmStatusUpdate = async () => {
        if (!actionType) return;

        setIsSubmitting(true);
        try {
            const res = await UpdateRentalRequestStatus(req.id, {
                status: actionType,
                landlordNote: landlordNote.trim() || undefined,
            });

            if (res?.success) {
                toast.success(
                    actionType === "APPROVED"
                        ? "Rental request approved successfully!"
                        : "Rental request rejected successfully!"
                );
                setOpenModal(false);
            } else {
                toast.error(res?.message || "Failed to update request status.");
            }
        } catch (error) {
            console.error("Error updating request:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-5 rounded-2xl border border-border/50 bg-card hover:border-cyan-500/30 transition-all shadow-xs space-y-4">
            {/* Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/40">
                <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        Request ID: #{req.id?.slice(0, 8)}...
                    </span>
                    <h4 className="text-base font-bold text-foreground">
                        {propertyTitle}
                    </h4>
                    {propertyLocation && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3.5 text-cyan-600" />
                            {propertyLocation}
                        </p>
                    )}
                </div>

                <div>{getStatusBadge(req.status)}</div>
            </div>

            {/* Tenant Info Bar */}
            <div className="p-3 bg-muted/30 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold shrink-0">
                        <User className="size-4" />
                    </div>
                    <div>
                        <p className="font-bold text-foreground">{req.tenant?.name || "Tenant"}</p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Mail className="size-3 text-cyan-600" /> {req.tenant?.email || "N/A"}
                        </p>
                    </div>
                </div>

                {req.tenant?.phone && (
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Phone className="size-3 text-cyan-600" /> {req.tenant.phone}
                    </div>
                )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Lease Duration */}
                <div className="space-y-1 bg-muted/20 p-3 rounded-xl border border-border/30">
                    <span className="text-muted-foreground flex items-center gap-1 font-medium text-[11px]">
                        <Calendar className="size-3.5 text-cyan-600" /> Lease Duration
                    </span>
                    <p className="font-semibold text-foreground">
                        {formatDate(req.moveInDate)} &rarr; {formatDate(req.moveOutDate)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">({req.totalMonths} Month{req.totalMonths > 1 ? "s" : ""})</p>
                </div>

                {/* Financial Details */}
                <div className="space-y-1 bg-muted/20 p-3 rounded-xl border border-border/30">
                    <span className="text-muted-foreground flex items-center gap-1 font-medium text-[11px]">
                        <DollarSign className="size-3.5 text-cyan-600" /> Rent & Total
                    </span>
                    <p className="font-semibold text-foreground">
                        ৳{Number(req.monthlyRent).toLocaleString()} / mo
                    </p>
                    <p className="text-[11px] text-cyan-600 font-bold">
                        Total: ৳{Number(req.totalAmount).toLocaleString()}
                    </p>
                </div>

                {/* Submission Date */}
                <div className="space-y-1 bg-muted/20 p-3 rounded-xl border border-border/30">
                    <span className="text-muted-foreground flex items-center gap-1 font-medium text-[11px]">
                        <Clock className="size-3.5 text-cyan-600" /> Submitted On
                    </span>
                    <p className="font-semibold text-foreground">{formatDate(req.createdAt)}</p>
                    <p className="text-[11px] text-muted-foreground">Current Status: <span className="font-bold">{req.status}</span></p>
                </div>
            </div>

            {/* Messages */}
            {req.tenantMessage && (
                <div className="p-3 bg-muted/20 rounded-xl text-xs space-y-1 border border-border/30">
                    <span className="font-bold text-foreground text-[11px] uppercase tracking-wide">Tenant Message:</span>
                    <p className="text-muted-foreground leading-relaxed">{req.tenantMessage}</p>
                </div>
            )}

            {req.landlordNote && (
                <div className="p-3 bg-amber-500/10 rounded-xl text-xs space-y-1 border border-amber-500/20 text-amber-700 dark:text-amber-400">
                    <span className="font-bold text-[11px] uppercase tracking-wide flex items-center gap-1">
                        <AlertCircle className="size-3" /> Landlord Note:
                    </span>
                    <p className="leading-relaxed">{req.landlordNote}</p>
                </div>
            )}

            {/* Card Footer: Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 p-0 h-auto" asChild>
                    <Link href={`/properties/${req.propertyId}`}>
                        View Property Details <ArrowRight className="size-3.5 ml-1" />
                    </Link>
                </Button>

                {req.status === "PENDING" ? (
                    <div className="flex flex-col md:flex-row w-full md:justify-end justify-center gap-2">
                        <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1 px-4"
                            onClick={() => handleOpenActionModal("APPROVED")}
                        >
                            <CheckCircle2 className="size-3.5" /> Approve Request
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold gap-1 px-4"
                            onClick={() => handleOpenActionModal("REJECTED")}
                        >
                            <XCircle className="size-3.5" /> Reject Request
                        </Button>
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground font-medium">
                        Request has been <span className="font-bold lowercase">{req.status}</span>.
                    </p>
                )}
            </div>

            {/* Action Confirmation Modal */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {actionType === "APPROVED" ? "Approve Rental Request" : "Reject Rental Request"}
                        </DialogTitle>
                        <DialogDescription>
                            {actionType === "APPROVED"
                                ? "Are you sure you want to approve this tenant request? The tenant will be notified to proceed with payment."
                                : "Are you sure you want to reject this tenant request? You can provide a reason below."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 my-2">
                        <label className="text-xs font-bold text-foreground">
                            Landlord Note <span className="font-normal text-muted-foreground">(Optional)</span>
                        </label>
                        <textarea
                            value={landlordNote}
                            onChange={(e) => setLandlordNote(e.target.value)}
                            placeholder="Add any instructions, terms, or reasons for the tenant..."
                            className="w-full min-h-[80px] p-3 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenModal(false)}
                            disabled={isSubmitting}
                            className="text-xs font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className={
                                actionType === "APPROVED"
                                    ? "bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                                    : "bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
                            }
                            onClick={handleConfirmStatusUpdate}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="size-3.5 animate-spin mr-1" />
                                    Processing...
                                </>
                            ) : actionType === "APPROVED" ? (
                                "Confirm Approval"
                            ) : (
                                "Confirm Rejection"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
