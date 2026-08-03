"use client";

import { useState } from "react";
import { Star, Loader2, MessageSquarePlus, Edit3, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { CreateReview, UpdateReview, DeleteReview } from "../_action/ManageReview";

interface ExistingReview {
    id: string;
    rating: number;
    comment: string;
}

interface CreateReviewModalProps {
    rentalRequestId: string;
    tenantId: string;
    propertyTitle?: string;
    existingReview?: ExistingReview | null;
}

export default function CreateReviewModal({
    rentalRequestId,
    tenantId,
    propertyTitle,
    existingReview = null,
}: CreateReviewModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(existingReview?.rating || 5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState(existingReview?.comment || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const isEditing = Boolean(existingReview?.id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim()) {
            toast.error("Please write a brief comment for your review.");
            return;
        }

        setIsSubmitting(true);

        try {
            if (isEditing && existingReview) {
                // Update Review Action
                const result = await UpdateReview(existingReview.id, {
                    rating,
                    comment: comment.trim(),
                });

                if (result && result.success !== false) {
                    toast.success("Your review has been updated successfully!");
                    setIsOpen(false);
                } else {
                    toast.error(result?.message || "Failed to update review.");
                }
            } else {
                // Create Review Action
                const result = await CreateReview({
                    rentalRequestId,
                    rating,
                    comment: comment.trim(),
                    tenantId,
                });

                if (result && result.success !== false) {
                    toast.success("Thank you! Your review has been submitted successfully.");
                    setIsOpen(false);
                } else {
                    toast.error(result?.message || "Failed to submit review.");
                }
            }
        } catch (error) {
            console.error("Review operation error:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmDeleteReview = () => {
        if (!existingReview?.id) return;

        toast("Delete your review?", {
            position: "top-center",
            description: "Are you sure you want to remove this feedback? This action cannot be undone.",
            action: {
                label: "Delete",
                onClick: async () => {
                    setIsDeleting(true);
                    try {
                        const result = await DeleteReview(existingReview.id);
                        if (result && result.success !== false) {
                            toast.success("Your review has been deleted successfully.", {
                                position: "top-center",
                            });
                            setIsOpen(false);
                        } else {
                            toast.error(result?.message || "Failed to delete review.", {
                                position: "top-center",
                            });
                        }
                    } catch (error) {
                        console.error("Delete review error:", error);
                        toast.error("An error occurred while deleting your review.", {
                            position: "top-center",
                        });
                    } finally {
                        setIsDeleting(false);
                    }
                },
            },
            cancel: {
                label: "Cancel",
                onClick: () => { },
            },
        });
    };

    return (
        <>
            {isEditing ? (
                <div className="flex items-center gap-1.5 flex-wrap">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsOpen(true)}
                        className="text-xs h-8 px-2.5 font-bold gap-1 border-cyan-500/40 text-cyan-600 hover:bg-cyan-500/10 cursor-pointer"
                    >
                        <Edit3 className="size-3.5" />
                        Edit Review
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={confirmDeleteReview}
                        disabled={isDeleting}
                        className="text-xs h-8 px-2.5 font-bold gap-1 border-rose-500/40 text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                        title="Delete Review"
                    >
                        {isDeleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                    </Button>
                </div>
            ) : (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                    className="text-xs h-8 px-2.5 font-bold gap-1.5 border-amber-500/40 text-amber-600 hover:bg-amber-500/10 cursor-pointer"
                >
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    Write Review
                </Button>
            )}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-[92vw] max-w-md bg-white p-5 sm:p-6 rounded-2xl">
                    <DialogHeader className="text-left space-y-1">
                        <DialogTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
                            <MessageSquarePlus className="size-5 text-cyan-600" />
                            {isEditing ? "Edit Your Property Review" : "Leave a Property Review"}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-slate-500 line-clamp-1">
                            {propertyTitle ? `Feedback for "${propertyTitle}"` : "Share your honest feedback about this rental property."}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 my-2">
                        {/* Interactive Star Rating */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-800 block">
                                Overall Rating
                            </label>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const activeRating = hoverRating || rating;
                                    const isFilled = star <= activeRating;

                                    return (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="p-1 rounded-md hover:bg-amber-500/10 transition-colors focus:outline-none cursor-pointer"
                                            aria-label={`Rate ${star} out of 5 stars`}
                                        >
                                            <Star
                                                className={`size-6 transition-transform ${isFilled
                                                    ? "fill-amber-400 text-amber-400 scale-110"
                                                    : "text-slate-300"
                                                    }`}
                                            />
                                        </button>
                                    );
                                })}
                                <span className="text-xs font-bold text-slate-600 ml-2">
                                    {rating} / 5
                                </span>
                            </div>
                        </div>

                        {/* Comment Textarea */}
                        <div className="space-y-1.5">
                            <label htmlFor="review-comment" className="text-xs font-bold text-slate-800 block">
                                Your Feedback & Experience
                            </label>
                            <textarea
                                id="review-comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Describe the condition of the home, landlord communication, amenities, and location..."
                                className="w-full min-h-[100px] p-3 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 leading-relaxed"
                                required
                            />
                        </div>

                        {/* Modal Footer: Cancel and Save Changes ONLY */}
                        <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-slate-100 flex items-center justify-end">
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    disabled={isSubmitting}
                                    className="text-xs font-semibold cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold gap-1 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="size-3.5 animate-spin mr-1" />
                                            Saving...
                                        </>
                                    ) : isEditing ? (
                                        "Save Changes"
                                    ) : (
                                        "Submit Review"
                                    )}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
