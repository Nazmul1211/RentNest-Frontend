"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { Calendar, MessageSquare, DollarSign, Calculator, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRentalAction, TRentanSubmissionModal } from "../_actions/RentalAction";

interface PropertyContext {
    id: string;
    title: string;
    rentAmount: string | number;
    isAvailable?: boolean;
}

interface RentanSubmissionModalProps {
    property: PropertyContext;
    triggerText?: string;
    buttonVariant?: "default" | "outline" | "secondary";
}

function calculateMonths(startStr: string, endStr: string): number {
    if (!startStr || !endStr) return 1;

    const start = new Date(startStr);
    const end = new Date(endStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;

    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    if (end.getDate() < start.getDate()) {
        months--;
    }
    return months > 0 ? months : 1;
}

const RentanSubmissionModal = ({ property, triggerText = " Contact Landlord / Request Rental", buttonVariant = "outline" }: RentanSubmissionModalProps) => {

    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Get default dates (move-in: tomorrow, move-out: 1 year from now)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultMoveIn = tomorrow.toISOString().split("T")[0];

    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const defaultMoveOut = nextYear.toISOString().split("T")[0];

    const [moveInDate, setMoveInDate] = useState(defaultMoveIn);
    const [moveOutDate, setMoveOutDate] = useState(defaultMoveOut);
    const [tenantMessage, setTenantMessage] = useState("");

    const totalMonths = calculateMonths(moveInDate, moveOutDate);
    const monthlyRent = String(property.rentAmount);
    const totalAmount = (totalMonths * Number(monthlyRent || 0)).toString();


    const handleModalSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!moveInDate || !moveOutDate) {
            toast.error("Please select valid move-in and move-out dates.");
            return;
        }

        if (new Date(moveOutDate) <= new Date(moveInDate)) {
            toast.error("Move-out date must be after move-in date.");
            return;
        }

        const payload: TRentanSubmissionModal = {
            propertyId: property.id,
            moveInDate,
            moveOutDate,
            totalMonths,
            tenantMessage: tenantMessage.trim() || `Interested in renting ${property.title}.`,
            monthlyRent,
            totalAmount,
        };

        startTransition(async () => {
            const response = await createRentalAction(payload);

            if (response.success) {
                toast.success(response.message || "Rental request submitted successfully!");
                setOpen(false);
            } else {
                toast.error(response.message || "Failed to submit request.");
            }
        });
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={buttonVariant}
                    className="w-full h-10 font-bold border-teal-600/30 text-teal-600 dark:text-teal-400 hover:bg-teal-600/10 hover:text-teal-700 dark:hover:text-teal-300"
                    disabled={property.isAvailable === false}
                >
                    {triggerText}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-6 bg-white dark:bg-[#182630] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xl">
                <DialogHeader className="space-y-1 text-left">
                    <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Submit Rental Request
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-600 dark:text-slate-400">
                        Contact landlord for <span className="font-semibold text-slate-900 dark:text-slate-100">{property.title}</span>
                    </DialogDescription>
                </DialogHeader>


                <form onSubmit={handleModalSubmit} className="space-y-4 py-2">
                    {/* Dates row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="moveInDate" className="text-xs font-semibold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                                <Calendar className="size-3.5 text-teal-600 dark:text-teal-400" />
                                Move-in Date
                            </Label>
                            <Input
                                id="moveInDate"
                                type="date"
                                value={moveInDate}
                                onChange={(e) => setMoveInDate(e.target.value)}
                                required
                                className="text-xs h-9 bg-slate-50 dark:bg-[#22333f] text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="moveOutDate" className="text-xs font-semibold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                                <Calendar className="size-3.5 text-teal-600 dark:text-teal-400" />
                                Move-out Date
                            </Label>
                            <Input
                                id="moveOutDate"
                                type="date"
                                value={moveOutDate}
                                onChange={(e) => setMoveOutDate(e.target.value)}
                                required
                                className="text-xs h-9 bg-slate-50 dark:bg-[#22333f] text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                            />
                        </div>
                    </div>


                    {/* Calculations Summary Card */}
                    <div className="p-3 bg-slate-100/70 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                                <Calculator className="size-3.5 text-teal-600 dark:text-teal-400" /> Duration:
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{totalMonths} month(s)</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                                <DollarSign className="size-3.5 text-teal-600 dark:text-teal-400" /> Monthly Rent:
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">৳{Number(monthlyRent).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold pt-1.5 border-t border-slate-200 dark:border-slate-800 text-teal-600 dark:text-teal-400">
                            <span>Estimated Total:</span>
                            <span>৳{Number(totalAmount).toLocaleString()}</span>
                        </div>
                    </div>


                    {/* Tenant Message */}
                    <div className="space-y-1.5">
                        <Label htmlFor="tenantMessage" className="text-xs font-semibold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                            <MessageSquare className="size-3.5 text-teal-600 dark:text-teal-400" />
                            Message for Landlord (Optional)
                        </Label>
                        <textarea
                            id="tenantMessage"
                            rows={3}
                            placeholder="Tell the landlord a bit about yourself or ask any questions..."
                            value={tenantMessage}
                            onChange={(e) => setTenantMessage(e.target.value)}
                            className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#22333f] p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>


                    <DialogFooter className="pt-2 flex gap-2 justify-end sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" size="sm" disabled={isPending} className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            size="sm"
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="size-3.5 animate-spin mr-1.5" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request"
                            )}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}


export default RentanSubmissionModal;