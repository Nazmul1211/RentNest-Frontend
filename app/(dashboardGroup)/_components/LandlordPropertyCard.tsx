"use client";

import { useState, useEffect } from "react";
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
    Loader2,
    Layers,
    Sparkles,
    ImageIcon
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
import { LandlordProperty, DeleteLandlordProperty, UpdateLandlordProperty } from "../_action/LandlordAction";
import { getCategories } from "@/app/(publicGroup)/_actions/getCategories";

interface LandlordPropertyCardProps {
    property: LandlordProperty;
}



export default function LandlordPropertyCard({ property }: LandlordPropertyCardProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Categories state
    const [categoriesList, setCategoriesList] = useState<{ id: string; name?: string; title?: string }[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);

    // Form inputs state pre-filled from property props
    const [title, setTitle] = useState(property.title || "");
    const [description, setDescription] = useState(property.description || "");
    const [rentAmount, setRentAmount] = useState(property.rentAmount || "");
    const [securityDeposit, setSecurityDeposit] = useState(property.securityDeposit || "");
    const [address, setAddress] = useState(property.address || "");
    const [city, setCity] = useState(property.city || "");
    const [area, setArea] = useState(property.area || "");
    const [bedrooms, setBedrooms] = useState(property.bedrooms || 0);
    const [bathrooms, setBathrooms] = useState(property.bathrooms || 0);
    const [sizeSqft, setSizeSqft] = useState(property.sizeSqft || "");
    const [isAvailable, setIsAvailable] = useState(property.isAvailable ?? true);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(property.categoryId || "");
    const [amenitiesText, setAmenitiesText] = useState<string>(
        Array.isArray(property.amenities) ? property.amenities.join(", ") : ""
    );
    const [imagesText, setImagesText] = useState<string>(
        Array.isArray(property.images) ? property.images.join("\n") : ""
    );

    const mainImage = property.images?.[0] || "";
    const formattedRent = Number(property.rentAmount || 0).toLocaleString();


    // 1. Fetch categories list from public action getCategories
    useEffect(() => {
        const fetchCategoriesData = async () => {
            setIsLoadingCategories(true);
            try {
                const data = await getCategories();
                if (data && Array.isArray(data)) {
                    setCategoriesList(data);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            } finally {
                setIsLoadingCategories(false);
            }
        };

        fetchCategoriesData();
    }, []);


    // 2. Match property.categoryId with categoryList to extract category name
    const currentCategory = categoriesList.find((cat) => cat.id === property.categoryId);
    const categoryName = currentCategory ? (currentCategory.name || currentCategory.title || "Uncategorized") : "Uncategorized";


    const handleDeleteProperties = async () => {
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


    const handleUpdateProperties = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        const amenitiesArray = amenitiesText
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        const imagesArray = imagesText
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);

        try {
            const res = await UpdateLandlordProperty(property.id, {
                title,
                description,
                rentAmount: Number(rentAmount),
                securityDeposit: Number(securityDeposit),
                address,
                city,
                area,
                bedrooms: Number(bedrooms),
                bathrooms: Number(bathrooms),
                sizeSqft: Number(sizeSqft),
                isAvailable,
                categoryId: selectedCategoryId || undefined,
                amenities: amenitiesArray,
                images: imagesArray,
            });

            if (res?.success) {
                toast.success("Property updated successfully!");
                setOpenEditModal(false);
            } else {
                toast.error(res?.message || "Failed to update property.");
            }
        } catch (error) {
            console.error("Error updating property:", error);
            toast.error("An unexpected error occurred while updating.");
        } finally {
            setIsUpdating(false);
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

                {/* Property Info Header */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">
                                ID: {property.id?.slice(0, 8)}...
                            </span>
                            {categoryName && (
                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-semibold bg-cyan-500/10 text-cyan-700 border border-cyan-500/20 truncate">
                                    {categoryName}
                                </Badge>
                            )}
                        </div>
                        <span className="text-sm font-extrabold text-cyan-600 shrink-0">
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
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs font-semibold gap-1 h-8 px-3"
                        onClick={() => setOpenEditModal(true)}
                    >
                        <Edit3 className="size-3.5 text-cyan-600" /> Edit
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



            {/* Edit Property Modal */}
            <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
                <DialogContent className="sm:max-w-xl bg-white max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-cyan-700 flex items-center gap-2">
                            <Edit3 className="size-5" /> Edit Property Details
                        </DialogTitle>
                        <DialogDescription>
                            Update the listing details for <span className="font-bold text-foreground">"{property.title}"</span>.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdateProperties} className="space-y-4 my-2 text-xs">
                        {/* Title */}
                        <div className="space-y-1">
                            <label className="font-bold text-foreground">Property Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                            />
                        </div>

                        {/* Category Selection */}
                        <div className="space-y-1.5 p-3 bg-muted/20 rounded-xl border border-border/40">
                            <div className="flex items-center justify-between">
                                <label className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                                    <Layers className="size-4 text-cyan-600" /> Category
                                </label>
                                <span className="text-[11px] text-muted-foreground">
                                    Current Category: <strong className="text-cyan-700">{categoryName}</strong>
                                </span>
                            </div>

                            {isLoadingCategories ? (
                                <div className="flex items-center gap-2 text-[11px] text-muted-foreground py-2">
                                    <Loader2 className="size-3.5 animate-spin text-cyan-600" /> Fetching categories...
                                </div>
                            ) : categoriesList.length === 0 ? (
                                <p className="text-[11px] text-muted-foreground py-1">No categories available.</p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                                    {categoriesList.map((cat) => {
                                        const isChecked = selectedCategoryId === cat.id;
                                        return (
                                            <label
                                                key={cat.id}
                                                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${isChecked
                                                    ? "border-cyan-600 bg-cyan-500/10 text-cyan-800 font-bold shadow-xs"
                                                    : "border-border/60 hover:bg-muted/50 text-foreground"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`category-${property.id}`}
                                                    value={cat.id}
                                                    checked={isChecked}
                                                    onChange={() => setSelectedCategoryId(cat.id)}
                                                    className="size-3.5 text-cyan-600 focus:ring-cyan-500"
                                                />
                                                <span className="text-[11px] truncate capitalize">{cat.name || cat.title}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>


                        {/* Description */}
                        <div className="space-y-1">
                            <label className="font-bold text-foreground">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                            />
                        </div>

                        {/* Rent & Security Deposit */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="font-bold text-foreground">Rent Amount (৳/mo)</label>
                                <input
                                    type="number"
                                    value={rentAmount}
                                    onChange={(e) => setRentAmount(e.target.value)}
                                    required
                                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-foreground">Security Deposit (৳)</label>
                                <input
                                    type="number"
                                    value={securityDeposit}
                                    onChange={(e) => setSecurityDeposit(e.target.value)}
                                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                />
                            </div>
                        </div>

                        {/* Address, City, Area */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                                <label className="font-bold text-foreground">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-foreground">Area</label>
                                <input
                                    type="text"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-foreground">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                />
                            </div>
                        </div>

                        {/* Bedrooms, Bathrooms, Sqft */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                                <label className="font-bold text-foreground">Bedrooms</label>
                                <input
                                    type="number"
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(Number(e.target.value))}
                                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-foreground">Bathrooms</label>
                                <input
                                    type="number"
                                    value={bathrooms}
                                    onChange={(e) => setBathrooms(Number(e.target.value))}
                                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-foreground">Size (sqft)</label>
                                <input
                                    type="number"
                                    value={sizeSqft}
                                    onChange={(e) => setSizeSqft(e.target.value)}
                                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-1">
                            <label className="font-bold text-foreground flex items-center gap-1">
                                <Sparkles className="size-3.5 text-cyan-600" /> Amenities <span className="font-normal text-muted-foreground">(comma separated)</span>
                            </label>
                            <input
                                type="text"
                                value={amenitiesText}
                                onChange={(e) => setAmenitiesText(e.target.value)}
                                placeholder="WiFi, Lift, Generator, Parking, 24/7 Security"
                                className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none"
                            />
                        </div>

                        {/* Image URLs */}
                        <div className="space-y-1">
                            <label className="font-bold text-foreground flex items-center gap-1">
                                <ImageIcon className="size-3.5 text-cyan-600" /> Image URLs <span className="font-normal text-muted-foreground">(one URL per line)</span>
                            </label>
                            <textarea
                                value={imagesText}
                                onChange={(e) => setImagesText(e.target.value)}
                                rows={3}
                                placeholder="https://images.unsplash.com/photo-1..."
                                className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cyan-500/50 outline-none font-mono text-[11px]"
                            />
                        </div>

                        {/* Status / Availability */}
                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id={`available-${property.id}`}
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                                className="size-4 text-cyan-600 rounded focus:ring-cyan-500"
                            />
                            <label htmlFor={`available-${property.id}`} className="font-bold text-foreground cursor-pointer">
                                Mark as Available for Rent
                            </label>
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenEditModal(false)}
                                disabled={isUpdating}
                                className="text-xs font-semibold mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold"
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="size-3.5 animate-spin mr-1" /> Updating...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>



            {/* Delete Confirmation Modal */}
            <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
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
                            onClick={handleDeleteProperties}
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
