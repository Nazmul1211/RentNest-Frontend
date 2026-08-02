"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
    Bed,
    Bath,
    Ruler,
    MapPin,
    Home,
    Trash2,
    Edit3,
    Eye,
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
import { LandlordProperty, DeleteLandlordProperty } from "../_action/LandlordAction";

interface LandlordPropertyCardProps {
    property: LandlordProperty;
}

export default function LandlordPropertyCard({ property }: LandlordPropertyCardProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const mainImage = property.images?.[0] || "";
    const formattedRent = Number(property.rentAmount || 0).toLocaleString();

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            const res = await DeleteLandlordProperty(property.id);
            if (res?.success) {
                toast.success("Property deleted successfully!");
                setOpenDeleteModal(false);
            } else {
                toast.error(res?.message || "Failed to delete property.");
            }
        } catch (error) {
            console.error("Error deleting property:", error);
            toast.error("An unexpected error occurred while deleting.");
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <div className="p-4 rounded-2xl border border-border/50 bg-card hover:border-cyan-500/30 transition-all shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
                {/* Image & Availability Overlay */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
                    {mainImage ? (
                        <img
                            src={mainImage}
                            alt={property.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted/50">
                            <Home className="size-10 text-muted-foreground" />
                        </div>
                    )}

                    <div className="absolute top-2 left-2">
                        <Badge
                            variant={property.isAvailable ? "default" : "destructive"}
                            className="text-[10px] px-2 py-0.5 font-bold shadow-xs"
                        >
                            {property.isAvailable ? "Available" : "Rented"}
                        </Badge>
                    </div>
                </div>


                {/* Property Info */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            ID: {property.id?.slice(0, 8)}...
                        </span>
                        <span className="text-sm font-extrabold text-cyan-600">
                            ৳{formattedRent} <span className="text-[10px] font-normal text-muted-foreground">/ mo</span>
                        </span>
                    </div>

                    <h4 className="text-base font-bold text-foreground line-clamp-1">
                        {property.title}
                    </h4>

                    {(property.area || property.city) && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3.5 text-cyan-600 shrink-0" />
                            <span className="line-clamp-1">
                                {property.area ? `${property.area}, ` : ""}{property.city || ""}
                            </span>
                        </div>
                    )}


                    {/* Quick Specs */}
                    <div className="flex items-center gap-3 pt-2 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Bed className="size-3.5 text-cyan-600" /> {property.bedrooms || 0} Beds
                        </span>
                        <span className="flex items-center gap-1">
                            <Bath className="size-3.5 text-cyan-600" /> {property.bathrooms || 0} Baths
                        </span>
                        {property.sizeSqft && (
                            <span className="flex items-center gap-1">
                                <Ruler className="size-3.5 text-cyan-600" /> {property.sizeSqft} sqft
                            </span>
                        )}
                    </div>
                </div>
            </div>


            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-border/10 gap-2">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 p-0 h-auto" asChild>
                    <Link href={`/properties/${property.id}`} className="flex items-center gap-1">
                        <Eye className="size-3.5" /> View
                    </Link>
                </Button>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs font-semibold gap-1 h-8 px-3" asChild>
                        <Link href={`/dashboard/landlord/properties?id=${property.id}`}>
                            <Edit3 className="size-3.5 text-cyan-600" /> Edit
                        </Link>
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        className="text-xs font-semibold gap-1 h-8 px-3 bg-rose-600 hover:bg-rose-700 text-white"
                        onClick={() => setOpenDeleteModal(true)}
                    >
                        <Trash2 className="size-3.5" /> Delete
                    </Button>
                </div>
            </div>


            {/* Delete Confirmation Modal */}
            <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal} >
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-rose-600 flex items-center gap-2">
                            <Trash2 className="size-5" /> Delete Property Confirmation
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <span className="font-bold text-foreground">"{property.title}"</span>? This operation cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-4 sm:gap-0 mt-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenDeleteModal(false)}
                            disabled={isDeleting}
                            className="text-xs font-semibold mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="size-3.5 animate-spin mr-1" /> Deleting...
                                </>
                            ) : (
                                "Yes, Delete Property"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
