"use client";

import { useState } from "react";
import { CreditCard, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Payment = {
    id?: string;
    rentalRequestId?: string;
    payerId?: string;
    amount?: string | number;
    currency?: string;
    status?: string;
    transactionId?: string;
    stripeCheckoutSessionId?: string;
    stripePaymentIntentId?: string;
    stripeCustomerId?: string;
    paidAt?: string;
    createdAt?: string;
    updatedAt?: string;
};

type Props = {
    payments?: Payment[];
};

export default function PaymentDetailsModal({ payments }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    if (!payments || payments.length === 0) {
        return null;
    }

    const paidPayment = payments.find(
        (p) => p.status === "PAID" || p.status === "COMPLETED"
    ) || payments[0];

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? dateStr : d.toLocaleString("en-US");
    };

    return (
        <>
            {
                paidPayment && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsOpen(true)}
                        className="text-xs font-semibold border-teal-500/40 text-teal-600 hover:bg-teal-500/10 cursor-pointer flex items-center gap-1.5"
                    >
                        <Eye className="size-3.5" />
                        Payment Details
                    </Button>
                )
            }

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div className="bg-white dark:bg-[#182630] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative space-y-4 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                                <CreditCard className="size-5 text-teal-600 dark:text-teal-400" />
                                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Payment Details</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        {/* Payment Details Content */}
                        <div className="space-y-2.5 text-xs">
                            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Status</span>
                                <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                                    {paidPayment.status || "N/A"}
                                </span>
                            </div>

                            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Amount</span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">
                                    ৳{paidPayment.amount} {paidPayment.currency?.toUpperCase()}
                                </span>
                            </div>

                            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Payment ID</span>
                                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-[200px]" title={paidPayment.id}>
                                    {paidPayment.id}
                                </span>
                            </div>

                            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Transaction ID</span>
                                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-[200px]" title={paidPayment.transactionId}>
                                    {paidPayment.transactionId || "N/A"}
                                </span>
                            </div>

                            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Stripe Intent ID</span>
                                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-[200px]" title={paidPayment.stripePaymentIntentId}>
                                    {paidPayment.stripePaymentIntentId || "N/A"}
                                </span>
                            </div>

                            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Stripe Customer ID</span>
                                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-[200px]" title={paidPayment.stripeCustomerId}>
                                    {paidPayment.stripeCustomerId || "N/A"}
                                </span>
                            </div>

                            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Stripe Session ID</span>
                                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-[200px]" title={paidPayment.stripeCheckoutSessionId}>
                                    {paidPayment.stripeCheckoutSessionId || "N/A"}
                                </span>
                            </div>

                            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Paid At</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">{formatDate(paidPayment.paidAt)}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="cursor-pointer text-xs font-semibold border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                            >
                                Close
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
