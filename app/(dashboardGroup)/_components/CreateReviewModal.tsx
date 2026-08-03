"use client";

import { useState } from "react";
import { Star, Loader2, X, MessageSquarePlus } from "lucide-react";
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
import { CreateReview } from "../_action/ManageReview";

interface CreateReviewModalProps {
    rentalRequestId: string;
    tenantId: string;
    propertyTitle?: string;
}

export default function CreateReviewModal({
    rentalRequestId,
    tenantId,
    propertyTitle,
}: CreateReviewModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim()) {
            toast.error("Please write a brief comment for your review.");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await CreateReview({
                rentalRequestId,
                rating,
                comment: comment.trim(),
                tenantId,
            });

            if (result && result.success !== false) {
                toast.success("Thank you! Your review has been submitted successfully.");
                setIsOpen(false);
                setComment("");
                setRating(5);
            } else {
                toast.error(result?.message || "Failed to submit review. Please try again.");
            }
        } catch (error) {
            console.error("Review submission error:", error);
            toast.error("An unexpected error occurred while submitting your review.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="text-xs font-bold gap-1.5 border-amber-500/40 text-amber-600 hover:bg-amber-500/10 cursor-pointer"
            >
                <Star className="size-3.5 fill-amber-500 text-amber-500" />
                Write Review
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base font-bold">
                            <MessageSquarePlus className="size-5 text-cyan-600" />
                            Leave a Property Review
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            {propertyTitle ? `Share your experience for "${propertyTitle}"` : "Share your honest feedback about this rental property."}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 my-2">
                        {/* Interactive Star Rating */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-foreground block">
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
                                            className="p-1 rounded-md hover:bg-amber-500/10 transition-colors focus:outline-none"
                                            aria-label={`Rate ${star} out of 5 stars`}
                                        >
                                            <Star
                                                className={`size-6 transition-transform ${isFilled
                                                    ? "fill-amber-400 text-amber-400 scale-110"
                                                    : "text-slate-300 dark:text-slate-600"
                                                    }`}
                                            />
                                        </button>
                                    );
                                })}
                                <span className="text-xs font-bold text-muted-foreground ml-2">
                                    {rating} / 5 Stars
                                </span>
                            </div>
                        </div>

                        {/* Comment Textarea */}
                        <div className="space-y-1.5">
                            <label htmlFor="review-comment" className="text-xs font-bold text-foreground block">
                                Your Feedback & Experience
                            </label>
                            <textarea
                                id="review-comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Describe the condition of the home, landlord communication, amenities, and location..."
                                className="w-full min-h-[100px] p-3 text-xs rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500/50 leading-relaxed"
                                required
                            />
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/40">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                                className="text-xs font-semibold mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold gap-1"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="size-3.5 animate-spin mr-1" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Review"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
